import { Button } from 'shadcn/button';

export const SettingsFooter = ({ manager }) => {
  const { dbChanges, localChanges } = manager.changesManager;
  const { onSave } = manager.formManager;

  return (
    <footer className="flex p-3 rounded-lg rounded-t-none rounded-b-none bg-primary">
      <div className="w-full">
        <div className="flex items-center justify-around flex-1 text-white">
          <div className="flex flex-col font-bold text-center">
            <span>{dbChanges.length || 0}</span>
            <small>saved</small>
          </div>
          <Button
            disabled={localChanges.length === 0}
            variant="outline"
            className="text-primary"
            onClick={onSave}
          >
            Save Changes
          </Button>
          <div className="flex flex-col font-bold text-center">
            <span>{localChanges.length || 0}</span>
            <small>local</small>
          </div>
        </div>
      </div>
    </footer>
  );
};
