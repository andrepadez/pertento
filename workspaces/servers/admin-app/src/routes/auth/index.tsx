import { Hono, jsxRenderer, useRequestContext, userMiddleware, originMiddleware } from 'hono-server';
import { authRenderer } from '@/Layouts/Auth';
import { authSigninRouter } from './signin';
import { authSignoutHandler } from './signout';
// import { signupHandler } from './signup';
// import { verifyHandler } from './verify';
// import { changePasswordHandler } from './change-password';
// import { forgotPasswordHandler } from './forgot-password';
// import { resetPasswordHandler } from './reset-password';
// import { inviteUserHandler, resendInvitationHandler } from './invite-user';
// import { usersMe } from './users-me';
// import { passkeyRouter } from './passkey-router';

export const authRouter = new Hono();
authRouter.use(authRenderer);
authRouter.use(originMiddleware);

authRouter.route('/signin', authSigninRouter);
authRouter.get('/signout', authSignoutHandler);

// app.get('/me', userMiddleware, usersMe);

// app.post('/signup', signupHandler);
// app.post('/verify', verifyHandler);
// app.post('/change-password', userMiddleware, changePasswordHandler);
// app.post('/forgot-password', forgotPasswordHandler);
// app.post('/reset-password', resetPasswordHandler);
// app.post('/invite', userMiddleware, inviteUserHandler);
// app.post('/resend-invite', userMiddleware, resendInvitationHandler);
// app.route('/passkeys', passkeyRouter);
