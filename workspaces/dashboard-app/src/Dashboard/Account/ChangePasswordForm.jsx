import { passwordStrength } from 'check-password-strength';
import { Card } from 'shadcn/card';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { useForm } from 'hooks/useForm';
import { useAuth } from 'hooks/useAuth';
import { toast } from 'sonner';
import { cn } from 'helpers/cn';

export const ChangePasswordForm = ({ user }) => {
  const { changePassword } = useAuth();
  const { formState, formRef, reset } = useForm({});
  const { password, newPassword, confirmPassword } = formState;

  const strength = passwordStrength(newPassword);

  const isDisabled =
    !password ||
    !newPassword ||
    !confirmPassword ||
    password === newPassword ||
    newPassword !== confirmPassword ||
    strength.id < 1;

  const onSubmit = async () => {
    try {
      await changePassword(formState);
      toast('Password Changed Successfully', {
        description: 'your old passsword will not work anymore',
      });
    } catch (ex) {
      toast('Password not Changed', {
        description: 'something went wrong, please try again later',
      });
    } finally {
      reset();
    }
  };

  return (
    <Card className="flex p-5">
      <div className="flex-1">
        <h3>Change Password</h3>
      </div>
      <div className="flex-1">
        <form onSubmit={onSubmit} ref={formRef} className="flex flex-col gap-6">
          <Label className="flex flex-col gap-2">
            <span>Old Password</span>
            <Input type="password" name="password" autoComplete="current-password" />
          </Label>
          <Label className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>New Password</span>
              {password && (
                <span
                  className={cn(
                    'text-red-500',
                    strength.id === 1 && 'text-yellow-600',
                    strength.id > 1 && 'text-green-500',
                  )}
                >
                  {strength.value}
                </span>
              )}
            </div>
            <Input type="password" name="newPassword" autoComplete="new-password" />
          </Label>
          <Label className="flex flex-col gap-2">
            <span>Confirm New Password</span>
            <Input type="password" name="confirmPassword" autoComplete="new-password" />
          </Label>
          <Button disabled={isDisabled}>Change Password</Button>
        </form>
      </div>
    </Card>
  );
};
