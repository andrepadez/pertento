import { Hono } from 'hono-server';
import { createDeviceTargetingHandler } from './create-device-targeting';
import { deleteDeviceTargetingHandler } from './delete-device-targeting';

export const deviceTargetingRouter = new Hono();

deviceTargetingRouter.post('/', createDeviceTargetingHandler);
deviceTargetingRouter.delete('/:deviceTargetingId', deleteDeviceTargetingHandler);
