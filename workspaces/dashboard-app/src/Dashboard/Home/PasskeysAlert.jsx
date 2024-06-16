import { Alert, AlertDescription, AlertTitle } from 'shadcn/alert';
import { Link } from 'react-router-dom';
import { Button } from 'shadcn/button';

export const PasskeysAlert = ({ user }) => {
  return (
    <Alert variant="default" className="flex flex-1 gap-5">
      <AlertTitle className="mr-4 mt-1">Two Factor Authentication</AlertTitle>
      <AlertDescription>
        We are implementing two factor authentication to better secure our platform. <br />
        Please <Link to="/account#passkeys">set up your passkeys</Link> to continue.
      </AlertDescription>
      {/* <Button onClick={() => createPasskeyCredentials(user)}>Create Passkey</Button>
      <Button onClick={() => signInWithPasskey(user)}>Sign In</Button> */}
    </Alert>
  );
};
