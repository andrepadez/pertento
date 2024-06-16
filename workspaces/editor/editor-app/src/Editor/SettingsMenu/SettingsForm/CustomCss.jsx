import { useState, useEffect } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from 'shadcn/accordion';
import { ScanSearch } from 'lucide-react';
import { Input } from 'shadcn/input';
import { Button } from 'shadcn/button';
import { Select } from 'components/Select';
import { useChanges } from '@/state/useChanges';
import { useSelectedElements } from '@/state/useSelectedElements';
import { customProperties } from './constants';
import { cn } from 'helpers/cn';

export const CustomCss = ({ manager, addChange }) => {
  const [property, setProperty] = useState(null);
  const [value, setValue] = useState(null);
  const { selectedElements } = useSelectedElements();

  useEffect(() => {
    setProperty(null);
    setValue(null);
  }, [selectedElements]);

  const onAddChange = () => {
    addChange({ property, value });
    setProperty(null);
    setValue(null);
  };

  return (
    <AccordionItem className={cn('border-2 px-2')} value="custom-css">
      <AccordionTrigger className="justify-between text-base no-underline hover:no-underline">
        <ScanSearch />
        <div className="">Custom Css</div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-5 p-2">
        <div className="flex flex-col gap-3">
          <Select
            className="h-12 text-lg"
            placeholder="Select property..."
            value={property || null}
            onValueChange={setProperty}
            options={customProperties}
          />
          <Input
            className="h-12 text-lg"
            value={value || ''}
            placeholder="value"
            onChange={(ev) => setValue(ev.target.value)}
          />
        </div>
        <div>
          <Button className="w-full" disabled={!property || !value} onClick={onAddChange}>
            Add Change{' '}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
