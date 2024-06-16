import { useQuery } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';

export const useExperimentsMonitor = () => {
  const statisticsClient = useClient(import.meta.env.VITE_STATISTICS_URL);

  const { data, isLoading } = useQuery({
    queryKey: ['EXPERIMENTS_MONITOR_LIST'],
    queryFn: () => statisticsClient.get(`/monitor`),
  });

  return { data, isLoading };
};
