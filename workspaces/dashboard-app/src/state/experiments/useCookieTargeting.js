import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { useExperiment } from './useExperiment';

export const useCookieTargeting = (experimentId) => {
  const { experiment } = useExperiment(experimentId);
  const queryClient = useQueryClient();
  const apiClient = useClient();

  const deleteCookieTargeting = async (id) => {
    await apiClient.delete(`/cookie-targeting/${id}`);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', experimentId] });
  };

  const addCookieTargeting = async (device) => {
    const payload = { device, experimentId };
    await apiClient.post(`/cookie-targeting`, payload);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', experimentId] });
  };

  return {
    cookieTargeting: experiment?.cookieTargeting,
    addCookieTargeting,
    deleteCookieTargeting,
  };
};
