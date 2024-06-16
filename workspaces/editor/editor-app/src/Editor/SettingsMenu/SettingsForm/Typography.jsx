import { AccordionContent, AccordionItem, AccordionTrigger } from 'shadcn/accordion';
import { WholeWord } from 'lucide-react';
import { Input } from 'shadcn/input';
import { Select } from 'components/Select';
import { ColorPicker } from 'components/ColorPicker';
import { cn } from 'helpers/cn';
import { fontFamilies, textAlignValues, whiteSpaceProperties } from './constants';

export const Typography = ({ manager, addChange }) => {
  const { formState, update } = manager;
  return (
    <AccordionItem className={cn('border-2 px-2')} value="typography">
      <AccordionTrigger className="justify-between text-base no-underline hover:no-underline">
        <WholeWord />
        <div className="">Typography</div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3 p-2">
        <Input className="h-12 text-lg" name="textContent" placeholder="Text" />
        <Select
          className="h-12 text-lg"
          name="fontFamily"
          options={fontFamilies}
          update={update}
          placeholder="Font Family..."
        />
        <Input className="h-12 text-lg" name="fontSize" placeholder="Font Size" />
        <Input className="h-12 text-lg" name="fontWeight" placeholder="Font Weight" />
        <Select
          className="h-12 text-lg"
          name="textAlign"
          options={textAlignValues}
          update={update}
          placeholder="Text Align..."
        />
        <ColorPicker name="color" value={formState.color} label="Color" />
        <Input className="h-12 text-lg" name="textDecoration" placeholder="Text Decoration" />
        <Input className="h-12 text-lg" name="lineHeight" placeholder="Line Height" />
        <Select
          className="h-12 text-lg"
          name="whiteSpace"
          options={whiteSpaceProperties}
          update={update}
          placeholder="White Space"
        />
      </AccordionContent>
    </AccordionItem>
  );
};
