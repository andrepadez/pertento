import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from 'shadcn/avatar';
import { User } from 'lucide-react';
import { cn } from 'helpers/cn';

export const Avatar = ({ src, className, ...props }) => {
  return (
    <ShadAvatar {...props} className={cn('w-10 h-10 rounded-md', className)}>
      <AvatarImage src={src} />
      <AvatarFallback className="rounded-md">
        <User />
      </AvatarFallback>
    </ShadAvatar>
  );
};
