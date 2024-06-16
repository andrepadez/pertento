import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useForm } from 'hooks/useForm';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { useAuth } from 'hooks/useAuth';

export const AcceptInvitation = () => {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();
  const { state, formRef, update } = useForm();

  useEffect(() => {
    const url = window.location.toString();
    const verificationCode = new URL(url).searchParams.get('verificationCode');
    update({ ...state, verificationCode });
  }, []);

  const onSubmit = async () => {
    if (isDisabled) return;
    setIsSubmitting(true);
    try {
      const url = window.location.toString();
      const verificationCode = new URL(url).searchParams.get('verificationCode');
      await resetPassword({ password, verificationCode });
      toast('Your account is now active', {
        duration: 2000,
        description: 'You can now sign in with your new password',
        onAutoClose: () => navigate('/auth/signin'),
      });
    } catch (ex) {
      update({ password: '', confirmPassword: '' });
      toast('Sign up has failed', {
        duration: 3000,
        description: 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { password, confirmPassword } = state;

  const isDisabled = isSubmitting || !password || password !== confirmPassword;

  return (
    <div className="flex flex-col gap-5 py-10">
      <div className="flex items-center justify-between">
        <h1>Accept Invitation</h1>
        <Link to="/auth/signin">Sign In</Link>
      </div>

      <form onSubmit={onSubmit} ref={formRef} className="grid gap-8 mt-5">
        <Label className="grid w-full gap-3">
          <span>New Password</span>
          <Input className="w-full border-4" type="password" name="password" autoComplete="off" />
        </Label>
        <Label className="grid w-full gap-3">
          <span>Confirm new Password</span>
          <Input className="w-full border-4" type="password" name="confirmPassword" autoComplete="off" />
        </Label>

        <Button disabled={isDisabled} className="w-full min-w-[30rem]">
          Reset Password
        </Button>
      </form>
    </div>
  );
};
