import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { Card } from 'shadcn/card';
import { useAuth } from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';

export const SigninPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { signin, refreshUser } = useAuth();
  const { formState, formRef } = useForm();
  const { email, password } = formState;
  const isDisabled = !email || !password;

  const onSubmit = async () => {
    try {
      const token = await signin(formState);
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SIGN_IN',
          token: token,
        });
      }
      setTimeout(() => navigate('/'), 100);
    } catch (ex) {
      alert('Invalid credentials');
    }
  };

  return (
    <Card className="mx-auto mt-24 w-[70%] px-10 py-5">
      <form ref={formRef} onSubmit={onSubmit} className="grid gap-8">
        <h3>Signin</h3>
        <Label className="grid w-full gap-3">
          <Input
            className="w-full border-4"
            type="email"
            name="email"
            placeholder="email address"
            autoComplete="username"
          />
        </Label>
        <Label className="grid w-full gap-3">
          <Input
            className="w-full border-4"
            type="password"
            name="password"
            placeholder="password"
            autoComplete="off"
          />
        </Label>
        <Button disabled={isDisabled} className="w-full">
          Sign in
        </Button>
      </form>
    </Card>
  );
};
