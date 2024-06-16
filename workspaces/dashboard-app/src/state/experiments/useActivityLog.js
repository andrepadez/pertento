import { useQuery } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';

export const useActivityLog = (experimentId) => {
  const apiClient = useClient();

  const { data: activityLog } = useQuery({
    queryKey: ['ACTIVITY_LOG', experimentId],
    enabled: !!experimentId,
    queryFn: () => {
      return apiClient.get(`/experiments/${experimentId}/activity-log`);
    },
  });

  return { activityLog };
};
