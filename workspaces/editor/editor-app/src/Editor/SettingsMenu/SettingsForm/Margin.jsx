import { AccordionContent, AccordionItem, AccordionTrigger } from 'shadcn/accordion';
import { AlignHorizontalDistributeCenter } from 'lucide-react';
import { Input } from 'shadcn/input';
import { cn } from 'helpers/cn';

export const Margin = () => {
  return (
    <AccordionItem className={cn('border-2 px-2')} value="margin">
      <AccordionTrigger className="justify-between text-base no-underline hover:no-underline">
        <AlignHorizontalDistributeCenter />
        <div className="">Margin</div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-3 p-2">
        <div className="flex justify-between gap-3">
          <Input className="h-12 text-lg" name="marginLeft" placeholder="Left" />
          <Input className="h-12 text-lg" name="marginRight" placeholder="Right" />
        </div>
        <div className="flex justify-between gap-3">
          <Input className="h-12 text-lg" name="marginTop" placeholder="Top" />
          <Input className="h-12 text-lg" name="marginBottom" placeholder="Bottom" />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
