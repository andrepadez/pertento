import { Input } from 'shadcn/input';

export const ColorPicker = ({ value = '#000000', name, label }) => {
  return (
    <div style={{ borderWidth: '1px' }} className="relative w-full rounded">
      {label && (
        <span className="absolute z-10 px-2 ml-5 -mt-2 text-xs bg-white text-muted-foreground">
          {label}
        </span>
      )}
      <div className="flex items-center justify-between">
        <div className="h-12 p-0 overflow-hidden rounded-full">
          <Input
            defaultValue={value}
            className="absolute w-24 h-12 text-lg border-0 rounded-full"
            type="color"
            name={name}
            placeholder="Font Weight"
          />
        </div>
        <div>
          <Input
            name={name}
            className="text-base text-right border-0 outline-none focus:outline-none"
            defaultValue={value}
          />
        </div>
      </div>
    </div>
  );
};
