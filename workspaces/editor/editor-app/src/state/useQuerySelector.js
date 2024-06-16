import { useState, useEffect } from 'react';
import { useIframe } from '@/state/useIframe';
import { useGlobal } from 'hooks/useGlobal';

export const useQuerySelector = () => {
  const [quantity, setQuantity] = useGlobal('QUERY_SELECTOR_QUANTITY', null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { sendMessage } = useIframe();

  const onCheckCssQuery = (quantity) => {
    setQuantity(quantity);
  };

  const onChange = (ev) => {
    if (!ev.target) {
      setQuantity(null);
      setQuery(null);
      return;
    }
    setQuery(ev.target.value);
  };

  const onSelect = () => {
    sendMessage('PERTENTO_SELECT_BY_CSS_QUERY', { query });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setQuery(null);
      setQuantity(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query) {
      sendMessage('PERTENTO_CHECK_CSS_QUERY', { query });
    }
  }, [query]);

  return { query, quantity, isOpen, setIsOpen, onChange, onSelect, onCheckCssQuery };
};
