import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useQueryState } from 'hooks/useQueryState';
import { useGlobal } from 'hooks/useGlobal';
import { useClient } from 'hooks/useClient';
import { useOrganizations } from './useOrganizations';

const lsKey = 'PERTENTO_WEBSITE';

export const useWebsites = () => {
  const [website, setWebsite] = useQueryState('ws', null, true);
  const { user } = useAuth();
  const { organization } = useOrganizations();
  const [options, setOptions] = useState(null);
  const [rechecking, setRechecking] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const apiClient = useClient();
  const ganClient = useClient(`${import.meta.env.VITE_GAN_URL}`);

  const { data: websites, isLoading } = useQuery({
    queryKey: ['WEBSITES', organization?.id],
    enabled: !!organization,
    queryFn: async () => apiClient.get(`websites/${organization.id}`),
  });

  useEffect(() => {
    if (websites) {
      setOptions(websites.map((org) => ({ value: org.id, label: org.url })));
      const searchParams = new URLSearchParams(window.location.search);
      const qsWs = +searchParams.get('ws');
      if (!website && qsWs && websites.find((ws) => ws.id === qsWs)) {
        setWebsite(qsWs);
      } else {
        setWebsite(websites[0]?.id);
      }
    }
  }, [websites]);

  useEffect(() => {
    if (user && user.company.type === 'Company') {
      if (websites?.length > 0 && !website) {
        setWebsite(websites[0].id);
      }
    }
  }, [user, websites, website]);

  const createWebsite = async (values) => {
    const { id: userId } = user;
    const { ganPropertyId, url } = values;
    const { protocol, host, pathname } = new URL(url);

    const payload = {
      // ganPropertyId,
      companyId: organization.id,
      parentCompanyId: organization.parentCompanyId,
      url: `${protocol}//${host}${pathname}`,
    };
    const newWebsite = await apiClient.post('/websites', payload);
    queryClient.invalidateQueries({ queryKey: ['WEBSITES'] });
    setTimeout(() => setWebsite(newWebsite.id), 50);
  };

  const changeWebsite = (id) => {
    setWebsite(id);
  };

  const refreshPropertyTags = async (website) => {
    const url = `/google-analytics/refresh-property-tags/${website.ganPropertyId}`;
    await ganClient.post(url);
    queryClient.invalidateQueries({ queryKey: ['WEBSITES'] });
  };

  const deleteWebsite = async (id) => {
    await apiClient.delete(`/websites/${id}`);
    queryClient.invalidateQueries({ queryKey: ['WEBSITES'] });
  };

  const recheckPermissions = async (ganPropertyId) => {
    setRechecking(true);
    await ganClient.get(`/google-oauth/recheck-permissions/${ganPropertyId}`);
    queryClient.invalidateQueries({ queryKey: ['WEBSITES'] });
    setRechecking(false);
  };

  return {
    websites,
    isLoading,
    website: websites?.find((ws) => ws.id === +website),
    options,
    rechecking,
    setWebsite: changeWebsite,
    createWebsite,
    refreshPropertyTags,
    deleteWebsite,
    recheckPermissions,
  };
};
