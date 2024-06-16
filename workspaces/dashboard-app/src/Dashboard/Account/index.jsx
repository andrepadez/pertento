import { UserForm } from './UserForm';
import { ChangePasswordForm } from './ChangePasswordForm';
import { TwoFactorAuthentication } from './TwoFactorAuthentication';
import { useAuth } from 'hooks/useAuth';

export const AccountScreen = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex flex-col gap-5">
      <h1>Account</h1>
      <UserForm user={user} />
      <TwoFactorAuthentication user={user} />
      <ChangePasswordForm user={user} />
    </div>
  );
};
