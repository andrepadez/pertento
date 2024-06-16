import { ConfirmDialog } from 'components/Dialogs';

export const DeleteVariant = ({ manager, variant, onClose }) => {
  const { deleteVariant } = manager;
  return (
    <ConfirmDialog
      title={`Delete Variant ${variant.name}?`}
      text="Please note that the variant will be permanently removed from the system and all the changes as well!"
      confirmLabel="Delete"
      level="destructive"
      onClose={onClose}
      onConfirm={async () => {
        await deleteVariant(variant.id);
        onClose();
      }}
    />
  );
};
