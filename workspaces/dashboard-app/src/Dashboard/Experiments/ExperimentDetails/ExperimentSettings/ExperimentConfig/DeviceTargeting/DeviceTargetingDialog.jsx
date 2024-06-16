import { Select } from 'components/Select';
import { ConfirmDialog } from 'components/Dialogs';
import { useForm } from 'hooks/useForm';

export const DeviceTargetingDialog = ({ item, manager, experiment, onClose }) => {
  const { DEVICE_TYPES, deviceTargeting, addDeviceTargeting } = manager;
  const { formRef, state, update } = useForm(item);

  const onConfirm = async (ev) => {
    ev.preventDefault();
    await addDeviceTargeting(state.device);
    onClose();
  };

  const options = DEVICE_TYPES.filter(
    (type) => !deviceTargeting.find((item) => item.device === type),
  );

  return (
    <ConfirmDialog
      title="Add Device Targeting"
      onConfirm={onConfirm}
      onClose={onClose}
      disabled={!state.device}
    >
      <form className="flex flex-col gap-5" ref={formRef} onSubmit={onConfirm}>
        <div className="flex flex-col gap-3">
          <Select value={state.condition} update={update} name="device" options={options} />
        </div>
      </form>
    </ConfirmDialog>
  );
};
