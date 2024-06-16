import { $ } from 'bun';
import { sendMail } from 'emailer';

const file = Bun.file('./testing/test-output.txt');
const stderr = await file.text();

const sendFailEmail = async (stderr) => {
  if (!stderr) return;
  sendMail({
    to: 'andre.padez@pertento.ai',
    subject: 'Some tests have failed',
    template: 'TestsFailed',
    data: { stderr },
  });
};

sendFailEmail(stderr);
