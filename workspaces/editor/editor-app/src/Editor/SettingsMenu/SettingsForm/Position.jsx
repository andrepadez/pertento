import { AccordionContent, AccordionItem, AccordionTrigger } from 'shadcn/accordion';
import { Move } from 'lucide-react';
import { Input } from 'shadcn/input';
import { Select } from 'components/Select';
import { cn } from 'helpers/cn';
import { positionValues } from './constants';

export const Position = ({ manager, addChange }) => {
  const { update } = manager;
  return (
    <AccordionItem className={cn('border-2 px-2')} value="position">
      <AccordionTrigger className="justify-between text-base no-underline hover:no-underline">
        <Move className="scale-90" />
        <div className="">Position</div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3 p-2">
        <Select
          className="h-12 text-lg"
          name="position"
          update={update}
          options={positionValues}
          placeholder="Position..."
          onChange={update}
        />
        <div className="flex justify-between gap-3">
          <Input className="h-12 text-lg" name="left" placeholder="Left" />
          <Input className="h-12 text-lg" name="right" placeholder="Right" />
        </div>
        <div className="flex justify-between gap-3">
          <Input className="h-12 text-lg" name="top" placeholder="Top" />
          <Input className="h-12 text-lg" name="bottom" placeholder="Bottom" />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
