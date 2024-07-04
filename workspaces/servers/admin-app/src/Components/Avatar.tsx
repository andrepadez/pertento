import { cn } from 'helpers/cn';

export const Avatar = ({ person, alt, ...props }) => {
  const { avatar, firstName, lastName } = person;

  return avatar ? (
    <img class={cn('h-16 w-16 rounded-full', props.class)} src={avatar} />
  ) : (
    <div
      class={cn(
        'flex size-16 flex-col items-center justify-center rounded-full bg-slate-300 text-2xl font-bold',
        props.class,
      )}
    >
      {firstName[0] || ''}
      {lastName[0] || ''}
    </div>
  );
};
