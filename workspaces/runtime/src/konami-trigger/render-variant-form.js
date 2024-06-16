import { renderSigninForm } from './render-signin-form';
import { prepareForEditor } from '../old-editor-stuff';
import { createClient } from 'hooks/useClient';
import { log } from 'helpers/injector/console';

const { VITE_API_URL } = import.meta.env;
const client = createClient();

let theModalContent = null;
let theWebsiteId = null;

export const renderVariantForm = async (modalContent, user, websiteId) => {
  theWebsiteId = websiteId;
  const experimentsData = await client.get(`/websites/${theWebsiteId}/experiments`);

  theModalContent = modalContent;
  theModalContent.innerHTML = '';
  const div = document.createElement('div');
  div.id = 'pertento-form-container';
  div.innerHTML = `
  <form id="pertento-form">
    ${experimentsData
      .map(
        (exp) =>
          `
          <div>
            <strong>${exp.name}</strong>
            ${exp.variants
              .map((v) =>
                v.name !== 'Original'
                  ? `<label><input required type="radio" value="${v.id}" name="variantId" />&nbsp;${v.name}</label>`
                  : '',
              )
              .join('')}
          </div>
      `,
      )
      .join('')}
      <div>
      <button type="submit">Open Editor</button>
    </div>
    <div>
      <button type="reset">Cancel</button>
    </div>
  </form>
  <p>
    You are currently signed in to Pertento as ${user.email}.<br />
    Please select the Experiment and Variant you want to work on<br />
    Or <a href="#" id="pertento-signout">sign in as a different user</a>
  </p>
`;

  theModalContent.appendChild(div);
  const form = div.querySelector('#pertento-form');
  form.addEventListener('submit', openEditor);
  form.addEventListener('reset', reset);
  div.querySelector('a').addEventListener('click', signout);
};

const openEditor = async function (ev) {
  ev.preventDefault();
  const variantId = this.variantId.value;
  localStorage.setItem('PERTENTO_EDITOR_VARIANT_ID', variantId);
  prepareForEditor(variantId);
};

const signout = function (ev) {
  ev.preventDefault();
  localStorage.removeItem('PERTENTO_EDITOR_AUTH_TOKEN');
  renderSigninForm(theModalContent, theWebsiteId);
};

const reset = function () {};
