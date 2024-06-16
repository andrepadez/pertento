import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { Button } from 'shadcn/button';
import { Switch } from 'shadcn/switch';
import { Input } from 'shadcn/input';

export const ClientsTable = ({ manager, noDetails }) => {
  const { filteredOrgs, organizations, options } = manager;
  const { toggleOrganization, setOrganization, setSearch, changeFriendlyName } = manager;
  const [editing, setEditing] = useState(null);
  const [newFriendlyName, setNewFriendlyName] = useState(null);

  if (!organizations) return null;

  const optionIds = options?.map((o) => o.value);
  const orgsList = noDetails
    ? filteredOrgs?.filter((org) => optionIds.includes(org.id))
    : filteredOrgs;

  if (!orgsList) return null;

  return (
    <DataTable
      data={orgsList}
      columns={[
        {
          field: 'id',
          label: ' ',
          format: ({ value }) => (
            <Button onClick={() => setOrganization(value)} size="sm" variant="outline">
              select
            </Button>
          ),
        },
        {
          field: 'friendlyName',
          label: 'Organization Name',
          format: ({ value, item }) =>
            editing !== item.id ? (
              <div>{value}</div>
            ) : (
              <Input
                className="w-full"
                onChange={(ev) => setNewFriendlyName(ev.target.value)}
                value={newFriendlyName}
                autoFocus
              />
            ),
        },
        {
          field: 'id',
          label: ' ',
          format: ({ value, item }) =>
            value !== editing ? (
              <Button
                variant="outline"
                size="sm"
                disabled={!!editing}
                onClick={() => {
                  setEditing(value);
                  setNewFriendlyName(item.friendlyName);
                }}
              >
                edit name
              </Button>
            ) : (
              <div className="flex justify-around">
                <Button
                  size="sm"
                  onClick={async () => {
                    await changeFriendlyName(item.id, newFriendlyName);
                    setTimeout(() => setNewFriendlyName(null));
                    setEditing(null);
                  }}
                >
                  save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNewFriendlyName(null);
                    setEditing(null);
                  }}
                >
                  cancel
                </Button>
              </div>
            ),
        },
        { field: 'size', label: 'Size' },
        {
          field: 'active',
          label: 'Active',
          format: ({ value, item }) => (
            <Switch checked={value} onCheckedChange={toggleOrganization(item)} />
          ),
        },
      ]}
    />
  );
};
