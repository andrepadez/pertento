import { useState } from 'react';
import { Select as ShadSelect, SelectContent, SelectGroup } from 'shadcn/select';
import { SelectItem, SelectLabel, SelectTrigger, SelectValue } from 'shadcn/select';
import { cn } from 'helpers/cn';

export function Select(props) {
  const { options, value, onChange, onValueChange, label } = props;
  const { name, className, placeholder = 'Select...', update } = props;

  const [selectedOption, setSelectedOption] = useState(() =>
    options.find((opt) => (opt.value || opt).toString() === value?.toString()),
  );

  if (!options) return null;

  const onLocalValueChange = (value) => {
    onChange && onChange({ target: { name, value } });
    onValueChange && onValueChange(value);
    update && update((state) => ({ ...state, [name]: value }));
    const selectedOption = options.find(
      (opt) => (opt.value || opt).toString() === value.toString(),
    );
    setSelectedOption(selectedOption);
  };

  return (
    <ShadSelect
      {...props}
      className={cn('w-full', className)}
      value={value}
      onValueChange={onLocalValueChange}
    >
      <SelectTrigger className={cn('w-full', className)}>
        {!selectedOption ? (
          <span className="text-muted-foreground">{placeholder}</span>
        ) : (
          <SelectValue>{selectedOption?.label || selectedOption}</SelectValue>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => {
            const value = option.value || option;
            const label = option.label || option;
            return (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </ShadSelect>
  );
}
