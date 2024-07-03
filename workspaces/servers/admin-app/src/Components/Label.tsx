import { cn } from 'helpers/cn';

export const Label = ({ children, ...props }) => {
  return (
    <label
      {...props}
      class={cn(
        'flex flex-col gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class,
      )}
    >
      {children}
    </label>
  );
};
