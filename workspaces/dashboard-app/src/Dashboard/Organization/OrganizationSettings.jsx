import { useRef } from 'react';
import { Card } from 'shadcn/card';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { Button } from 'shadcn/button';
import { Select } from 'components/Select';
import { useForm } from 'hooks/useForm';
import { COMPANY_SIZES } from 'misc';
import { useOrganizations } from '@/state/useOrganizations';

export const OrganizationSettings = ({ user }) => {
  const { company } = user;
  const { formState, formRef, update } = useForm({
    friendlyName: company.friendlyName,
    size: company.size,
  });
  const { friendlyName, size } = formState;
  const { updateOrganization } = useOrganizations();

  const isDisabled =
    !friendlyName || !size || (friendlyName === friendlyName.name && size === company.size);

  const onSubmit = async () => {
    if (isDisabled) return;
    await updateOrganization(company.id, formState);
  };

  return (
    <Card className="p-5">
      <div className="flex">
        <div className="flex-1">
          <h3>Settings</h3>
        </div>
        <div className="flex-1">
          <form onSubmit={onSubmit} ref={formRef} className="flex flex-col gap-6">
            <Label className="flex flex-col gap-2">
              <span>First Name</span>
              <Input name="friendlyName" />
            </Label>
            <Label className="flex flex-col gap-2">
              <span>Last Name</span>
              <Select name="size" options={COMPANY_SIZES} value={formState.size} update={update} />
            </Label>
            <Button disabled={isDisabled}>Save Settings</Button>
          </form>
        </div>
      </div>
    </Card>
  );
};
