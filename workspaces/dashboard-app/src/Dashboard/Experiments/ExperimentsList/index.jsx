import { ExperimentsTabs } from './ExperimentsTabs';
import { ExperimentsSearch } from './ExperimentsSearch';
import { ExperimentsTable } from './ExperimentsTable';
import { CreateExperiment } from './CreateExperiment';
import { useAuth } from 'hooks/useAuth';
import { useWebsites } from '@/state/useWebsites';
import { useExperimentsList } from '@/state/experiments/useExperimentsList';

export const ExperimentsListScreen = () => {
  const { website } = useWebsites();
  const { user } = useAuth();
  const manager = useExperimentsList();
  const { page, setSearchText, sortBy, direction } = manager;
  const { handleSortChange, handlePageChange, handleSearch, resetFilters, searchText } = manager;
  const { experiments, counts, quantities, loading, setLoading } = manager;
  const { view, setView, error, setError } = manager;

  if (!website || !user) return null;

  if (website.id === 2993 && user.email !== 'andre.padez@pertento.ai') {
    return (
      <div className="mt-24 flex flex-col items-center gap-5">
        <h1>These are not the experiments you're looking for</h1>
        <h3>This website is setup so the tests can do their thing</h3>
        <h5>nothing to see here, move along</h5>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h1>Experiments</h1>
        <CreateExperiment />
      </div>
      <ExperimentsSearch searchText={searchText} handleSearch={handleSearch} resetFilters={resetFilters} />
      <ExperimentsTabs view={view} setView={setView} counts={counts} />
      <ExperimentsTable manager={manager} handleSortChange={handleSortChange} />
    </div>
  );
};
