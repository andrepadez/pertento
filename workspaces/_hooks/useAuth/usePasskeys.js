import { useQueryClient } from '@tanstack/react-query';
import { arrayBufferToBase64, getCredentialPayload, getSigninPayload } from 'helpers/passkeys';
import { useClient } from 'hooks/useClient';
const { VITE_AUTH_URL } = import.meta.env;

export const usePasskeys = () => {
  const queryClient = useQueryClient();
  const authClient = useClient(VITE_AUTH_URL);

  const createPasskeyCredentials = async (user) => {
    const { challenge, userId } = await authClient.post(`/passkeys/challenge/${user.email}`);
    const publicKey = getCredentialPayload(challenge, user);
    const credentialInfo = await navigator.credentials.create({ publicKey });
    const base64Attestation = arrayBufferToBase64(credentialInfo.response.attestationObject);
    const payload = { credentialId: credentialInfo.id, publicKey: base64Attestation, challenge };
    const res = await authClient.post(`/passkeys/credentials`, payload);
    queryClient.invalidateQueries({ queryKey: ['CURRENT_USER'] });
  };

  const signinWithPasskey = async (user) => {
    const { challenge, credentialIds } = await authClient.get(`/passkeys/signin/${user.email}`);
    const publicKey = getSigninPayload(challenge, credentialIds);
    const credentialInfo = await navigator.credentials.get({ publicKey });
    const { id: credentialId } = credentialInfo;
    const url = `/passkeys/verify/${user.email}`;
    const data = await authClient.post(url, { credentialId, challenge });
    localStorage.setItem('BEARER_TOKEN', data.token);
    queryClient.invalidateQueries({ queryKey: ['CURRENT_USER'] });
    return data;
  };

  const authorizeWithPasskey = async (user) => {
    const { challenge, credentialIds } = await authClient.get(`/passkeys/signin/${user.email}`);
    const publicKey = getSigninPayload(challenge, credentialIds);
    const credentialInfo = await navigator.credentials.get({ publicKey });
    const { id: credentialId } = credentialInfo;
  };

  return { createPasskeyCredentials, signinWithPasskey, authorizeWithPasskey };
};
