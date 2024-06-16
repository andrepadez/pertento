import { SettingsForm } from './SettingsForm';
import { SettingsHeader } from './SettingsHeader';
import { SettingsFooter } from './SettingsFooter';
import { useSettingsMenu } from '@/state/useSettingsMenu';
import { cn } from 'helpers/cn';

export const SettingsMenu = () => {
  const manager = useSettingsMenu();
  const { draggableRef, triggerRef } = manager.dragAndDrop;
  const { formManager, settingsOpen, toggleSettingsOpen } = manager;
  const { isDisabled } = formManager;

  return (
    <div
      ref={draggableRef}
      className={cn(
        'absolute top-5 right-3 w-80 flex flex-col bg-white border-2 border-primary rounded-lg',
        !settingsOpen && 'h-auto',
      )}
    >
      <SettingsHeader isOpen={settingsOpen} triggerRef={triggerRef} toggleSettingsOpen={toggleSettingsOpen} />
      <div
        className="relative flex flex-col py-3 overflow-hidden"
        style={{
          height: settingsOpen ? '600px' : '0px',
          maxHeight: '60vh',
          padding: settingsOpen ? '' : '0',
          overflowY: 'auto',
        }}
      >
        <SettingsForm manager={manager} />
      </div>
      <SettingsFooter manager={manager} />
    </div>
  );
};
