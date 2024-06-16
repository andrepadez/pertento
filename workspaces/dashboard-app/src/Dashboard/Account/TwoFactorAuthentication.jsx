import { Card } from 'shadcn/card';
import { Button } from 'shadcn/button';
import { useAuth } from 'hooks/useAuth';
import { toast } from 'sonner';

export const TwoFactorAuthentication = () => {
  const { changePassword } = useAuth();
  const { user, createPasskeyCredentials, signinWithPasskey } = useAuth();

  const registerPasskey = async () => {
    await createPasskeyCredentials(user);
    toast('Passkey registered successfully', {
      description: 'you can now start using two factor aurthentication',
    });
  };

  const testPasskey = async () => {
    const data = await signinWithPasskey(user);
    toast('Your passkey is working correctly', {
      description: `returned user email: ${data.user.email}`,
    });
  };

  return (
    <Card className="flex p-5">
      <div className="flex-1">
        <h3 id="passkeys">Two Factor Authentication</h3>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <h5>Passkeys</h5>
        <p>
          <strong>Passkeys are a secure way to authenticate your account.</strong>
        </p>
        <p>
          {user.passkeys
            ? `you currently have ${user.passkeys} passkey registered`
            : 'there are no passkeys registered for your account'}
        </p>
        <Button onClick={registerPasskey}>Register a Passkey</Button>
        {user.passkeys > 0 && <Button onClick={testPasskey}>Test Passkey Authentication</Button>}
      </div>
    </Card>
  );
};
