import { Label } from 'shadcn/label';
import { Input } from 'shadcn/input';
import { CircleX } from 'lucide-react';

export const MultiVariantForm = ({ newExperiment, update }) => {
  const { variants } = newExperiment;

  const addVariant = () => {
    update((state) => ({
      ...state,
      variants: [...state.variants, { name: '' }],
    }));
  };

  const removeVariant = (variant) => () => {
    update((state) => {
      return { ...state, variants: state.variants.filter((v) => v !== variant) };
    });
  };

  const updateVariant = (idx) => (ev) => {
    const { value } = ev.target;
    update((state) => {
      const newVariants = [...state.variants];
      newVariants[idx] = { ...newVariants[idx], name: value };
      return { ...state, variants: newVariants };
    });
  };

  return (
    <>
      <div className="grid gap-2">
        <Label>Editor URL </Label>
        <Input name="editorUrl" />
      </div>
      <div className="grid gap-2">
        <Label>Variants: </Label>
        {variants.map((variant, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <Input value={variant.name} onChange={updateVariant(idx)} />
            {variants.length > 1 && <CircleX className="text-red-500" size={24} onClick={removeVariant(variant)} />}
          </div>
        ))}
        <div className="text-right">
          <a onClick={addVariant}>add more</a>
        </div>
      </div>
    </>
  );
};
