import { BottomToolbar } from './BottomToolbar';
import { SettingsMenu } from './SettingsMenu';
import { ContextMenu } from './ContextMenu';
import { CodeEditorWindow } from './CodeEditorWindow';
import { useEditorSetup } from '@/state/useEditorSetup';
import { useIframe } from '@/state/useIframe';

export const Editor = ({}) => {
  const { iframeRef, websiteUrl } = useIframe();
  const { experiment, isLoaded } = useEditorSetup();

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col h-[100vh] w-full text-base">
      <div className="flex-1">
        <iframe id="pertento-website-iframe" width="100%" height="100%" ref={iframeRef} src={websiteUrl} />
      </div>
      <BottomToolbar />
      <SettingsMenu />
      <CodeEditorWindow />
      <ContextMenu />
    </div>
  );
};
