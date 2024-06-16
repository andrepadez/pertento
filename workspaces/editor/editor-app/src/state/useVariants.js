import React, { useState, useLayoutEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { useEditorData } from './useEditorData';

export const useVariants = () => {
  const [open, setOpen] = useState(false);
  const [newVariant, setNewVariant] = useState(false);
  const { variant, variants, experiment } = useEditorData();

  const apiClient = useClient();
  const queryClient = useQueryClient();

  const openVariantEditor = (v) => {
    if (v.name === 'Original') {
      const { search } = window.location;
      return window.open(window.location.href.replace(search, ''), '_blank');
    }
    const url = new URL(window.location.href);
    url.searchParams.set('pertentoVariant', v.id);

    window.open(url, '_blank');
  };

  const createVariant = async (name) => {
    const { experimentId } = variant;
    const { companyId, parentCompanyId, websiteId } = experiment;
    const payload = { name, experimentId, websiteId, companyId, parentCompanyId };
    const newVariant = await apiClient.post(`/variants`, payload);
    queryClient.invalidateQueries({ queryKey: ['VARIANTS'] });
    return newVariant;
  };

  const updateVariant = async (changes) => {
    await apiClient.put(`/variants/${variant.id}`, changes);
    queryClient.invalidateQueries({ queryKey: ['VARIANTS'] });
  };

  return {
    newVariant,
    variant,
    variants,
    open,
    setOpen,
    openVariantEditor,
    setNewVariant,
    createVariant,
    updateVariant,
  };
};
