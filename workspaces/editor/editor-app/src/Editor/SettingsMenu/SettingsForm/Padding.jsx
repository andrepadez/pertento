import { AccordionContent, AccordionItem, AccordionTrigger } from 'shadcn/accordion';
import { AlignVerticalDistributeCenter } from 'lucide-react';
import { Input } from 'shadcn/input';
import { cn } from 'helpers/cn';

export const Padding = () => {
  return (
    <AccordionItem className={cn('border-2 px-2')} value="padding">
      <AccordionTrigger className="justify-between text-base no-underline hover:no-underline">
        <AlignVerticalDistributeCenter />
        <div className="">Padding</div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3 p-2">
        <div className="flex justify-between gap-3">
          <Input className="h-12 text-lg" name="paddingLeft" placeholder="Left" />
          <Input className="h-12 text-lg" name="paddingRight" placeholder="Right" />
        </div>
        <div className="flex justify-between gap-3">
          <Input className="h-12 text-lg" name="paddingTop" placeholder="Top" />
          <Input className="h-12 text-lg" name="paddingBottom" placeholder="Bottom" />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
