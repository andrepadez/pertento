import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { Select } from 'components/Select';
import { useForm } from 'hooks/useForm';
import { useAuth } from 'hooks/useAuth';
import { COMPANY_TYPES } from 'misc';

export const SignupScreen = () => {
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const { state, formRef, update } = useForm(initialValues);

  const onSubmit = async () => {
    if (isDisabled) return;
    setIsSubmitting(true);
    try {
      await signup(state);
      setRegistered(true);
    } catch (ex) {
      update({ email, password: '' });
      toast('Sign up has failed', {
        duration: 3000,
        description: 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { email, firstName, lastName, password, confirmPassword, companyName, companyType } = state;

  const isDisabled =
    isSubmitting || !email || !password || !companyName || !companyType || password !== confirmPassword;

  return registered ? (
    <div className="flex flex-col items-center gap-5 mt-10">
      <h3 className="">Thank you for signing up.</h3>
      <h4 className="">Please check your email to confirm your registration.</h4>
      <h5 className="">Someone from our team will contact you shortly.</h5>
      <a href="http://pertento.ai">back to our website</a>
    </div>
  ) : (
    <div className="flex flex-col gap-5 py-10">
      <div className="flex items-center justify-between">
        <h1>Sign Up</h1>
        <Link to="/auth/signin">Sign In</Link>
      </div>

      <form onSubmit={onSubmit} ref={formRef} className="grid gap-8 mt-5">
        <div className="flex justify-between gap-3">
          <Label className="grid w-full gap-3">
            <span>First Name</span>
            <Input className="w-full border-4" type="text" name="firstName" />
          </Label>
          <Label className="grid w-full gap-3">
            <span>Last Name</span>
            <Input className="w-full border-4" type="text" name="lastName" />
          </Label>
        </div>
        <Label className="w-full min-w-[30rem] grid gap-3">
          <span>Email address</span>
          <Input className="w-full border-4" type="email" name="email" autoComplete="username" />
        </Label>
        <div className="flex justify-between gap-3">
          <Label className="grid w-full gap-3">
            <span>Password</span>
            <Input className="w-full border-4" type="password" name="password" autoComplete="off" />
          </Label>
          <Label className="grid w-full gap-3">
            <span>Confirm Password</span>
            <Input className="w-full border-4" type="password" name="confirmPassword" autoComplete="off" />
          </Label>
        </div>

        <Label className="grid w-full gap-3">
          <span>Company Name</span>
          <Input className="w-full border-4" type="text" name="companyName" />
        </Label>
        <Label className="w-full min-w-[30rem] grid gap-3">
          <span>Company Type</span>
          <Select name="companyType" options={COMPANY_TYPES} value={state.companyType} update={update} />
        </Label>

        <Button disabled={isDisabled} className="w-full min-w-[30rem]">
          Sign up
        </Button>

        <Label className="w-full min-w-[30rem]">
          By registering, I consent to adhere to the{' '}
          <Link className="inline" href="https://www.pertento.ai/privacy-policy" target="_blank" variant="inherit">
            Privacy Policy
          </Link>{' '}
          and <br />
          <Link href="https://www.pertento.ai/terms-and-conditions" target="_blank" variant="inherit">
            Terms and Conditions
          </Link>
        </Label>
      </form>
    </div>
  );
};

const initialValues = {
  // email: 'chris.pratt@gmail.com',
  // firstName: 'Chris',
  // lastName: 'Pratt',
  // // password: '',
  // // passwordConfirm: '',
  // companyName: 'Crisp Rat Productions',
  // companyType: COMPANY_TYPES[0],
  // companySize: COMPANY_SIZES[0],
};
