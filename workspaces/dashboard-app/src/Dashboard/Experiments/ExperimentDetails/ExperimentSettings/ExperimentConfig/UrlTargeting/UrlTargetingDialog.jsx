import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Select } from 'components/Select';
import { ConfirmDialog } from 'components/Dialogs';
import { useForm } from 'hooks/useForm';

export const UrlTargetingDialog = ({ item, manager, experiment, onClose }) => {
  const { URL_TARGETING_CONDITIONS, addUrlTargeting, editUrlTargeting } = manager;
  const { state, formRef, update } = useForm(item);

  const onConfirm = async (ev) => {
    ev.preventDefault();
    if (state.id) {
      await editUrlTargeting(state);
    } else {
      await addUrlTargeting(state);
    }
    onClose();
  };

  return (
    <ConfirmDialog title="Add Url Targeting" onConfirm={onConfirm} onClose={onClose}>
      <form className="flex flex-col gap-5" ref={formRef} onSubmit={onConfirm}>
        <div className="flex flex-col gap-3">
          <Label>Url</Label>
          <Input name="url" />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Condition</Label>
          <Select
            value={state.condition}
            update={update}
            name="condition"
            options={URL_TARGETING_CONDITIONS}
          />
        </div>
      </form>
    </ConfirmDialog>
  );
};
