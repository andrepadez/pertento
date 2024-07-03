import { cn } from 'helpers/cn';

export const Card = ({ children, ...props }) => {
  return <div class={cn('rounded-lg border-2 p-5', props.class)}>{children}</div>;
};
