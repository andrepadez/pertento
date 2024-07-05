import { Button } from '@/Components/Button';
import { Input } from '@/Components/Input';
import { Label } from '@/Components/Label';
import { Avatar } from '@/Components/Avatar';
import { stringifyFunction } from 'helpers/stringify-function';

export const AccountPasswordForm = ({ user }) => {
  return (
    <form class="flex flex-col gap-6" hx-swap="outerHTML" hx-put="/account/password">
      <div class="flex flex-1 flex-col gap-5">
        <Label class="flex flex-col gap-2">
          <span>Current Password</span>
          <Input type="password" name="oldPassword" autocomplete="current-password" />
        </Label>
        <Label class="flex flex-col gap-2">
          <span>Password</span>
          <Input type="password" name="password" autocomplete="new-password" />
        </Label>
        <Label class="flex flex-col gap-2">
          <span>Confirm Password</span>
          <Input type="password" name="confirmPassword" autocomplete="new-password" />
        </Label>
        <Button>Change Password</Button>
      </div>
    </form>
  );
};
