import { useState } from 'react';
import { useWebsites } from '@/state/useWebsites';
import { Input } from 'shadcn/input';
import { Button } from 'shadcn/button';

export const ServerContainerUrl = ({ website }) => {
  const [newServerContainerUrl, setNewServerContainerUrl] = useState(null);
  const { setServerContainerUrl } = useWebsites();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    await setServerContainerUrl(website.id, newServerContainerUrl);
    setTimeout(() => setNewServerContainerUrl(null), 400);
  };

  return (
    <div>
      {newServerContainerUrl !== null ? (
        <form onSubmit={onSubmit} className="grid gap-3">
          <Input value={newServerContainerUrl} onChange={(ev) => setNewServerContainerUrl(ev.target.value)} />
          <div className="flex justify-between">
            <Button size="sm">Save</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setNewServerContainerUrl(null)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <a onClick={() => setNewServerContainerUrl(website.serverContainerUrl || '')}>
          {website.serverContainerUrl || `edit`}
        </a>
      )}
    </div>
  );
};
