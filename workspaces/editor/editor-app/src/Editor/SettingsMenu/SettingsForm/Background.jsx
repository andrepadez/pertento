import { AccordionContent, AccordionItem, AccordionTrigger } from 'shadcn/accordion';
import { Input } from 'shadcn/input';
import { Select } from 'components/Select';
import { SwatchBook } from 'lucide-react';
import { ColorPicker } from 'components/ColorPicker';
import { backgroundSizeValues, backgroundRepeatValues } from './constants';
import { cn } from 'helpers/cn';

export const Background = ({ manager, addChange }) => {
  const { formState, update } = manager;
  return (
    <AccordionItem className={cn('border-2 px-2')} value="background">
      <AccordionTrigger className="justify-between text-base no-underline hover:no-underline">
        <SwatchBook />
        <div className="">Background</div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3 p-2">
        <ColorPicker
          name="backgroundColor"
          value={formState.backgroundColor}
          label="Background Color"
        />
        <Input className="h-12 text-lg" name="backgroundImage" placeholder="Background Image" />
        <Select
          name="backgroundSize"
          className="h-12 text-lg"
          options={backgroundSizeValues}
          update={update}
          placeholder="Background Size..."
        />
        <Select
          name="backgroundRepeat"
          className="h-12 text-lg"
          options={backgroundRepeatValues}
          update={update}
          placeholder="Background Repeat..."
        />
      </AccordionContent>
    </AccordionItem>
  );
};
