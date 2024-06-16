import { useQueryClient } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { useAuth } from 'hooks/useAuth';
import { useIframe } from './useIframe';
import { useVariants } from './useVariants';
import { applyChanges, applyGlobals } from 'helpers/injector/apply-changes';

export const useChangesMutations = () => {
  const queryClient = useQueryClient();
  const apiClient = useClient();
  const { user } = useAuth();
  const { variant, updateVariant } = useVariants();
  const { sendMessage } = useIframe();

  const saveChanges = async (changes, refresh = true) => {
    const theChanges = changes.map((change) => ({
      ...change,
      variantId: variant.id,
      userId: user.id,
    }));

    if (!theChanges.length) return;
    const dbChanges = await apiClient.post(`/changes`, theChanges);

    if (refresh) {
      queryClient.invalidateQueries({ queryKey: ['CHANGES'] });
    }
    return dbChanges;
  };

  const updateChange = async (id, changes) => {
    await apiClient.put(`/changes/${id}`, changes);
    queryClient.invalidateQueries({ queryKey: ['CHANGES'] });
  };

  const deleteChange = async (changeId) => {
    await apiClient.delete(`/changes/${changeId}`);
    queryClient.invalidateQueries({ queryKey: ['CHANGES'] });
  };

  const deleteAllChanges = async () => {
    await apiClient.delete(`/changes/delete-all/${variant.id}`);
    queryClient.invalidateQueries({ queryKey: ['CHANGES'] });
  };

  const addGlobalCode = async (language, value) => {
    const globals = language === 'css' ? { globalCSS: value } : { globalJavascript: value };
    await updateVariant(globals);
    sendMessage('PERTENTO_APPLY_GLOBALS', { globals });
    queryClient.invalidateQueries({ queryKey: ['CHANGES'] });
  };

  return {
    addGlobalCode,
    saveChanges,
    updateChange,
    deleteChange,
    deleteAllChanges,
  };
};
