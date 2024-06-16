import { Avatar, AvatarFallback, AvatarImage } from 'shadcn/avatar';
import { User } from 'lucide-react';

export const UserAvatar = () => {
  return (
    <Avatar className="w-10 h-10 rounded-md">
      <AvatarImage src="https://github.com/shadcn12121.png" />
      <AvatarFallback className="rounded-md">
        <User />
      </AvatarFallback>
    </Avatar>
  );
};
