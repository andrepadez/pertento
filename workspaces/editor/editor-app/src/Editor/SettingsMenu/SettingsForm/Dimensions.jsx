import { AccordionContent, AccordionItem, AccordionTrigger } from 'shadcn/accordion';
import { Proportions } from 'lucide-react';
import { Input } from 'shadcn/input';
import { cn } from 'helpers/cn';

export const Dimensions = () => {
  return (
    <AccordionItem className={cn('border-2 px-2')} value="dimensions">
      <AccordionTrigger className="justify-between text-base no-underline hover:no-underline">
        <Proportions />
        <div className="">Dimensions</div>
      </AccordionTrigger>
      <AccordionContent className="p-2">
        <div className="flex justify-between gap-3">
          <Input className="h-12 text-lg" name="width" placeholder="Width" />
          <Input className="h-12 text-lg" name="height" placeholder="Height" />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
