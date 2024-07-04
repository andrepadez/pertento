import { stringifyFunction } from 'helpers/stringify-function';

export const Form = ({ ...props }) => {
  const onSubmit = stringifyFunction((ev) => {
    const buttons = ev.target.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = true;
    });
  });

  return (
    <form {...props} onSubmit={onSubmit}>
      {props.children}
    </form>
  );
};
