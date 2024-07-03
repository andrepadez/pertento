import { cn } from 'helpers/cn';

export const Button = ({ children, variant = 'default', ...props }) => {
  console.log('Button', variant, props);
  if (variant === 'destructive') return <ButtonDestructive {...props}>{children}</ButtonDestructive>;

  return (
    <button
      {...props}
      class={cn(
        'ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 relative inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )}
    >
      {children}
    </button>
  );
};

export const ButtonDestructive = ({ children, ...props }) => {
  return (
    <button
      {...props}
      class={cn(
        'ring-offset-background focus-visible:ring-ring bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        props.class,
      )}
    >
      {children}
    </button>
  );
};
