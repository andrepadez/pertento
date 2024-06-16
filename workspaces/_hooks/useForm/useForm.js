import { useState, useEffect, useRef } from 'react';
import fillForm from './_fill-form';
import fillState from './_fill-state';
import findPath from './_find-path';

export const useForm = (initialState = {}, options = {}) => {
  const [theForm, setTheForm] = useState(null);
  const [filledState, setFilledState] = useState(false);
  const [state, setState] = useState(initialState);
  const initializedRef = useRef(false);
  const stateRef = useRef(initialState);
  const observerRef = useRef();
  const formRef = useRef();

  const onReset = () => {
    stateRef.current = {};
    setState({});
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    setState(stateRef.current);
  };

  const initialize = (theForm) => {
    setTheForm(theForm);
    addEvents(theForm);
    fillState(theForm, initialState, setState, setFilledState, stateRef);
    fillForm(theForm, stateRef.current);
    initializedRef.current = true;
  };

  const destroy = (theForm) => {
    initializedRef.current = false;
    removeEventListeners(theForm);
    setState(initialState);
    stateRef.current = state;
  };

  const addEvents = (theForm) => {
    theForm.addEventListener('input', onChange);
    theForm.addEventListener('change', onChange);
    theForm.addEventListener('reset', onReset);
    theForm.addEventListener('submit', onSubmit);
  };

  const removeEventListeners = (theForm) => {
    if (!theForm) return;
    theForm.removeEventListener('input', onChange);
    theForm.removeEventListener('change', onChange);
    theForm.removeEventListener('reset', onReset);
    theForm.removeEventListener('submit', onSubmit);
  };

  useEffect(() => {
    const formElement = formRef.current;
    if (formElement && !filledState) {
      initialize(formElement);
    }
  }, [formRef, filledState]);

  // start everything
  useEffect(() => {
    const { current: formElement } = formRef;
    if (!formElement) {
      const observer = new MutationObserver((mutations) => {
        if (formRef.current && !initializedRef.current) {
          initialize(formRef.current);
        }
        if (!formRef.current && initializedRef.current) {
          destroy(formRef.current);
        }
      });
      observerRef.current = observer;

      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const update = (param) => {
    let newState;
    if (typeof param === 'function') {
      newState = param(stateRef.current);
    } else {
      newState = param;
    }
    fillForm(formRef.current, newState);
    stateRef.current = newState;
    setState(newState);
  };

  const onChange = (ev) => {
    ev.persist && ev.persist();

    const target = ev.target;
    const { name, value, dataset = {} } = target;

    if (!name) return;
    const type = dataset.type || target.type;
    const path = findPath(target, formRef.current);

    const newState = { ...stateRef.current };
    let targetObj = newState;
    for (let prop of path) {
      targetObj[prop] = targetObj[prop] || {};
      targetObj = targetObj[prop];
    }

    const isTrueFalse =
      target.type === 'radio' &&
      formRef.current[name].length === 2 &&
      Array.from(formRef.current[name]).every((el) => ['true', 'false'].includes(el.value));

    //Case for Checkbox:
    if (isTrueFalse) {
      targetObj[name] = value === 'true' ? true : value === 'false' ? false : null;
    } else if (target.type === 'checkbox') {
      const { checked } = target;
      const count = formRef.current[name].length;
      if (count > 1) {
        targetObj[name] = [...formRef.current[name]].filter((c) => c.checked).map((c) => c.value);
      } else {
        targetObj[name] = checked;
      }
    } else if (target.nodeName === 'SELECT' && target.multiple) {
      targetObj[name] = [...target.options].filter((o) => o.selected).map((o) => o.value);
    } else {
      if (['number', 'range'].includes(type)) {
        if (value === '') {
          targetObj[name] = null;
        } else {
          targetObj[name] = +value;
        }
      } else {
        targetObj[name] = value;
      }
    }

    stateRef.current = newState;
    setState(newState);
  };

  const clear = () => {
    setState(null);
    formRef.current.reset();
  };

  return { state, formState: state, formRef, update, reset: clear, clear };
};

// const triggerChange = (element) => {
//   console.log('triggering on ', element);
//   const event = new Event('change');
//   element.dispatchEvent(event);
// };
