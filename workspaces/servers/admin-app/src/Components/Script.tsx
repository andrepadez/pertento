import { stringifyFunction } from 'helpers/stringify-function';

export const Script = ({ raw, js, ...props }) => {
  if (raw) {
    return <script dangerouslySetInnerHTML={{ __html: raw }}></script>;
  }

  const code = stringifyFunction(js, props);
  return <script dangerouslySetInnerHTML={{ __html: code }}></script>;
};
