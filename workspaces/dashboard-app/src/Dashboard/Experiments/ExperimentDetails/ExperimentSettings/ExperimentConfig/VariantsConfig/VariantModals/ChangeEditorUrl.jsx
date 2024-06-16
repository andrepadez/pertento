import { useState } from 'react';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { ConfirmDialog } from 'components/Dialogs';

export const ChangeEditorUrl = ({ experimentManager, onClose }) => {
  const { experiment, updateExperiment } = experimentManager;
  const [editorUrl, setEditorUrl] = useState(experiment.editorUrl);
  const onConfirm = async (ev) => {
    ev.preventDefault();
    await updateExperiment(experiment.id, {
      editorUrl: editorUrl,
    });
    onClose();
  };

  return (
    <ConfirmDialog
      title={`Change Editor URL`}
      confirmLabel="Save"
      onClose={onClose}
      disabled={!editorUrl || editorUrl === experiment.editorUrl}
      onConfirm={onConfirm}
    >
      <form onSubmit={onConfirm}>
        <Label className="block mb-3">Editor URL</Label>
        <Input
          defaultValue={experiment.editorUrl}
          onChange={(ev) => setEditorUrl(ev.target.value)}
        />
      </form>
    </ConfirmDialog>
  );
};
