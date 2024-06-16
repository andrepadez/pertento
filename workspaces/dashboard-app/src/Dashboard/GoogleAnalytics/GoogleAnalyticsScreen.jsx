import { Card } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { DataTable } from 'components/DataTable';
import { Avatar } from 'components/Avatar';
import { useGoogleAccounts } from '@/state/googleAnalytics/useGoogleAccounts';
const { VITE_GAN_URL } = import.meta.env;

export const GoogleAnalyticsScreenContent = () => {
  const googleAccountsManager = useGoogleAccounts();
  const { googleAccounts, onConnect, refresh } = googleAccountsManager;
  if (!googleAccounts) return null;

  return (
    <main className="flex flex-col gap-20">
      <div className="flex items-center justify-between">
        <h1>Google Accounts Management</h1>
        <Button onClick={onConnect}>Connect a Google account</Button>
      </div>

      <Card>
        <DataTable
          uniqueKey="email"
          data={googleAccounts}
          columns={[
            {
              field: 'image',
              label: '',
              format: ({ value }) => <Avatar className="w-12 h-12 rounded-full" src={value} />,
            },
            {
              field: 'name',
              label: 'Name',
            },
            {
              field: 'email',
              label: 'Email',
            },
            {
              field: 'accountsCount',
              label: '# Accounts',
            },
            {
              field: 'lastRefreshed',
              label: 'last updated',
              format: ({ value }) => {
                const date = new Date(value);
                return <div>{date.getFullYear() > 1970 ? date.toLocaleString() : 'never'}</div>;
              },
            },
            {
              field: 'email',
              label: '',
              format: ({ value }) => (
                <Button size="sm" onClick={() => refresh(value)}>
                  Refresh
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </main>
  );
};
