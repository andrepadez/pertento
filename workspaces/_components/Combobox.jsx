import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from 'helpers/cn';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from 'shadcn/button';
import { ScrollArea } from 'shadcn/scroll-area';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/popover';
import { Separator } from 'shadcn/separator';

export const Combobox = ({ options, value, onChange, placeholder = 'Select...', className }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', className)}
        >
          <span className="block truncate">
            {value ? options?.find((option) => option.value === value)?.label : placeholder}
          </span>
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] justify-between', className)}>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty></CommandEmpty>
          <CommandGroup className="overflow-auto max-h-96">
            {options?.map((option) => (
              <div key={option.value}>
                <CommandItem
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (option.href) {
                      return navigate(option.href);
                    }
                    const newValue = options.find(
                      (option) => option.label.toLowerCase() === currentValue.toLowerCase(),
                    ).value;
                    value !== newValue && onChange(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
                {option.href && <Separator className="my-2" />}
              </div>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
