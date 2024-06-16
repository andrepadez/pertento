import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { useOrganizations } from '../useOrganizations';
import { useWebsites } from '../useWebsites';
import { useVariants } from './useVariants';
import { useVariantWeights } from './useVariantWeights';
const { VITE_GAN_URL } = import.meta.env;

export const useExperiment = (experimentId) => {
  const queryClient = useQueryClient();
  const apiClient = useClient();
  const ganClient = useClient(`${VITE_GAN_URL}/google-analytics`);
  const [isStarting, setIsStarting] = useState(false);
  const { variants } = useVariants(experimentId);
  const { variantWeights } = useVariantWeights(experimentId);
  const { organization, organizations, setOrganization } = useOrganizations();
  const { websites, website, setWebsite } = useWebsites();

  const { data: experiment } = useQuery({
    enabled: !!experimentId,
    queryKey: ['EXPERIMENT', experimentId],
    queryFn: () => {
      return apiClient.get(`/experiments/${experimentId}`);
    },
  });

  useEffect(() => {
    if (experiment) {
      setOrganization(experiment.website.company.id);
      setTimeout(() => setWebsite(experiment.website.id));
    }
  }, [experiment]);

  const createExperiment = async ({ name }) => {
    const { id: websiteId } = website;
    const { id: companyId, parentCompanyId } = organization;
    const payload = { name, websiteId, companyId, parentCompanyId };
    const newExperiment = await apiClient.post('/experiments', payload);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENTS', website.id] });
    return newExperiment;
  };

  const finishSetup = async (id, payload) => {
    await apiClient.put(`/experiments/${id}/finish-setup`, payload);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', id] });
  };

  const updateExperiment = async (id, payload) => {
    await apiClient.put(`/experiments/${id}`, payload);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', id] });
  };

  const deleteExperiment = async (id) => {
    await apiClient.delete(`/experiments/${id}`);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENTS', website.id] });
  };

  const archiveExperiment = async (id) => {
    const queryKey = ['EXPERIMENTS', website.id];
    await apiClient.post(`/experiments/${id}/archive`);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENTS', website.id] });
  };

  const startExperiment = async (id) => {
    setIsStarting(true);
    try {
      const { ganMeasurementId, ganProperty } = website;
      if (ganMeasurementId && ganProperty.hasEditPermission.length > 0) {
        const res = await ganClient.post(`/create-audiences/${id}`);
      }
      await apiClient.post(`/experiments/${id}/start`, { variantWeights });
      queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', id] });
      queryClient.invalidateQueries({ queryKey: ['ACTIVITY_LOG', id] });
      setTimeout(() => setIsStarting(false), 50);
    } catch (error) {
      setTimeout(() => setIsStarting(false), 50);
    }
  };

  const endExperiment = async (id) => {
    await apiClient.post(`/experiments/${id}/end`);
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENT', id] });
    queryClient.invalidateQueries({ queryKey: ['ACTIVITY_LOG', id] });
  };

  const duplicateExperiment = async (id, name) => {
    await apiClient.post(`/experiments/${id}/duplicate`, { name });
    queryClient.invalidateQueries({ queryKey: ['EXPERIMENTS', website.id] });
  };

  return {
    experiment,
    isStarting,
    createExperiment,
    finishSetup,
    updateExperiment,
    startExperiment,
    deleteExperiment,
    archiveExperiment,
    endExperiment,
    duplicateExperiment,
  };
};
