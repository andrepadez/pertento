import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'shadcn/card';
import { Avatar, AvatarImage } from 'shadcn/avatar';
import { Button } from 'shadcn/button';
import { BadgeCheck, BadgeAlert } from 'lucide-react';
import { DataTable } from 'components/DataTable';
import { ScriptsModal } from './ScriptsModal';
import { ServerContainerUrl } from './ServerContainerUrl';

export const WebsitesTable = ({ manager }) => {
  const [copied, setCopied] = useState(null);
  const { websites = [], setWebsite, refreshPropertyTags, deleteWebsite } = manager;
  const { recheckPermissions, rechecking } = manager;

  const copyScriptTag = async (id) => {
    const { origin } = window.location;
    const scriptTag = `<script defer id="pertentoScript"  src="${origin}/pertentoRuntime.js?website-id=${id}"></script>`;
    await navigator.clipboard.writeText(scriptTag);
    setCopied(id);
    setTimeout(() => setCopied(null), 3000);
  };

  return (
    <Card>
      <DataTable
        data={websites}
        columns={[
          {
            field: 'id',
            label: 'ID',
            format: ({ value }) => (
              <Link onClick={() => setWebsite(value)} className="text-blue-500">
                {value}
              </Link>
            ),
          },
          {
            field: 'url',
            label: ' ',
            format: ({ value: url }) => (
              <div className="w-10 h-10 rounded-md">
                <Avatar>
                  <AvatarImage src={url + '/favicon.ico'} />
                </Avatar>
              </div>
            ),
          },
          {
            field: 'url',
            label: 'URL',
          },
          {
            field: 'id',
            label: 'Scripts',
            format: ({ value }) => <ScriptsModal websiteId={value} />,
          },
          {
            field: 'ganPropertyId',
            label: 'Property ID',
            format: ({ value }) => (value ? value : <Button>Connect</Button>),
          },
          {
            field: 'ganMeasurementId',
            label: 'Measurement ID',
            format: ({ value }) => <div className="text-sm">{value}</div>,
          },
          {
            field: 'serverContainerUrl',
            label: 'Server Container URL',
            format: ({ value, item }) => <ServerContainerUrl website={item} />,
          },
          // {
          //   field: 'ganPropertyId',
          //   label: 'Event Tags',
          //   format: ({ value, item }) =>
          //     value && (
          //       <Button onClick={() => refreshPropertyTags(item)} variant="outline" disabled={rechecking}>
          //         {rechecking ? 'Refreshing...' : 'Refresh'} ({item.ganPropertyTags?.length || 0})
          //       </Button>
          //     ),
          // },
          {
            field: 'ganProperty',
            label: 'Can Edit?',
            format: ({ value, item }) =>
              value && (
                <div className="flex items-center w-32 gap-3">
                  <div>
                    {value.hasEditPermission?.length > 0 ? (
                      <BadgeCheck className="w-8 h-8 text-green-500" />
                    ) : (
                      <BadgeAlert className="w-8 h-8 text-red-500" />
                    )}
                  </div>
                  <Button disabled={rechecking} onClick={() => recheckPermissions(item.ganPropertyId)} variant="ghost">
                    {rechecking ? 'Rechecking...' : 'Recheck'}
                  </Button>
                </div>
              ),
          },
          {
            field: 'id',
            label: ' ',
            format: ({ value }) => (
              <Button
                onClick={async () => {
                  if (confirm('Are you sure you want to delete this website?')) {
                    console.log('delete website', value);
                    await deleteWebsite(value);
                  }
                }}
              >
                delete
              </Button>
            ),
          },
        ]}
      />
    </Card>
  );
};
