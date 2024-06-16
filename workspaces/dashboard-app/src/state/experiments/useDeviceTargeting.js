import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { useExperiment } from './useExperiment';
import { DEVICE_TYPES } from 'misc';

export const useDeviceTargeting = (experimentId) => {
  const { experiment } = useExperiment(experimentId);
  const queryClient = useQueryClient();
  const apiClient = useClient();

  const deleteDeviceTargeting = async (id) => {
    await apiClient.delete(`/device-targeting/${id}`);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', experimentId] });
  };

  const addDeviceTargeting = async (device) => {
    const payload = { device, experimentId };
    await apiClient.post(`/device-targeting`, payload);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', experimentId] });
  };

  return {
    DEVICE_TYPES,
    deviceTargeting: experiment?.deviceTargeting,
    addDeviceTargeting,
    deleteDeviceTargeting,
  };
};
