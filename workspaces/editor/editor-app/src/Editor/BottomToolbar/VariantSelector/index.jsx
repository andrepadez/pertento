import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent } from 'shadcn/dropdown-menu';
import { DropdownMenuItem, DropdownMenuLabel } from 'shadcn/dropdown-menu';
import { DropdownMenuSeparator, DropdownMenuTrigger } from 'shadcn/dropdown-menu';
import { CreateNewVariantDialog } from './CreateNewVariant';
import { Button } from 'shadcn/button';
import { Plus } from 'lucide-react';
import { useVariants } from '@/state/useVariants';

export const VariantSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const manager = useVariants();
  const { variant, variants } = manager;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex items-center justify-between w-48 gap-5 text-left"
            variant="outline"
          >
            <span>{variant.name}</span>
            <Plus className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="py-3 text-center">Choose Variant</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {variants.map((v) => (
            <DropdownMenuItem asChild key={v.id}>
              <Button
                onClick={() => openVariantEditor(v)}
                className="flex items-center justify-between w-48 gap-5 text-left"
                variant="ghost"
              >
                <span>{v.name}</span>
                <Plus className="w-4 h-4" />
              </Button>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-between w-full text-left"
            >
              <span>Create Variant</span>
              <Plus className="w-4 h-4" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateNewVariantDialog manager={manager} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
