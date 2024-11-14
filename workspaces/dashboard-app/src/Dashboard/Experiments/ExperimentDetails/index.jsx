import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from 'shadcn/tabs';
import { Header } from './Header';
import { Timeline } from './Timeline';
import { ExperimentSettingsScreen } from './ExperimentSettings';
import { ExperimentStatisticsScreen } from './ExperimentStatistics';
import { BackButton } from 'components/BackButton';
import { useExperiment } from '@/state/experiments/useExperiment';
import { useQueryState } from 'hooks/useQueryState';

export const ExperimentDetailsScreen = (props) => {
  const { id } = useParams();
  const [screen, setScreen] = useQueryState('screen', '');
  const { experiment } = useExperiment(id);
  const isDraft = experiment?.status === 'Draft';

  useEffect(() => {
    if (experiment && !screen) {
      const newScreen = isDraft ? 'settings' : 'statistics';
      setScreen(newScreen);
    }
  }, [experiment]);

  if (!experiment || !screen) return null;

  const changescreen = (value) => {
    setScreen(value);
  };

  return (
    <div className="flex flex-col gap-10">
      <Header experimentId={id} screen={screen} />
      <Timeline experiment={experiment} />
      <Tabs value={screen} onValueChange={changescreen}>
        <TabsList className="relative flex gap-10">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <div className="absolute left-0 inline w-48 mx-5">
            <BackButton className="text-sm" label="Back to Experiments" href="/experiments" />
          </div>
          <div className="absolute right-0 inline w-48 mx-5">
            <strong>{experiment.type}</strong>
          </div>
        </TabsList>
      </Tabs>

      {screen === 'statistics' && isDraft && (
        <div className="text-center text-muted-foreground">Statistics will be available once the experiment starts</div>
      )}

      {screen === 'settings' && <ExperimentSettingsScreen experiment={experiment} />}
      {screen === 'statistics' && !isDraft && <ExperimentStatisticsScreen experiment={experiment} />}
    </div>
  );
};
