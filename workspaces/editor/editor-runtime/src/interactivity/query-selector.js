import { setElements } from './selected-elements';
import { sendMessage } from '../send-message';

export const checkCssQuery = (query) => {
  try {
    const quantity = document.querySelectorAll(query).length;
    sendMessage('PERTENTO_CSS_QUERY_CHECKED', { quantity });
  } catch (ex) {
    sendMessage('PERTENTO_CSS_QUERY_CHECKED', { quantity: 0 });
  }
};

export const selectByCssQuery = (query) => {
  const elements = Array.from(document.querySelectorAll(query));
  setElements(elements);
};
