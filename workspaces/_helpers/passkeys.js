/*  
 FROONTEND
*/

export const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

function base64urlToUint8Array(base64url) {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/') + '===';
  const str = atob(base64);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

export const getCredentialPayload = (challenge, user) => {
  return {
    // The challenge is a buffer of cryptographically random bytes
    challenge: new Uint8Array(challenge),
    rp: {
      name: 'Pertento AI',
    },
    user: {
      id: Uint8Array.from(atob(btoa(user.id)), (c) => c.charCodeAt(0)), // Use the existing user id
      name: user.email, // Use the existing username
      displayName: `${user.firstName} ${user.lastName}`, // Use the existing user display name
    },
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7, // "ES256" IANA COSE Algorithms registry
      },
      {
        type: 'public-key',
        alg: -257, // "ES256" IANA COSE Algorithms registry
      },
    ],
  };
};

export const getSigninPayload = (challenge, credentialIds) => {
  return {
    challenge: new Uint8Array(challenge),
    allowCredentials: credentialIds.map((id) => {
      const urlSafeId = id.replace(/-/g, '+').replace(/_/g, '/');
      const decodedId = atob(urlSafeId);
      return {
        type: 'public-key',
        id: Uint8Array.from(decodedId, (c) => c.charCodeAt(0)),
      };
    }),
    userVerification: 'preferred',
  };
};

/*  
 BACKEND
*/

export const createChallenge = () => {
  const challenge = crypto.randomUUID().toString('base64');
  const hex = challenge.replace(/-/g, '');
  const array = new Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    array[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return array;
};

export const hexToString = (array) => array.map((byte) => byte.toString(16).padStart(2, '0')).join('');
