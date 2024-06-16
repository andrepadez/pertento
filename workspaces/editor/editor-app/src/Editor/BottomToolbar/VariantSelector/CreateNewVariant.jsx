import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { Plus } from 'lucide-react';
import { ConfirmDialog } from 'components/Dialogs';
import { useForm } from 'hooks/useForm';

export const CreateNewVariantDialog = ({ manager, isOpen, setIsOpen }) => {
  const { formRef, formState } = useForm();
  const { createVariant } = manager;

  const onConfirm = async (ev) => {
    const { variantName } = formState;
    const newVariant = await createVariant(variantName);
    const { origin } = new URL(window.location.href);
    window.open(`${origin}/editor/${newVariant.id}`);
    setIsOpen(false);
  };

  return (
    <ConfirmDialog
      onConfirm={onConfirm}
      onClose={() => setIsOpen(false)}
      className="w-96"
      title="Create new Variant"
      open={isOpen}
    >
      <div>
        <form ref={formRef}>
          <Label>Variant Name</Label>
          <Input name="variantName" />
        </form>
      </div>
    </ConfirmDialog>
  );
};
