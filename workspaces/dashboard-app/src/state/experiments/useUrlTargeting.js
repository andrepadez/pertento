import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { URL_TARGETING_CONDITIONS } from 'misc';
import { useExperiment } from './useExperiment';

export const useUrlTargeting = (experimentId) => {
  const { experiment } = useExperiment(experimentId);
  const queryClient = useQueryClient();
  const apiClient = useClient();

  const addUrlTargeting = async ({ url, condition }) => {
    const payload = { url, condition, experimentId };
    await apiClient.post(`/url-targeting`, payload);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', experimentId] });
  };

  const editUrlTargeting = async ({ id, url, condition }) => {
    const payload = { url, condition };
    await apiClient.put(`/url-targeting/${id}`, payload);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', experimentId] });
  };

  const deleteUrlTargeting = async (id) => {
    await apiClient.delete(`/url-targeting/${id}`);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', experimentId] });
  };

  return {
    URL_TARGETING_CONDITIONS,
    urlTargeting: experiment?.urlTargeting,
    addUrlTargeting,
    editUrlTargeting,
    deleteUrlTargeting,
  };
};
