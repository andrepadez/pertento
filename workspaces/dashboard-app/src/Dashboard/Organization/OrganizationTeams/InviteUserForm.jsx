import { Select } from 'components/Select';
import { ConfirmDialog } from 'components/Dialogs';
import { Input } from 'shadcn/input';
import { Label } from 'shadcn/label';
import { RadioGroup, RadioGroupItem } from 'shadcn/radio-group';
import { useOrganizations } from '@/state/useOrganizations';
import { USER_ROLES } from 'misc';

export const InviteUserForm = ({ user, formRef, formState, update, onConfirm, onClose }) => {
  const { options: companies } = useOrganizations();

  if (!companies) return null;
  const companyOptions = [{ label: user.company.name, value: user.company.id }, ...companies];

  const { firstName, email, lastName, companyId, role } = formState;
  const isReady = firstName && email && lastName && companyId && role;

  return (
    <ConfirmDialog
      open={true}
      title="Invite User"
      disabled={!isReady}
      onConfirm={onConfirm}
      onClose={onClose}
    >
      <form ref={formRef} onSubmit={onConfirm} className="flex flex-col gap-6">
        {user.company.type === 'Agency' && (
          <Label className="flex flex-col gap-2">
            <span>Company</span>
            <Select
              update={update}
              value={formState.companyId}
              name="companyId"
              options={companyOptions}
            />
          </Label>
        )}
        <Label className="flex flex-col gap-2">
          <span>First Name</span>
          <Input name="firstName" />
        </Label>
        <Label className="flex flex-col gap-2">
          <span>Last Name</span>
          <Input name="lastName" />
        </Label>
        <Label className="flex flex-col gap-2">
          <span>Email Address</span>
          <Input type="email" name="email" />
        </Label>
        <Label className="flex flex-col gap-2">
          <span>User Role</span>
          <RadioGroup onValueChange={(val) => update((curr) => ({ ...curr, role: val }))}>
            {USER_ROLES.slice(0, 2).map((role) => (
              <Label
                key={role}
                className="flex items-center p-2 py-3 space-x-2 border-2 border-secondary"
              >
                <RadioGroupItem value={role} name="role" />
                <span>{role}</span>
              </Label>
            ))}
          </RadioGroup>
        </Label>
      </form>
    </ConfirmDialog>
  );
};

// const onChange = (ev) => {
//   const { name, value } = ev.target;
//   const theValue = isNaN(value) ? value : +value;
//   setNewUser((user) => ({ ...user, [name]: theValue }));
// };
