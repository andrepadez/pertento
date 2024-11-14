import { Label } from 'shadcn/label';
import { Select } from 'components/select';
import { Input } from 'shadcn/input';
import { CircleX } from 'lucide-react';
import { cn } from 'shadcn/cn';
import { EXPERIMENT_TYPES } from 'misc';

export const CreateExperimentForm = ({ newExperiment, update, formRef, onSubmit }) => {
  const { name, type, editorUrl, variants } = newExperiment;

  const addVariant = () => {
    update((state) => ({
      ...state,
      variants: [...state.variants, { name: '', redirectUrl: '' }],
    }));
  };

  const removeVariant = (variant) => () => {
    update((state) => {
      return { ...state, variants: state.variants.filter((v) => v !== variant) };
    });
  };

  const updateVariant = (idx) => (ev) => {
    const { value, dataset } = ev.target;
    const { field } = dataset;
    update((state) => {
      const newVariants = [...state.variants];
      newVariants[idx] = { ...newVariants[idx], [field]: value };
      return { ...state, variants: newVariants };
    });
  };

  return (
    <form ref={formRef} className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="grid gap-3">
        <Label>Experiment Type </Label>
        <Select value={type} name="type" options={EXPERIMENT_TYPES} update={update} />
      </div>
      <div className="grid gap-3">
        <Label>Experiment Name </Label>
        <Input name="name" />
      </div>
      {type === 'Multi Variant' && (
        <div className="grid gap-3">
          <Label>Editor URL </Label>
          <Input name="editorUrl" />
        </div>
      )}
      <div className="grid gap-3 mb-4">
        <Label>Variants: </Label>
        {variants.map((variant, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <Input value={variant.name} placeholder="Variant Name" data-field="name" onChange={updateVariant(idx)} />
            {type === 'URL Redirect' && (
              <Input
                value={variant.redirectUrl}
                placeholder="Redirect URL"
                data-field="redirectUrl"
                onChange={updateVariant(idx)}
              />
            )}
            {variants.length > 1 && (
              <CircleX
                className={cn('size-6 text-red-500', type === 'URL Redirect' && 'size-12')}
                onClick={removeVariant(variant)}
              />
            )}
          </div>
        ))}
        <div className="text-right">
          <a onClick={addVariant}>add more</a>
        </div>
      </div>
    </form>
  );
};

['Multi Variant', 'Server Side', 'URL Redirect'];
