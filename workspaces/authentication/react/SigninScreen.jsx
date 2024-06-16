import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { useForm } from 'hooks/useForm';
import { useAuth } from 'hooks/useAuth';

export const SigninScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signin } = useAuth();
  const { state, formRef, update } = useForm();
  const { email, password } = state;
  const searchParams = new URLSearchParams(window.location.search);
  const from = searchParams.get('from');

  const onSubmit = async () => {
    if (isDisabled) return;
    setIsSubmitting(true);
    try {
      await signin(state);
      window.location.href = from || '/';
    } catch (ex) {
      update({ email, password: '' });
      toast('Signin has failed', {
        duration: 3000,
        description: 'Incorrect email or password. Please try again with correct credentials.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || !email || !password;

  return (
    <div className="flex flex-col gap-5 py-10">
      <div className="flex items-center justify-between">
        <h1>Sign In</h1>
        <Link to="/auth/signup">Sign Up</Link>
      </div>

      <form onSubmit={onSubmit} ref={formRef} className="mt-5 grid gap-8">
        <Label className="grid w-full min-w-[30rem] gap-3">
          <span>Email address</span>
          <Input className="w-full border-4" type="email" name="email" autoComplete="username" />
        </Label>
        <Label className="grid w-full min-w-[30rem] gap-3">
          <span>Password</span>
          <Input className="w-full border-4" type="password" name="password" autoComplete="off" />
        </Label>
        <Button disabled={isDisabled} className="w-full min-w-[30rem]">
          Sign in
        </Button>
      </form>
      <div className="flex justify-center">
        <Link to="/auth/forgot-password">Forgot password?</Link>
      </div>
    </div>
  );
};
