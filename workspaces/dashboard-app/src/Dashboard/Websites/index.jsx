import { WebsitesTable } from './WebsitesTable';
import { AddWebsite } from './AddWebsite';
import { useWebsites } from '@/state/useWebsites';
import { SearchInput } from 'components/SearchInput';

export const WebsitesScreen = () => {
  const websitesManager = useWebsites();

  return (
    <main className="flex flex-col gap-10">
      <div className="flex justify-between">
        <h1>Websites</h1>
        <AddWebsite manager={websitesManager} />
      </div>
      <WebsitesTable manager={websitesManager} />
    </main>
  );
};
