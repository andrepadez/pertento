import { useState } from 'react';
import { Button } from 'shadcn/button';
import { Card } from 'shadcn/card';
import { DataTable } from 'components/DataTable';
import { Avatar } from 'components/Avatar';
import { InviteUserForm } from './InviteUserForm';
import { RowActions } from './RowActions';
import { useForm } from 'hooks/useForm';
import { useTeams } from '@/state/useTeams';

export const OrganizationTeams = ({ user, organization }) => {
  const { formState, formRef, update } = useForm({ companyId: organization?.id || user.company.id });
  const [inviteUser, setInviteUser] = useState(false);
  const { teamMembers, inviteTeamMember, resendInvite } = useTeams(organization?.id);

  const onConfirm = async (ev) => {
    ev.preventDefault();
    await inviteTeamMember(formState);
    setInviteUser(false);
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between">
        <h2>Team Members ({organization?.friendlyName || user.company.friendlyName})</h2>
        <Button onClick={() => setInviteUser(true)}>+ Invite</Button>
      </div>
      <Card>
        {teamMembers && (
          <DataTable
            uniqueKey="email"
            data={teamMembers}
            columns={[
              {
                field: 'avatar',
                label: '',
                format: ({ item }) => <Avatar src={item.avatar} />,
              },
              {
                field: 'firstName',
                label: 'Name',
                format: ({ item }) => `${item.firstName} ${item.lastName}`,
              },
              {
                field: 'email',
                label: 'Email',
              },
              {
                field: 'role',
                label: 'Role',
              },
              {
                field: 'status',
                label: 'Status',
                format: ({ value, item }) => (
                  <div className="">
                    {value}
                    <div>
                      {item.status === 'Invited' && (
                        <a onClick={() => resendInvite(item.email)} className="text-sm">
                          resend
                        </a>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                field: 'actions',
                label: '',
                format: ({ item }) => <RowActions user={item} />,
              },
            ].filter(({ field }) => {
              if (field !== 'actions') return true;
              if (user.company.id !== organization?.id && user.role === 'Super Admin') return true;
              if (['Admin', 'Owner'].includes(user.role)) return true;
              return false;
            })}
          />
        )}
      </Card>
      {inviteUser && (
        <InviteUserForm
          user={user}
          formRef={formRef}
          formState={formState}
          update={update}
          onConfirm={onConfirm}
          onClose={() => setInviteUser(false)}
        />
      )}
    </div>
  );
};
