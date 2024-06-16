import { useState } from 'react';
import { passwordStrength } from 'check-password-strength';
import { Card } from 'shadcn/card';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { Avatar } from 'components/Avatar';
import { useForm } from 'hooks/useForm';
import { toast } from 'sonner';
import { useAuth } from 'hooks/useAuth';
import { cn } from 'helpers/cn';

export const UserForm = ({ user }) => {
  const [userAvatar, setUserAvatar] = useState(user.avatar);
  const { updateUser } = useAuth();
  const { formState, formRef, reset } = useForm(user);
  const { password, newPassword, confirmPassword } = formState;

  const handleChangeImage = (event) => {
    const [newImage] = event.target.files;
    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage);
      var reader = new FileReader();
      reader.onloadend = function () {
        setUserAvatar(reader.result);
      };
      reader.readAsDataURL(newImage);
    }
  };

  const isDisabled = false;

  const onSubmit = async () => {
    try {
      const { firstName, lastName } = formState;
      const payload = { firstName, lastName, avatar: userAvatar };
      await updateUser(payload);
      toast('Your user information has changed Successfully');
    } catch (ex) {
      toast('Something went wrong', {
        description: 'Please try again later',
      });
    }
  };

  return (
    <Card className="flex p-5">
      <div className="flex-1">
        <h3>Settings</h3>
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex items-center gap-5">
          <Avatar className="w-16 h-16 rounded-full" src={userAvatar} />
          <div className="cursor-pointer">
            <Button className="relative" variant="default">
              <input
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={handleChangeImage}
                type="file"
              />
              <span>Change</span>
            </Button>
          </div>
          <Button onClick={() => setUserAvatar(null)} variant="destructive">
            Delete
          </Button>
        </div>
        <form onSubmit={onSubmit} ref={formRef} className="flex flex-col gap-6">
          <Label className="flex flex-col gap-2">
            <span>Email address</span>
            <Input disabled type="text" defaultValue={user.email} />
          </Label>
          <Label className="flex flex-col gap-2">
            <span>First Name</span>
            <Input type="text" name="firstName" />
          </Label>
          <Label className="flex flex-col gap-2">
            <span>Last Name</span>
            <Input type="text" name="lastName" />
          </Label>
          <Button disabled={isDisabled}>Save Changes</Button>
        </form>
      </div>
    </Card>
  );
};
