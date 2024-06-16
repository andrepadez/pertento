import { useRef } from 'react';
import { Card } from 'shadcn/card';
import { useChartData } from '@/state/experiments/useChartData';
import { ExperimentAreaChart } from './ExperimentAreaChart';
import { ExportDropdown } from './ExportDropdown';

export const ExperimentChart = ({ experiment, manager }) => {
  const chartRef = useRef(null);
  const { statistics, goal } = manager;
  const { chartData, categories } = useChartData(experiment, manager);

  if (!chartData) return null;

  return (
    <Card className="h-[30rem] py-16 relative flex flex-col">
      <div className="absolute top-3 right-10">
        <ExportDropdown data={chartData} categories={categories} chartRef={chartRef} />
      </div>
      <div className="flex-1" ref={chartRef}>
        <ExperimentAreaChart data={chartData} categories={categories} goal={goal} />
      </div>
    </Card>
  );
};
