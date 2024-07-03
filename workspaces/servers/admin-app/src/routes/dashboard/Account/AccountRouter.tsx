import { Hono } from 'hono-server';
import { Card } from '@/Components/Card';
import { Button } from '@/Components/Button';
import { Input } from '@/Components/Input';
import { Label } from '@/Components/Label';
import { Avatar } from '@/Components/Avatar';
import { stringifyFunction } from 'helpers/stringify-function';

export const accountRouter = new Hono();

accountRouter.get('/', async (ctx) => {
  const { user } = ctx.var;
  const { firstName, lastName, avatar } = user;

  const handleChangeImage = stringifyFunction((ev) => {
    const avatar = ev.currentTarget.parentNode.previousSibling;
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

  return ctx.render(
    <div class="grid gap-3">
      <h1 class="">Account</h1>
      <Card class="grid grid-cols-2 p-5">
        <div class="flex-1">
          <h3>Settings</h3>
        </div>
        <div class="">
          <div class="flex flex-1 flex-col gap-5">
            <div class="flex items-center gap-5">
              <div class="relative size-16">
                <Avatar class="absolute" person={user}></Avatar>
              </div>
              <Button class="relative">
                <Input
                  class="absolute h-full w-full cursor-pointer opacity-0"
                  onChange={handleChangeImage}
                  type="file"
                />
                <span>Change</span>
              </Button>
              <Button onClick={() => setUserAvatar(null)} variant="destructive">
                Delete
              </Button>
            </div>
            <form class="flex flex-col gap-6">
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
            </form>
          </div>
        </div>
      </Card>
    </div>,
  );
});
