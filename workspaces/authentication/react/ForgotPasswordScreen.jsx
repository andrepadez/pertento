import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'hooks/useForm';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { useAuth } from 'hooks/useAuth';

export const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { forgotPassword } = useAuth();
  const { state, formRef, update, reset } = useForm();
  const { email } = state;

  const isDisabled = isSubmitting || !email;

  const onSubmit = async () => {
    if (isDisabled) return;
    setIsSubmitting(true);
    try {
      await forgotPassword({ email });
      toast.success('Password reset request successful.', {
        duration: 2000,
        description: 'Please check your email for further instructions.',
        onAutoClose: () => navigate('/auth/signin'),
      });
      reset();
    } catch (ex) {
      console.log(ex);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 py-10">
      <div className="flex items-center justify-between">
        <h1>Password Reset</h1>
        <Link to="/auth/signin">Sign In</Link>
      </div>

      <form onSubmit={onSubmit} ref={formRef} className="grid gap-8 mt-5">
        <Label className="w-full min-w-[30rem] grid gap-3">
          <span>Email address</span>
          <Input className="w-full border-4" type="email" name="email" autoComplete="username" />
        </Label>

        <Button disabled={isDisabled} className="w-full min-w-[30rem]">
          Send Recovery Email
        </Button>
      </form>
    </div>
  );
};
