import { Button } from '@/Components/Button';
import { Input } from '@/Components/Input';
import { Label } from '@/Components/Label';
import { Avatar } from '@/Components/Avatar';
import { stringifyFunction } from 'helpers/stringify-function';

export const AccountInfoForm = ({ user }) => {
  const { firstName, lastName, avatar } = user;

  const handleChangeImage = stringifyFunction((ev) => {
    const fileInput = ev.currentTarget;
    const avatar = fileInput.parentNode.previousSibling;
    const [newImage] = ev.target.files;
    if (newImage) {
      const imageUrl = window.URL.createObjectURL(newImage);
      var reader = new window.FileReader();
      reader.onloadend = function () {
        const image = document.createElement('img');
        image.src = reader.result;
        image.className = 'w-16 h-16 rounded-full';
        avatar.innerHTML = '';
        avatar.appendChild(image);
      };
      reader.readAsDataURL(newImage);
    }
  });

  return (
    <form class="flex flex-col gap-6" hx-swap="outerHTML" hx-encoding="multipart/form-data" hx-put="/account">
      <div class="flex flex-1 flex-col gap-5">
        <div class="flex items-center gap-5">
          <div class="relative size-16">
            <Avatar class="absolute" person={user} />
          </div>
          <Button type="button" class="relative">
            <Input
              class="absolute h-full w-full cursor-pointer opacity-0"
              name="avatar"
              onChange={handleChangeImage}
              type="file"
            />
            <span>Change</span>
          </Button>
          <Button type="button" onClick={() => setUserAvatar(null)} variant="destructive">
            Delete
          </Button>
        </div>

        <Label class="flex flex-col gap-2">
          <span>Email address</span>
          <Input disabled type="text" value={user.email} />
        </Label>
        <Label class="flex flex-col gap-2">
          <span>First Name</span>
          <Input type="text" name="firstName" value={user.firstName} />
        </Label>
        <Label class="flex flex-col gap-2">
          <span>Last Name</span>
          <Input type="text" name="lastName" value={user.lastName} />
        </Label>
        <Button>Save Changes</Button>
      </div>
    </form>
  );
};
