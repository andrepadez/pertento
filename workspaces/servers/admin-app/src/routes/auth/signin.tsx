import { Hono } from 'hono-server';
import { setCookie } from 'hono/cookie';
import { db, eq, and, Users, Passkeys } from 'pertentodb';
import { sign } from 'jwt';
import argon2 from 'argon2';

export const authSigninRouter = new Hono();

const SigninForm = ({ email = '', errors }) => {
  return (
    <div class="mx-3 flex w-full flex-col gap-5 rounded-lg border-2 border-slate-300 p-10 lg:w-[60%]">
      <div class="flex items-center justify-between">
        <h1 className="text-2xl">Sign In</h1>
        <a className="text-blue-500 underline" href="/auth/signup">
          Sign Up
        </a>
      </div>

      <form class="mt-5 grid gap-2 lg:gap-8" method="POST">
        <label class="grid w-full gap-3">
          <span>Email address</span>
          <input
            class="w-full rounded-lg border-4 border-blue-500 px-3 py-1 outline-offset-4 outline-blue-500"
            value={email}
            type="email"
            name="email"
            placeholder="email@example.com"
            autoComplete="username"
            required
          />
        </label>
        <label class="grid w-full gap-3">
          <span>Password</span>
          <input
            class="w-full rounded-lg border-4 border-blue-500 px-3 py-1 outline-offset-4 outline-blue-500"
            type="password"
            name="password"
            autoComplete="off"
            required
          />
        </label>
        <button class="mt-5 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500">
          Signin
        </button>
      </form>
      <div class="flex justify-center">
        <a className="text-blue-500 underline" href="/auth/forgot-password">
          Forgot password?
        </a>
      </div>
    </div>
  );
};

authSigninRouter.get('/', async (ctx) => {
  return ctx.render(<SigninForm />);
});

authSigninRouter.post('/', async (ctx) => {
  const { email, password } = await ctx.req.parseBody();
  let session = ctx.get('session');

  const dbUser = await db.query.Users.findFirst({
    where: eq(Users.email, email),
    with: { company: true },
  });

  // const passkeys = await db.query.Passkeys.findMany({
  //   where: and(eq(Passkeys.email, email), eq(Passkeys.origin, ctx.origin)),
  // });

  if (!dbUser) {
    ctx.status(401);
    return ctx.render(<SigninForm email={email} />);
  }
  const { status } = dbUser;
  if (status !== 'Active') {
    ctx.status(401);
    return ctx.render(<SigninForm email={email} />);
  }
  const isValidPassword = await argon2.verify(dbUser.password, password);
  if (!isValidPassword) {
    ctx.status(401);
    return ctx.render(<SigninForm email={email} />);
  }

  const { id, companyId, parentCompanyId, avatar, firstName, lastName, role } = dbUser;
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
    avatar,
    // passkeys: passkeys.length,
  };
  const csrf = crypto.randomUUID();

  session.set('user', tokenUser);
  session.set('csrf', csrf);

  // // if (passkeys.length > 0) {
  // //   return ctx.json({ user: tokenUser });
  // // }

  return ctx.redirect('/');
});
