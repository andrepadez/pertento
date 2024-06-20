import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGlobal } from 'hooks/useGlobal';
import { useClient } from 'hooks/useClient';
import { useAuth } from 'hooks/useAuth';
import { useQueryState } from 'hooks/useQueryState';
import { COMPANY_SIZES } from 'misc';

const lsKey = 'PERTENTO_ORGANIZATION';

export const useOrganizations = () => {
  const [clientAccount, setClientAccount] = useQueryState('org', null, true);
  const [website, setWebsite] = useQueryState('ws', null, true);
  const [searchText, setSearchText] = useQueryState('searchText', '');
  const [options, setOptions] = useState();
  const [filteredOrgs, setFilteredOrgs] = useState();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const apiClient = useClient();

  useEffect(() => {
    if (isAuthenticated && user.company.type !== 'Agency') {
      setClientAccount(user.company.id);
    }
  }, [user, isAuthenticated]);

  const { data: clientAccounts } = useQuery({
    queryKey: ['CLIENT_ACCOUNTS'],
    queryFn: () => {
      return user.company.type === 'Agency' ? apiClient.get(`/companies/${user.company.id}/clients`) : [user.company];
    },
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (clientAccounts) {
      const lsDisabledAccountClients = localStorage.getItem('DISABLED_ACCOUNT_CLIENTS');
      const disabledAccountClients = new Set(JSON.parse(lsDisabledAccountClients) || []);
      const options = clientAccounts
        .filter((org) => !disabledAccountClients.has(org.id))
        .map((org) => ({ value: org.id, label: org.friendlyName }));

      setOptions(options);
      setFilteredOrgs(clientAccounts);
      if (!clientAccount || !options.find(({ value }) => value === clientAccount)) {
        const searchParams = new URLSearchParams(window.location.search);
        const qsOrg = searchParams.get('org');
        const qsWebsite = searchParams.get('ws');
        const selectedClientAccount = clientAccounts.find((ca) => ca.id === (+qsOrg || options[0]?.value));
        const selectedWebsite = selectedClientAccount?.websites.find((ws) => {
          if (qsWebsite && ws.id === +qsWebsite) return ws;
        });
        setClientAccount(selectedClientAccount.id);
        setWebsite(selectedWebsite?.id || selectedClientAccount.websites[0]?.id);
      }

      clientAccounts.forEach((org) => {
        org.active = !disabledAccountClients.has(org.id);
      });
    }
  }, [clientAccounts]);

  const toggleOrganization = (organization) => (checked) => {
    const lsDisabledAccountClients = localStorage.getItem('DISABLED_ACCOUNT_CLIENTS');
    const disabledAccountClients = new Set(JSON.parse(lsDisabledAccountClients) || []);
    if (checked) {
      disabledAccountClients.delete(organization.id);
    } else {
      disabledAccountClients.add(organization.id);
    }
    localStorage.setItem('DISABLED_ACCOUNT_CLIENTS', JSON.stringify([...disabledAccountClients]));
    queryClient.invalidateQueries({ queryKey: ['CLIENT_ACCOUNTS'] });
  };

  const createOrganization = async (payload) => {
    const { id: parentCompanyId } = user.company;
    const newOrganization = await apiClient.post('/companies', { ...payload, parentCompanyId });
    queryClient.invalidateQueries({ queryKey: ['CLIENT_ACCOUNTS'] });
    setTimeout(() => setClientAccount(newOrganization.id), 50);
  };

  useEffect(() => {
    if (clientAccounts) {
      setFilteredOrgs(
        clientAccounts.filter((acc) => acc.friendlyName.toLowerCase().includes(searchText.toLowerCase())),
      );
    }
  }, [clientAccounts, searchText]);

  const changeOrganization = (id) => {
    const selectedClientAccount = clientAccounts.find((ca) => ca.id === id);
    if (!selectedClientAccount) return;
    setClientAccount(selectedClientAccount.id);
    setWebsite(selectedClientAccount.websites[0]?.id);
  };

  const changeFriendlyName = async (id, friendlyName) => {
    await apiClient.put(`/companies/${id}`, { friendlyName });
    queryClient.invalidateQueries({ queryKey: ['CLIENT_ACCOUNTS'] });
  };

  const updateOrganization = async (companyId, payload) => {
    await apiClient.put(`/companies/${companyId}`, payload);
  };

  return {
    organizations: clientAccounts,
    organization: clientAccounts?.find((ca) => ca.id === clientAccount),
    companySizeOptions: COMPANY_SIZES,
    website,
    setWebsite,
    filteredOrgs,
    options,
    setOrganization: changeOrganization,
    createOrganization,
    changeFriendlyName,
    updateOrganization,
    toggleOrganization,
    searchText,
    setSearchText,
  };
};
