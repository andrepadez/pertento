import { HonoServer, originMiddleware } from 'hono-server';
import { Hono, userMiddleware } from 'hono-server';
import { signinHandler } from './signin';
import { signupHandler } from './signup';
import { verifyHandler } from './verify';
import { changePasswordHandler } from './change-password';
import { forgotPasswordHandler } from './forgot-password';
import { resetPasswordHandler } from './reset-password';
import { inviteUserHandler, resendInvitationHandler } from './invite-user';
import { usersMe } from './users-me';
import { passkeyRouter } from './passkey-router';

const { AUTH_PORT: PORT } = process.env;

const app = HonoServer(PORT, 'Authentication Server');

app.use(originMiddleware);

app.use('/', (c) => {
  console.log(c.origin);
  return c.json({ pertentoAuthenticationServer: 'v0.1.0' });
});

app.get('/me', userMiddleware, usersMe);
app.post('/signin', signinHandler);
app.post('/signup', signupHandler);
app.post('/verify', verifyHandler);
app.post('/change-password', userMiddleware, changePasswordHandler);
app.post('/forgot-password', forgotPasswordHandler);
app.post('/reset-password', resetPasswordHandler);
app.post('/invite', userMiddleware, inviteUserHandler);
app.post('/resend-invite', userMiddleware, resendInvitationHandler);
app.route('/passkeys', passkeyRouter);
