import { log } from 'helpers/injector/console';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGlobal } from 'hooks/useGlobal';
import { useClient } from 'hooks/useClient';

export const useEditorData = () => {
  const { pertentoVariant: variantId } = document.body.dataset;
  const [theVariantId, setTheVariantId] = useGlobal('THE_VARIANT_ID', +variantId);
  const [changes, setChanges] = useGlobal('THE_CHANGES', null);
  const [globals, setGlobals] = useGlobal('THE_GLOBALS', null);

  const queryClient = useQueryClient();
  const apiClient = useClient();

  const { data: variant } = useQuery({
    queryKey: ['VARIANT'],
    queryFn: () => apiClient.get(`/editor-data/variant/${theVariantId}`),
    enabled: !!theVariantId,
  });

  const { data: dbChanges } = useQuery({
    queryKey: ['CHANGES'],
    enabled: !!theVariantId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: () =>
      apiClient.get(`/editor-data/variant/${theVariantId}/changes`).then((data) => {
        const theChanges = data.slice(1);
        setGlobals(data[0]);
        setChanges(theChanges);
        return data;
      }),
  });

  const { data: experiment } = useQuery({
    enabled: !!variant,
    queryKey: ['EXPERIMENT', variant?.experimentId],
    queryFn: () => apiClient.get(`/editor-data/experiment/${variant?.experimentId}`),
  });

  const { data: variants } = useQuery({
    enabled: !!variant,
    queryKey: ['VARIANTS', variant?.experimentId],
    queryFn: () => apiClient.get(`/editor-data/variants/${variant.experimentId}`),
  });

  const isLoaded = !!variant && !!variants && !!experiment && !!changes;

  return {
    variantId: theVariantId,
    variant,
    variants,
    experiment,
    changes,
    globals,
    setChanges,
    isLoaded,
  };
};
