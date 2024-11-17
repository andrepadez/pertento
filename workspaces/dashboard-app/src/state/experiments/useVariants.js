import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { useOrganizations } from '@/state/useOrganizations';

export const useVariants = (experimentId, variantId = null) => {
  const queryClient = useQueryClient();
  const apiClient = useClient();
  const { organization } = useOrganizations();

  const { data: variants } = useQuery({
    queryKey: ['VARIANTS', experimentId],
    enabled: !!experimentId,
    queryFn: () => {
      return apiClient.get(`/experiments/${experimentId}/variants`);
    },
  });

  const createVariant = async (variant) => {
    const { id: companyId, parentCompanyId } = organization;
    const payload = { ...variant, companyId, parentCompanyId };
    await apiClient.post(`/variants`, payload);
    queryClient.invalidateQueries({ queryKey: ['VARIANTS', experimentId] });
    queryClient.invalidateQueries({ queryKey: ['ACTIVITY_LOG', experimentId] });
  };

  const deleteVariant = async (variantId) => {
    await apiClient.delete(`/variants/${variantId}`);
    queryClient.invalidateQueries({ queryKey: ['VARIANTS', experimentId] });
    queryClient.invalidateQueries({ queryKey: ['ACTIVITY_LOG', experimentId] });
  };

  const changeName = async (variantId, name, redirectUrl) => {
    await apiClient.put(`/variants/${variantId}/change-name`, { name, redirectUrl });
    queryClient.invalidateQueries({ queryKey: ['VARIANTS', experimentId] });
    queryClient.invalidateQueries({ queryKey: ['ACTIVITY_LOG', experimentId] });
  };

  const changeWeight = async (variantId, weight) => {
    await apiClient.put(`/variants/${variantId}/change-weight`, { weight });
    queryClient.invalidateQueries({ queryKey: ['VARIANTS', experimentId] });
    queryClient.invalidateQueries({ queryKey: ['ACTIVITY_LOG', experimentId] });
  };

  const resetWeight = async (variantId) => {
    await apiClient.put(`/variants/${variantId}/reset-weight`);
    queryClient.invalidateQueries({ queryKey: ['VARIANTS', experimentId] });
    queryClient.invalidateQueries({ queryKey: ['ACTIVITY_LOG', experimentId] });
  };

  const setMaxWeight = async (variantId) => {
    await apiClient.put(`/variants/${variantId}/set-max-weight`);
    queryClient.invalidateQueries({ queryKey: ['VARIANTS', experimentId] });
    queryClient.invalidateQueries({ queryKey: ['ACTIVITY_LOG', experimentId] });
  };

  return {
    variants,
    createVariant,
    changeName,
    changeWeight,
    resetWeight,
    setMaxWeight,
    deleteVariant,
  };
};
