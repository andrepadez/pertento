import { render } from '@react-email/render';
import transport from './transport';
import { templates } from './templates';

export const sendMail = ({ template, subject, to, data }) => {
  const options = {
    from: 'no-reply@pertento.ai',
    to,
    subject,
  };

  const emailHtml = render(templates[template](data));
  const result = transport.sendMail({ ...options, html: emailHtml });
};

export { templates };
