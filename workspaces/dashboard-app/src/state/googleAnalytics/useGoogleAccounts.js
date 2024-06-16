import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGoogleLogin } from '@react-oauth/google';
import { useClient } from 'hooks/useClient';
import { toast } from 'sonner';
const { VITE_GAN_URL } = import.meta.env;

export const useGoogleAccounts = () => {
  const ganClient = useClient(VITE_GAN_URL);
  const queryClient = useQueryClient();

  const { data: googleAccounts } = useQuery({
    queryKey: ['GOOGLE_OAUTH_ACCOUNTS'],
    retry: false,
    queryFn: async () => {
      return ganClient.get('/google-oauth');
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['GAN_PROPERTIES'] });
    },
  });

  const onConnect = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const res = await ganClient.post('/google-oauth/connect', codeResponse);
      queryClient.invalidateQueries({ queryKey: ['GOOGLE_OAUTH_ACCOUNTS'] });
    },
    flow: 'auth-code',
    accessType: 'offline',
    scope: [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/analytics.edit',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  });

  const refresh = async (email) => {
    const res = await ganClient.post(`/google-oauth/refresh`, { email });

    toast('Your request is being processed', {
      duration: 5000,
      description: 'You will receive an email when the process is complete',
    });
  };

  const disconnect = async (email) => {
    const deleted = await apiClient.delete(`/google-accounts/${email}`);
    signOut({ redirect: false });
    queryClient.invalidateQueries({ queryKey: ['GOOGLE_ACCOUNTS'] });
    queryClient.invalidateQueries({ queryKey: ['ORGANIZATIONS'] });
  };

  return { googleAccounts, onConnect, disconnect, refresh };

  return {};
};

/*
  - Using NextAuth to connect / disconnect to google
  - Main App is not using Next Auth, so things are separate
  - googleAccount from useQuery is gotten from our database
  - if empty we allow the user to "signIn" to google
  
  - when signIn is fired, [...nextauth] signIn callback saves results to our DB
  - when we get back from the callback, the useEffect is fired so
    - we can grab the currentUser id from the jwt session
    - and update the userId on our database (randomUUID created in [...nextauth])
    - we immediately signOut the user from google because
      - we already saved the necessary data in the db

  - on "disconnect" we
    - call the API to delete the relation user > googleAccount
    - call signOut, even though the user is already signed out, just to make sure
    - invalidateQuery to request the empty relationship from the api / db
*/
