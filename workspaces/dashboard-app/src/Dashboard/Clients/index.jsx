import { useState, useEffect } from 'react';
import { Card } from 'shadcn/card';
import { SearchInput } from 'components/SearchInput';
import { ClientsTable } from './ClientsTable';
import { AddClient } from './AddClient';
import { useOrganizations } from '@/state/useOrganizations';
import { useWebsites } from '@/state/useWebsites';

export const ClientsListScreen = () => {
  const organizationsManager = useOrganizations();
  const { searchText, setSearchText } = organizationsManager;

  return (
    <div className="grid gap-5">
      <h1>Clients</h1>
      <div className="flex items-center justify-between">
        <SearchInput value={searchText} handleSearch={setSearchText} placeholder="Search organizations" />
        <AddClient manager={organizationsManager} />
      </div>
      <Card>
        <ClientsTable manager={organizationsManager} />
      </Card>
    </div>
  );
};
