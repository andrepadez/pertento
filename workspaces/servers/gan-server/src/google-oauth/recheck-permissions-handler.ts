import { recheckForEditPermissions } from './oauth-connections/check-for-edit-permissions';

export const recheckForEditPermissionsHandler = async (c) => {
  const { ganPropertyId } = c.req.param();
  const permissions = await recheckForEditPermissions(ganPropertyId);
  return c.json({ ok: true });
};
