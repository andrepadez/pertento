import { useState, useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';

export const VerifyScreen = () => {
  const [errored, setErrored] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const { verify } = useAuth();

  const onSubmit = async (verificationCode) => {
    try {
      await verify(verificationCode);
      setVerified(true);
    } catch (ex) {
      setErrored(true);
    }
  };

  useEffect(() => {
    const url = window.location.toString();
    const verificationCode = new URL(url).searchParams.get('verificationCode');
    if (verificationCode) {
      onSubmit(verificationCode);
    } else {
      setErrored(true);
    }
  }, []);

  if (!verified && !errored) {
    return <h2>Verifying</h2>;
  }

  return errored ? (
    <div className="flex flex-col items-center gap-10">
      <h2>Verification failed</h2>
      <p>Please check your email again and if it still doesn't work, please get in touch with us</p>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-10">
      <h2>Verification successful</h2>
      <p>Someone from our team will get in contact shortly.</p>
    </div>
  );
};
