import { Hierarchy } from './Hierarchy';
import { VariantSelector } from './VariantSelector';
import { QuerySelector } from './QuerySelector';
import { GlobalCode } from './GlobalCode';
import { DeviceSelector } from './DeviceSelector';
import { InteractivitySelector } from './InteractivitySelector';
import { MoveAnywhere } from './MoveAnywhere';
import { Reload } from './Reload';
import { Changes } from './Changes';
import { Settings } from './Settings';

export const BottomToolbar = () => {
  return (
    <div className="flex flex-col w-full h-24 bg-white" id="bottom-toolbar">
      <Hierarchy />
      <div className="flex items-center justify-between flex-1 px-3 dbg-blue-200">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 overflow-hidden rounded-full cursor-pointer">
            <img style={{ pointerEvents: 'auto' }} src="https://app.pertento.ai/logo.png" alt="logo" />
          </div>
          <VariantSelector />
          <QuerySelector />
          <GlobalCode />
        </div>

        <div className="flex items-center gap-5">
          <DeviceSelector />
        </div>

        <div className="flex items-center gap-5">
          <Changes />
          <MoveAnywhere />
          <InteractivitySelector />
          <Reload />
          <Settings />
        </div>
      </div>
    </div>
  );
};
