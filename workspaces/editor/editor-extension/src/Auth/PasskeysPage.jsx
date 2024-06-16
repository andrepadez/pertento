import { useNavigate } from 'react-router-dom';
import { Button } from 'shadcn/button';
import { useAuth } from 'hooks/useAuth';

export const PasskeysPage = () => {
  const navigate = useNavigate();
  const { user, isLoading, createPasskeyCredentials } = useAuth();
  if (isLoading) return null;
  if (!user) {
    navigate('/auth/signin');
    return null;
  }

  const onRegister = async () => {
    await createPasskeyCredentials(user);
    navigate('/');
  };

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-8">
      <img src="/passkeys.png" alt="passkey" className="h-20 w-20" />
      <div className="text-center text-[0.9rem]">
        <p>Pertento uses Passkeys to improve account security.</p>
        <p>Since this plugin operates independently of app.pertento.ai,</p>
        <p>you'll need to register your passkey here as well as on app.pertento.ai.</p>
      </div>
      <Button onClick={onRegister}>Register Passkey</Button>
    </div>
  );
};
