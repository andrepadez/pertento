import { AccordionContent, AccordionItem, AccordionTrigger } from 'shadcn/accordion';
import { SquareCode } from 'lucide-react';
import { Input } from 'shadcn/input';
import { cn } from 'helpers/cn';

export const Source = () => {
  return (
    <AccordionItem className={cn('border-2 px-2')} value="source">
      <AccordionTrigger className="justify-between text-base no-underline hover:no-underline">
        <SquareCode />
        <div className="">Source</div>
      </AccordionTrigger>
      <AccordionContent className="p-2">
        <Input className="h-12 text-lg" name="src" placeholder="src" />
      </AccordionContent>
    </AccordionItem>
  );
};
