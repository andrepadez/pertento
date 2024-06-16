import { Link } from 'react-router-dom';
import { Card, CardTitle } from 'shadcn/card';
import { ExperimentSummaryTable } from './ExperimentSummaryTable';
import { useExperimentsMonitor } from '@/state/experiments/useExperimentsMonitor';

export const ExperimentsMonitorScreen = () => {
  const { data: experiments, isLoading } = useExperimentsMonitor();

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-5">
      <h1>Running Experiments ({experiments.length})</h1>
      <div className="grid gap-5 xxl:grid-cols-2">
        {experiments.map((exp) => (
          <Card className="px-3 py-1" key={exp.id}>
            <div className="grid gap-3 mb-2">
              <h3 className="-mb-3 text-lg font-bold text-center">{exp.website.url}</h3>
              <h4 className="text-center">
                <Link to={`/experiments/${exp.id}`}>{exp.name}</Link>
              </h4>
            </div>
            <ExperimentSummaryTable experiment={exp} />
          </Card>
        ))}
      </div>
    </div>
  );
};
