import { Hono } from 'hono-server';
import { setCookie } from 'hono/cookie';
import { db, eq, and, Users, Passkeys } from 'pertentodb';
import { sign } from 'jwt';
import argon2 from 'argon2';

export const authSigninRouter = new Hono();

const SigninForm = ({ email = '', errors }) => {
  return (
    <div class="flex flex-col gap-5 py-10">
      <div class="flex items-center justify-between">
        <h1>Sign In</h1>
        <a href="/auth/signup">Sign Up</a>
      </div>

      <form class="mt-5 grid gap-8" method="post" action="/auth/signin">
        <label class="grid w-full min-w-[30rem] gap-3">
          <span>Email address</span>
          <input class="w-full border-4" value={email} type="email" name="email" autoComplete="username" />
        </label>
        <label class="grid w-full min-w-[30rem] gap-3">
          <span>Password</span>
          <input class="w-full border-4" type="password" name="password" autoComplete="off" />
        </label>
        <button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500">
          Signin
        </button>
      </form>
      <div class="flex justify-center">
        <a href="/auth/forgot-password">Forgot password?</a>
      </div>
    </div>
  );
};

authSigninRouter.get('/', async (c) => {
  return c.render(<SigninForm />);
});

authSigninRouter.post('/', async (c) => {
  const { email, password } = c.req.body;
  const dbUser = await db.query.Users.findFirst({
    where: eq(Users.email, email),
    with: { company: true },
  });

  const passkeys = await db.query.Passkeys.findMany({
    where: and(eq(Passkeys.email, email), eq(Passkeys.origin, c.origin)),
  });

  if (!dbUser) {
    c.status(401);
    return c.render(<SigninForm email={email} />);
  }
  const { status } = dbUser;
  if (status !== 'Active') {
    c.status(401);
    return c.render(<SigninForm email={email} />);
  }
  const isValidPassword = await argon2.verify(dbUser.password, password);
  if (!isValidPassword) {
    c.status(401);
    return c.render(<SigninForm email={email} />);
  }

  const { id, companyId, parentCompanyId, firstName, lastName, role } = dbUser;
  const { name: company } = dbUser.company;

  const tokenUser = {
    id,
    email,
    firstName,
    lastName,
    company,
    companyId,
    parentCompanyId,
    role,
    passkeys: passkeys.length,
  };

  if (passkeys.length > 0) {
    return c.json({ user: tokenUser });
  }

  const token = await sign(tokenUser);

  setCookie(c, 'bearer_token', token);

  return c.redirect('/');
});
