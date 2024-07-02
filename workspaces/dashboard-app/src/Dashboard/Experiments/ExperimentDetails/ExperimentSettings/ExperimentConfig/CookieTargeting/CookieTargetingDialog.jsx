import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Textarea } from 'shadcn/textarea';
import { ConfirmDialog } from 'components/Dialogs';
import { useForm } from 'hooks/useForm';

export const CookieTargetingDialog = ({ item, manager, experiment, onClose }) => {
  const { cookieTargeting, addCookieTargeting } = manager;
  const { formRef, state, update } = useForm(item);

  console.log(cookieTargeting);

  const onConfirm = async (ev) => {
    ev.preventDefault();
    await addCookieTargeting(state);
    onClose();
  };

  return (
    <ConfirmDialog title="Add Device Targeting" onConfirm={onConfirm} onClose={onClose} disabled={!state.device}>
      <form className="flex flex-col gap-5" ref={formRef} onSubmit={onConfirm}>
        <div className="grid grid-cols-2 gap-8">
          <Label className="flex flex-col gap-3">
            <div className="grid gap-4 mt-5 mb-6">
              <p>Set the name of the cookie you want to target, above.</p>
              <p>On the right, list the possible values you want to target, one in each line</p>
            </div>
            <span>Cookie Name:</span>
            <Input name="cookieName" />
          </Label>
          <Label className="flex flex-col gap-3">
            <span>Possible values:</span>
            <Textarea name="cookieValues" className="min-h-96" />
          </Label>
        </div>
      </form>
    </ConfirmDialog>
  );
};
