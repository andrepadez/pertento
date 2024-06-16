import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from 'hooks/useAuth';
import { useClient } from 'hooks/useClient';

export const useTeams = (companyId) => {
  const queryClient = useQueryClient();
  const apiClient = useClient();
  const authClient = useClient(import.meta.env.VITE_AUTH_URL);
  const { user } = useAuth();

  const { data: teamMembers } = useQuery({
    queryKey: ['TEAM', companyId || user?.company.id],
    enabled: !!user,
    queryFn: async () => {
      const team = await apiClient.get(`users/team/${companyId || user?.company.id}`);
      return team;
    },
  });

  const inviteTeamMember = async (payload) => {
    await authClient.post('/invite', payload);
    queryClient.invalidateQueries({ queryKey: ['TEAM'] });
    toast('Invitation has been sent', {
      description: 'will be valid for 3 days',
    });
  };

  const resendInvite = async (email) => {
    await authClient.post('/resend-invite', { email });
    queryClient.invalidateQueries({ queryKey: ['TEAM'] });
    toast('Invitation has been resent', {
      description: 'will be valid for 3 days',
    });
  };

  const blockUser = async (id) => {
    await apiClient.put(`users/block/${id}`);
    queryClient.invalidateQueries({ queryKey: ['TEAM'] });
    toast('User has been blocked');
  };

  const unblockUser = async (id) => {
    await apiClient.put(`users/unblock/${id}`);
    queryClient.invalidateQueries({ queryKey: ['TEAM'] });
    toast('User has been unblocked');
  };

  const banUser = async (id) => {
    await apiClient.put(`users/ban/${id}`);
    queryClient.invalidateQueries({ queryKey: ['TEAM'] });
    toast('User has been banned');
  };

  const deleteUser = async (id) => {
    await apiClient.delete(`users/${id}`);
    queryClient.invalidateQueries({ queryKey: ['TEAM'] });
    toast('User has been deleted');
  };

  return { teamMembers, inviteTeamMember, resendInvite, blockUser, unblockUser, banUser, deleteUser };
};
