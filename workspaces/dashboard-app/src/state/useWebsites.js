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
  const { user } = useAuth();
  const { organization, website, setWebsite } = useOrganizations();
  const [options, setOptions] = useState(null);
  const [rechecking, setRechecking] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const apiClient = useClient();
  const ganClient = useClient(`${import.meta.env.VITE_GAN_URL}`);

  useEffect(() => {
    if (user) {
      if (organization) {
        const { websites } = organization;
        setOptions(websites.map((org) => ({ value: org.id, label: org.url })));
        if (user.company.type === 'Client Account') {
          if (!website) {
            const searchParams = new URLSearchParams(window.location.search);
            const qsWebsite = searchParams.get('ws');
            setWebsite(+qsWebsite || websites[0]?.id);
          }
        }
      } else {
        setOptions([]);
      }
    }
  }, [organization]);

  useEffect(() => {
    if (user && user.company.type === 'Company' && organization) {
      const { website } = organization;
      if (websites?.length > 0 && !website) {
        setWebsite(websites[0].id);
      }
    }
  }, [user, organization]);

  const createWebsite = async (values) => {
    const { id: userId } = user;
    const { ganPropertyId, url } = values;
    const { protocol, host, pathname } = new URL(url);

    const payload = {
      companyId: organization.id,
      parentCompanyId: organization.parentCompanyId,
      url: `${protocol}//${host}${pathname}`,
    };
    const newWebsite = await apiClient.post('/websites', payload);
    queryClient.invalidateQueries({ queryKey: ['WEBSITES'] });
    setTimeout(() => setWebsite(newWebsite.id), 50);
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
    websites: organization?.websites,
    website: organization?.websites?.find((ws) => ws.id === +website),
    options,
    rechecking,
    setWebsite,
    createWebsite,
    refreshPropertyTags,
    deleteWebsite,
    recheckPermissions,
  };
};
