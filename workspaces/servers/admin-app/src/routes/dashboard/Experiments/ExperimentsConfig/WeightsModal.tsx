import { Dialog } from '@/Components/Dialog';
import { Input } from '@/Components/Input';
import { stringifyFunction } from 'helpers/stringify-function';

export const weightsConfigModalHandler = async (ctx) => {
  const { experiment } = ctx.var;
  console.log('loading modal');

  const randomId = Math.random().toString(36).substring(2);

  const onInput = stringifyFunction((ev) => {
    console.log(ev.currentTarget.value);
  });

  return ctx.html(
    <div>
      <label>{randomId}</label>
      {experiment.variants.map((variant) => (
        <form>
          {variant.id} - {variant.name}: {variant.weight || 'null'}
          <span>&nbsp;Test</span>
          <Input step="0.01" onInput={onInput} type="range" />
        </form>
      ))}
    </div>,
  );
};
