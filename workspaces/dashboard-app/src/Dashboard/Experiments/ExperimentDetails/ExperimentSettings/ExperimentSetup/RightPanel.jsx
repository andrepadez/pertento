import { Label } from 'shadcn/label';
import { Input } from 'shadcn/input';

export const RightPanel = ({ formRef, step }) => {
  return (
    <div className="col-span-3">
      <form ref={formRef}>
        {step === 1 && (
          <div>
            <div className="flex flex-col h-24 gap-3">
              <h2 className="font-bold">Define your editor page</h2>
              <p>This page will be used to make changes for all variants within this experiment</p>
            </div>
            <div className="grid h-20 gap-3">
              <Label>Editor Url</Label>
              <Input name="editorUrl" />
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="flex flex-col h-24 gap-3">
              <h2 className="font-bold">Choose Variant Name</h2>
              <p>Choose a descriptive name for your first variant.</p>
            </div>
            <div className="grid h-20 gap-3">
              <Label>Variant Name</Label>
              <Input name="variantName" />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
