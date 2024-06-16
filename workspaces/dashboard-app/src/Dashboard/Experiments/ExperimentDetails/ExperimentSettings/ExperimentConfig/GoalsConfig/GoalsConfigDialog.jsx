import { useState } from 'react';
import { Checkbox } from 'shadcn/checkbox';
import { Label } from 'shadcn/label';
import { ConfirmDialog } from 'components/Dialogs';
import { useWebsites } from '@/state/useWebsites';

export const GoalsConfigDialog = ({ manager, onClose }) => {
  const { experiment, updateExperiment } = manager;
  const { website, refreshPropertyTags } = useWebsites();
  const conversionTags = website?.ganPropertyTags.filter((tag) => tag.isConversion);
  const otherTags = website?.ganPropertyTags.filter((tag) => !tag.isConversion);
  const [goals, setGoals] = useState(
    new Set(experiment.eventGoals || conversionTags.map((tag) => tag.name)),
  );

  const onChange = (tag) => (ev) => {
    setGoals((goals) => {
      if (goals.has(tag.name)) {
        goals.delete(tag.name);
        return new Set(goals);
      } else {
        goals.add(tag.name);
        return new Set(goals);
      }
    });
  };

  const onConfirm = async (ev) => {
    await updateExperiment(experiment.id, {
      eventGoals: Array.from(goals),
    });
    onClose();
  };

  return (
    <ConfirmDialog
      title="Set the Goals for your experiment"
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col gap-5 p-5">
        <div className="flex gap-10">
          <div className="flex flex-col gap-3">
            <div className="font-bold">Conversion Tags</div>
            {conversionTags.map((tag) => (
              <div key={tag.name} className="flex items-center gap-2">
                <Checkbox
                  type="checkbox"
                  checked={goals.has(tag.name)}
                  onCheckedChange={onChange(tag)}
                />
                <Label>{tag.name}</Label>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">Other Tags</div>
            <div className="grid grid-cols-2 gap-3">
              {otherTags.map((tag) => (
                <div key={tag.name} className="flex items-center gap-2">
                  <Checkbox
                    type="checkbox"
                    checked={goals.has(tag.name)}
                    onCheckedChange={onChange(tag)}
                  />
                  <Label>{tag.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConfirmDialog>
  );
};
