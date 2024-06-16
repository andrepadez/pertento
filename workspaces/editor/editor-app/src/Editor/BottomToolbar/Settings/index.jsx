import React from 'react';
import { Button } from 'shadcn/button';
import { Settings as SettingsIcon } from 'lucide-react';

export const Settings = () => {
  return (
    <Button variant="outline">
      <SettingsIcon />
    </Button>
  );
};
