import { Hono } from 'hono-server';
import { createChangeHandler } from './create-change';
import { deleteChangeHandler, deleteAllChangesHandler } from './delete-change';
import { updateChangeHandler } from './update-change';

export const changesRouter = new Hono();

changesRouter.post('/', createChangeHandler);
changesRouter.put('/:changeId', updateChangeHandler);
changesRouter.delete('/delete-all/:variantId', deleteAllChangesHandler);
changesRouter.delete('/:changeId', deleteChangeHandler);
