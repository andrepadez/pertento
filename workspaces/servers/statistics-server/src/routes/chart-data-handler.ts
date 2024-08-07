import { db, eq } from 'pertentodb';
import { Experiments } from 'pertentodb';
import { getRawData } from './_sql-queries';
import redisClient from 'redis-client';
const WHOLE_DAY = 24 * 60 * 60 * 1000;

export const chartDataHandler = async (c) => {
  const { experimentId } = c.req.param();
  const { goal, currency } = c.req.query();

  const experiment = c.experiment;

  const stats = await getRawData(experimentId, goal, currency);
  const chartData = crunchChartData({ experiment, stats, goal });

  c.chartData = chartData;
  return c.json(chartData);
};

export const chartDataMiddleware = async (c, next) => {
  const { experimentId } = c.req.param();
  const { goal, currency } = c.req.query();

  const redisKey = `PERTENTO:CHART_DATA:${experimentId}:${goal}:${currency}`;
  const chartDataMemo = await redisClient.get(redisKey);
  if (chartDataMemo) {
    const { chartData, timestamp } = JSON.parse(chartDataMemo);
    if (Date.now() - timestamp < 10 * 60 * 1000) {
      return c.json(chartData);
    }
  }

  await next();

  const { chartData } = c;
  const redisData = { chartData, timestamp: Date.now() };
  redisClient.set(redisKey, JSON.stringify(redisData), 'EX');
};

export const crunchChartData = ({ experiment, stats, goal }) => {
  const start = performance.now();
  const { variants: dbVariants } = experiment;
  const originalVariant = dbVariants.find((variant) => variant.name === 'Original');
  const deployedVariantId = dbVariants.find((v) => !!v.deployed)?.id;

  const firstDate = new Date(experiment.startsAt);
  const lastDate = !!experiment.endsAt ? new Date(experiment.endsAt) : new Date();
  let currentDate = new Date(firstDate);
  currentDate.setHours(0, 0, 0, 0);
  lastDate.setDate(lastDate.getDate() + 1);
  lastDate.setHours(0, 0, 0, 0);
  const chartData = {};

  let currentDateVal = currentDate.valueOf();
  let lastDateVal = lastDate.valueOf();

  while (currentDateVal < lastDateVal) {
    const dataObject = {
      date: currentDateVal,
    };
    for (let variant of dbVariants) {
      if (variant.id !== deployedVariantId) {
        dataObject[variant.id] = 0;
      }
    }
    chartData[currentDateVal] = dataObject;
    currentDateVal += WHOLE_DAY;
  }

  const chartDataKeys = Object.keys(chartData);

  let currentIndex = 1;
  let currentKey = chartDataKeys[currentIndex];
  let currentDataObject = chartData[currentKey];

  for (let stat of stats) {
    if (stat.variant_id === deployedVariantId) continue;
    while (+stat.from > +currentKey) {
      if (goal === 'Revenue') {
        for (let key in currentDataObject) {
          if (key !== 'date') {
            currentDataObject[key] = currentDataObject[key] / 100;
          }
        }
      }

      currentKey = chartDataKeys[++currentIndex];
      currentDataObject = chartData[currentKey];
    }
    if (!currentDataObject) continue;

    if (goal === 'Conversions') {
      currentDataObject[stat.variant_id] += +stat.conversions;
    }
    if (goal === 'Revenue') {
      currentDataObject[stat.variant_id] += +stat.revenue;
    }
  }
  // console.log(3, performance.now() - start);

  return Object.values(chartData).sort((a, b) => a.date - b.date);
};
