import { useEffect } from 'react';
import { render } from 'react-dom';
import { Button } from 'shadcn/button';
import { useExtensionData } from '@/state/useExtensionData';
import { useExtensionIframe } from '@/state/useExtensionIframe';

export const EditorSwitch = () => {
  const { isOpen, toggleOpen } = useExtensionIframe();

  return isOpen ? (
    <Button onClick={toggleOpen}>close editor</Button>
  ) : (
    <Button onClick={toggleOpen}>open editor</Button>
  );
};
