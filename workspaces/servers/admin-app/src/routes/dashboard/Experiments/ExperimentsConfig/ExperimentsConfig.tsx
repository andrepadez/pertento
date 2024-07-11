import { Hono } from 'hono';
import { weightsConfigModalHandler } from './WeightsModal';
import { LinkWithDialog } from '@/Components/LinkWithDialog';
import { LazyLoader } from '@/Components/LazyLoader';
import { Card } from '@/Components/Card';
import { VariantsConfigUI } from './Variants';
import { cn } from 'helpers/cn';

export const experimentsConfigRouter = new Hono();

experimentsConfigRouter.get('/', async (ctx) => {
  const { nextUrl } = ctx.var;
  nextUrl.pathname = `${nextUrl.pathname}/variants`;
  return ctx.render(<LazyLoader url={nextUrl} />);
});

experimentsConfigRouter.get('/variants', async (ctx) => {
  return ctx.html(
    <div>
      <VariantsConfigUI ctx={ctx} />
    </div>,
  );
});

experimentsConfigRouter.get('/variants/weights/:variantId', weightsConfigModalHandler);
