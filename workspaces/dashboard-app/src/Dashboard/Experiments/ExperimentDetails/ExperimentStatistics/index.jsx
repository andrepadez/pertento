import { Significance } from './Significance';
import { Selectors } from './Selectors';
import { ExperimentChart } from './ExperimentChart';
import { useExperimentStatistics } from '@/state/experiments/useExperimentStatistics';

export const ExperimentStatisticsScreen = ({ experiment }) => {
  const statisticsManager = useExperimentStatistics(experiment);
  const { variants, statistics } = statisticsManager;

  return (
    <div className="flex flex-col gap-10">
      <Selectors manager={statisticsManager} />
      <Significance experiment={experiment} manager={statisticsManager} />
      <ExperimentChart experiment={experiment} manager={statisticsManager} />
    </div>
  );
};
