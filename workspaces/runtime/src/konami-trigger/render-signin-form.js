import { renderVariantForm } from './render-variant-form';
import { createClient } from 'hooks/useClient';

const { VITE_API_URL, VITE_AUTH_URL } = import.meta.env;
const authClient = createClient(VITE_AUTH_URL);
const apiClient = createClient(VITE_API_URL);

let theModalContent = null;
let theWebsiteId = null;

export const renderSigninForm = (modalContent, websiteId) => {
  theModalContent = modalContent;
  theWebsiteId = websiteId;
  theModalContent.innerHTML = '';
  const div = document.createElement('div');
  div.id = 'pertento-form-container';
  div.innerHTML = `
  <form id="pertento-form">
    <div>
      <input type="email" autocomplete="off" name="email" placeholder="email" required />
    </div>
    <div>
      <input type="password" autocomplete="off" name="password" placeholder="Password" required />
    </div>
    <div>
      <button type="submit">Signin</button>
    </div>
    <div>
      <button type="reset">Cancel</button>
    </div>
  </form>
  <p>
    You are trying to open the Pertento editor for this page.<br />
    You have to signin using your pertento credentials.<br />
  </p>
`;

  theModalContent.appendChild(div);
  const form = div.querySelector('#pertento-form');
  form.addEventListener('submit', signin);
  form.addEventListener('reset', reset);
};

const signin = async function (ev) {
  ev.preventDefault();
  const email = this.email.value;
  const password = this.password.value;
  try {
    const res = await authClient.post('/signin', { email, password });
    const { token } = res;
    localStorage.setItem('PERTENTO_EDITOR_AUTH_TOKEN', token);
    setTimeout(async () => {
      const user = await apiClient.get('/users/me');
      renderVariantForm(theModalContent, user, theWebsiteId);
    }, 100);
  } catch (ex) {
    alert('Invalid credentials');
    this.reset();
  }
};

const reset = function () {};
