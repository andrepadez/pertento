import { Dialog } from '@/Components/Dialog';
import { Input } from '@/Components/Input';
import { stringifyFunction } from 'helpers/stringify-function';

export const weightsConfigModalHandler = async (ctx) => {
  const { variantId } = ctx.req.param();
  const { experiment } = ctx.var;
  console.log('loading modal', variantId);

  const variants = mapVariants(experiment, variantId);

  const randomId = Math.random().toString(36).substring(2);

  const onInput = stringifyFunction((ev) => {
    console.log(ev.currentTarget.value);
  });

  const { self, original } = variants;

  const availableWeight = 10000 - experiment.variants.reduce((sum, variant) => sum + variant.weight || 0, 0);
  const floatingWeight = availableWeight / experiment.variants.length;
  console.log('availableWeight', availableWeight, 'floatingWeight', floatingWeight);

  return ctx.html(
    <div class="grid gap-3">
      <h4>Change Weights</h4>
      <form>
        <label>
          {self.id} - {self.name}: {(self.weight || floatingWeight) / 100}
          <Input name={`variant-${self.id}`} value={(self.weight || floatingWeight) / 100} step="0.01" type="range" />
        </label>
      </form>
      {variants.floating.length > 0 && <hr />}
      <div id="floating-variants">
        {variants.floating.map((variant) => (
          <label class="relative">
            {variant.id} - {variant.name}: {variant.weight || 'null'}
            <Input disabled class="h-4" step="0.01" type="range" />
            <div class="absolute"></div>
          </label>
        ))}
      </div>
      {variants.weighted.length > 0 && <hr />}
      <div id="weighted-variants">
        {variants.weighted.map((variant) => (
          <label class="relative">
            {variant.id} - {variant.name}: {variant.weight || 'null'}
            <Input disabled class="h-4" step="0.01" type="range" />
            <div class="absolute"></div>
          </label>
        ))}
      </div>
      <hr />
      <label class="relative">
        {original.id} - {original.name}: {original.weight || 'null'}
        <Input disabled class="h-4" step="0.01" type="range" />
        <div class="absolute"></div>
      </label>
    </div>,
  );
};

const mapVariants = (experiment, variantId) => {
  const variants = experiment.variants.reduce(
    (acc, variant) => {
      if (variant.id === +variantId) acc.self = variant;
      else if (variant.name === 'Original') acc.original = variant;
      else if (variant.weight === null) acc.floating.push(variant);
      else acc.weighted.push(variant);

      return acc;
    },
    { original: null, self: null, floating: [], weighted: [] },
  );

  console.log(
    'weighted',
    variants.weighted.length,
    'floating',
    variants.floating.length,
    'self',
    variants.self.id,
    'original',
    variants.original.id,
  );

  return variants;
};
