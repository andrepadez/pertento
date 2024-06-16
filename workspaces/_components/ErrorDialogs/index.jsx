import { ForbiddenDialog } from './ForbiddenDialog';
import { UnauthorizedDialog } from './UnauthorizedDialog';
import { ServerErrorDialog } from './ServerError';
import { CustomErrorDialog } from './CustomError';

export const ErrorDialogs = ({ apiError, setApiError }) => {
  if (window.location.pathname.startsWith('/auth')) return null;

  return (
    <>
      {apiError?.status === 401 && <UnauthorizedDialog apiError={apiError} setApiError={setApiError} />}
      {apiError?.status === 403 && <ForbiddenDialog apiError={apiError} setApiError={setApiError} />}
      {apiError?.status >= 500 && apiError < 511 && <ServerErrorDialog apiError={apiError} setApiError={setApiError} />}
      {apiError?.status >= 511 && <CustomErrorDialog apiError={apiError} setApiError={setApiError} />}
    </>
  );
};
