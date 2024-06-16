import { useEffect } from 'react';
import { render } from 'react-dom';
import { Switch } from 'shadcn/switch';
import { useExtensionData } from '@/state/useExtensionData';
import { useExtensionIframe } from '@/state/useExtensionIframe';

export const EditorSwitch = () => {
  const { isOpen, toggleOpen } = useExtensionIframe();

  return isOpen ? <a onClick={toggleOpen}>close editor</a> : <a onClick={toggleOpen}>open editor</a>;
};
