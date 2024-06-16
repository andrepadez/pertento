import { renderModal } from './render-modal';
import { renderSigninForm } from './render-signin-form';
import { renderVariantForm } from './render-variant-form';
import { createClient } from 'hooks/useClient';
const { VITE_API_URL } = import.meta.env;

let theWebsiteId = null;

export const setupKonamiCode = (websiteId) => {
  theWebsiteId = websiteId;
  window.addEventListener('keydown', onKeydown);
};

const konamiCode = [51, 80, 69, 82, 84, 69, 78, 84, 79]; // PERTENTO
// const konamiCode = [80]; // P
// const konamiCode = [69, 68, 73, 84, 79, 82];// EDITOR
let userInput = [];

const onKeydown = async (ev) => {
  if (['input', 'textarea'].includes(ev.target.tagName.toLowerCase())) {
    return;
  }
  userInput.push(ev.keyCode);
  userInput = userInput.slice(-konamiCode.length); // keep only the last N entries

  if (userInput.join('') === konamiCode.join('')) {
    const apiClient = createClient();
    const { modal, modalBodyContent } = renderModal();
    window.removeEventListener('keydown', onKeydown);
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') onClose(modal);
    });
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) onClose(modal);
      if (ev.target.type === 'reset') onClose(modal);
    });
    try {
      const user = await apiClient.get(`/users/me`);
      renderVariantForm(modalBodyContent, user, theWebsiteId);
    } catch (ex) {
      localStorage.removeItem('PERTENTO_EDITOR_AUTH_TOKEN');
      renderSigninForm(modalBodyContent, theWebsiteId);
    }
  }
};

const onClose = (modal) => {
  if (!modal) return;
  modal.remove();
  window.addEventListener('keydown', onKeydown);
};
