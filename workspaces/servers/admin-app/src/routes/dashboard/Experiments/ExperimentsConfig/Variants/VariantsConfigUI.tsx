import { LinkWithDialog } from '@/Components/LinkWithDialog';
import { Card } from '@/Components/Card';
import { cn } from 'helpers/cn';

export const VariantsConfigUI = ({ ctx }) => {
  const { experiment, nextUrl } = ctx.var;
  const floatingWeight = 10000 / experiment.variants.length;
  const originalWeight = experiment.variants.find((variant) => variant.name === 'Original')?.weight || floatingWeight;
  return (
    <Card class="grid gap-3">
      <h2>Variants</h2>
      <ul class="flex flex-col gap-5">
        {experiment.variants.map((variant) => {
          const url = new URL(nextUrl);
          url.pathname = `${url.pathname}/weights/${variant.id}`;
          const isOriginal = variant.name === 'Original';
          const weight = (isOriginal ? originalWeight : variant.weight || floatingWeight) / 100;
          let changesCount = variant.changes.length;
          const { globalCSS, globalJavascript } = variant;
          if (globalCSS) changesCount++;
          if (globalJavascript) changesCount++;
          return (
            <li>
              <div className="flex-1">
                <a className={cn('block text-secondary-foreground', !isOriginal && 'cursor-pointer hover:underline')}>
                  <strong>
                    {variant.name} ({variant.id})
                  </strong>
                </a>
                {isOriginal ? (
                  <p>{weight.toFixed(2)}%</p>
                ) : (
                  <LinkWithDialog action={`${weight.toFixed(2)}%`}>
                    <div hx-get={url.toString()} hx-trigger="intersect" class="min-w-96"></div>
                  </LinkWithDialog>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
