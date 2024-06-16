import { useParams } from 'react-router-dom';
import { ExperimentSetup } from './ExperimentSetup';
import { ExperimentConfig } from './ExperimentConfig';
import { useExperiment } from '@/state/experiments/useExperiment';

export const ExperimentSettingsScreen = ({ experiment }) => {
  return experiment.editorUrl ? (
    <ExperimentConfig experiment={experiment} />
  ) : (
    <ExperimentSetup experiment={experiment} />
  );
};
