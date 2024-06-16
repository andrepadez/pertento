import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';

export const useChartData = (experiment, manager) => {
  const statisticsClient = useClient(import.meta.env.VITE_STATISTICS_URL);
  const { goal, currency } = manager;

  const { data, isLoading } = useQuery({
    queryKey: ['CHART_DATA', experiment.id, goal, currency],
    queryFn: () => statisticsClient.get(`/${experiment.id}/chart-data?goal=${goal}&currency=${currency}`),
  });

  const categories = experiment.variants.sort((a, b) => a.createdAt - b.createdAt).map((v) => v.name);

  const variantsById = experiment.variants.reduce((acc, variant) => {
    acc[variant.id] = variant;
    return acc;
  }, {});

  const chartData = [];

  if (data) {
    for (let stat of data) {
      const ids = Object.keys(stat);
      const newStat = { date: new Date(+stat.date).toLocaleDateString() };
      for (let id of ids) {
        const variant = variantsById[id];
        if (variant) {
          newStat[variant.name] = stat[id];
        }
      }
      chartData.push(newStat);
    }
  }

  return { chartData, categories };
};
