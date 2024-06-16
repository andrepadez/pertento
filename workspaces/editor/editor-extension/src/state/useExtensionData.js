import { useEffect } from 'react';
import { get as idbGet } from 'idb-keyval';
import { useQuery } from '@tanstack/react-query';
import { useGlobal } from 'hooks/useGlobal';
import { useAuth } from 'hooks/useAuth';
import { useClient } from 'hooks/useClient';
import { retrieveWebsiteId } from '@/shared/retrieve-website-id';
import { changeExtensionIcon } from '@/shared/change-extension-icon';
const lsKeyExperimentId = 'PERTENTO_SELECTED_EXPERIMENT_ID';
const lsKeyVariantId = 'PERTENTO_SELECTED_VARIANT_ID';

export const useExtensionData = () => {
  const [websiteId, setWebsiteId] = useGlobal('PERTENTO_WEBSITE_ID', null);
  const [tabId, setTabId] = useGlobal('PERTENTO_TAB_ID', null);
  const [experimentId, setExperimentId] = useGlobal(lsKeyExperimentId, null);
  const [variantId, setVariantId] = useGlobal(lsKeyVariantId, null);
  const { user } = useAuth();
  const client = useClient();

  useEffect(() => {
    if (chrome?.tabs?.query) {
      chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
        setTabId(tab.id);
      });
    }
  }, [chrome, chrome?.tabs]);

  useEffect(() => {
    if (tabId) {
      try {
        retrieveWebsiteId(tabId).then(({ websiteId }) => {
          setWebsiteId(websiteId);
        });
      } catch (ex) {
        console.error(ex);
      }
    }
  }, [tabId]);

  const { data: experiments, isLoading } = useQuery({
    queryKey: ['EXPERIMENTS'],
    enabled: !!user && !!websiteId && !!tabId,
    queryFn: async () => {
      try {
        const all = await client.get(`/editor-data/websites/${websiteId}/experiments`);
        const reduced = all.reduce(
          (acc, experiment) => {
            const { status } = experiment;
            const bucket = status === 'Draft' ? 'drafts' : 'running';
            acc[bucket].push(experiment);
            return acc;
          },
          { drafts: [], running: [] },
        );

        return { all, ...reduced };
      } catch (ex) {
        alert(ex.message);
      }
    },
  });

  useEffect(() => {
    const experimentId = +localStorage.getItem(lsKeyExperimentId);
    const variantId = +localStorage.getItem(lsKeyVariantId);

    const selectedExperiment = experiments?.all.find((exp) => exp.id === experimentId);
    const selectedVariant = selectedExperiment?.variants.find((variant) => variant.id === variantId);

    if (selectedExperiment) setExperimentId(selectedExperiment.id);
    if (selectedVariant) setVariantId(selectedVariant.id);
  }, [experiments]);

  const changeVariant = (ev) => {
    const { experiment: experimentId, variant: variantId } = ev.currentTarget.dataset;
    setExperimentId(null);
    setVariantId(null);
    localStorage.removeItem(lsKeyExperimentId);
    localStorage.removeItem(lsKeyVariantId);
    setTimeout(() => {
      setExperimentId(+experimentId);
      setVariantId(+variantId);
      localStorage.setItem(lsKeyExperimentId, experimentId);
      localStorage.setItem(lsKeyVariantId, variantId);
    });
  };

  const changeExperiment = (ev) => {
    const { experiment: experimentId } = ev.currentTarget.dataset;
    setExperimentId(+experimentId);
    setVariantId(null);
    localStorage.setItem(lsKeyExperimentId, experimentId);
    localStorage.removeItem(lsKeyVariantId);
  };

  return {
    tabId,
    websiteId,
    experiments,
    variantId,
    experimentId,
    changeVariant,
    changeExperiment,
  };
};
