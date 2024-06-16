const { VITE_AUTH_URL: AUTH_URL } = process.env;

export const mockUser = {
  email: 'test.user@pertento.ai',
  password: 'some-long-ass-password',
  firstName: 'John',
  lastName: 'Wick Mock',
  companyName: 'Wick Industries',
  companyType: 'Agency',
};

export const createUser = async (user) => {
  const res = await fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({ ...user, testing: true }),
  });

  return res.json();
};

export const signin = async ({ email, password }) => {
  const response = await fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      testing: true,
    }),
  });
  if (response.status !== 200) return response;
  return response.json();
};
