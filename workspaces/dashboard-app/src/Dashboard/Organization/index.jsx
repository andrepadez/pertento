import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shadcn/tabs';
import { OrganizationSettings } from './OrganizationSettings';
import { OrganizationBilling } from './OrganizationBilling';
import { OrganizationTeams } from './OrganizationTeams';
import { useAuth } from 'hooks/useAuth';
import { useQueryState } from 'hooks/useQueryState';
import { useOrganizations } from '@/state/useOrganizations';

export const OrganizationDetailsScreen = () => {
  const { user } = useAuth();
  const { organization } = useOrganizations();
  const [screen, setScreen] = useQueryState('screen', 'general');
  if (!user || !organization) return;

  return (
    <div className="flex flex-col gap-5">
      <h1>Organization Settings</h1>
      <Tabs value={screen} defaultValue="general" onValueChange={setScreen}>
        <TabsList className="flex gap-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          {user.company.type === 'Agency' ? (
            <>
              <TabsTrigger value="agency">Agency Team</TabsTrigger>
              <TabsTrigger value="organization">Organization Team</TabsTrigger>
            </>
          ) : (
            <TabsTrigger value="organization">Team</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="general">
          <OrganizationSettings user={user} />
        </TabsContent>
        <TabsContent value="agency">
          <OrganizationTeams user={user} />
        </TabsContent>
        <TabsContent value="organization">
          <OrganizationTeams user={user} organization={organization} />
        </TabsContent>
        <TabsContent value="billing">
          <OrganizationBilling user={user} organization={organization} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
