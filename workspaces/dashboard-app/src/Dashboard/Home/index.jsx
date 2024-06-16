import { Card, CardTitle, CardContent } from 'shadcn/card';
import { useAuth } from 'hooks/useAuth';
import { useClient } from 'hooks/useClient';
import { PasskeysAlert } from './PasskeysAlert';

export const HomeScreen = () => {
  const { user, createPasskeyCredentials, signInWithPasskey } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="mb-5">Home</h1>
      {!user.passkeys && <PasskeysAlert user={user} />}
    </div>
  );
};

function base64urlToUint8Array(base64url) {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/') + '===';
  const str = atob(base64);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}
