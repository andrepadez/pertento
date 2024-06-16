import { Button } from 'shadcn/button';
import { useDevices } from '@/state/useDevices';

import { DropdownMenu, DropdownMenuItem } from 'shadcn/dropdown-menu';
import { DropdownMenuContent, DropdownMenuTrigger } from 'shadcn/dropdown-menu';

export const DeviceSelector = () => {
  const { DEVICES, device, setDevice } = useDevices();
  const DeviceIcon = device.Icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-5 text-left text-blue-600" variant="outline">
          <span>{device.name}</span>
          <DeviceIcon className="w-6 h-6 font-bold text-blue-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col w-48 gap-5 px-5 py-5">
        {DEVICES.map((device) => {
          const Icon = device.Icon;
          return (
            <DropdownMenuItem
              onSelect={() => setDevice(device)}
              key={device.name}
              className="flex justify-between"
            >
              <span className="flex-1">{device.name}</span>
              <Icon className="w-5 h-5 mr-2" />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
