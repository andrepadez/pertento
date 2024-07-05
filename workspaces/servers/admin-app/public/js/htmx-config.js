(function () {
  const swapModes = new WeakMap();
  const enabledButtons = new WeakMap();

  document.body.addEventListener('htmx:beforeRequest', function (ev) {
    const target = ev.detail.target;
    if (target.nodeName === 'FORM') {
      const buttons = [...target.querySelectorAll('button')].filter((button) => !button.disabled);
      enabledButtons.set(target, buttons);
      buttons.forEach((button) => (button.disabled = true));
    }
  });

  document.body.addEventListener('htmx:afterRequest', function (ev) {
    const target = ev.detail.target;
    if (target.nodeName === 'FORM') {
      const buttons = enabledButtons.get(target);
      if (buttons) {
        buttons.forEach((button) => (button.disabled = false));
      }
    }
  });

  document.body.addEventListener('htmx:beforeSwap', function (ev) {
    if (ev.detail.xhr.status >= 400) {
      swapModes.set(ev.detail.target, ev.detail.target.getAttribute('hx-swap'));
      ev.detail.target.setAttribute('hx-swap', 'beforeend');
      ev.detail.shouldSwap = true;
    }
  });

  document.body.addEventListener('htmx:afterSwap', function (ev) {
    if (ev.detail.xhr.status >= 400) {
      ev.detail.target.setAttribute('hx-swap', swapModes.get(ev.detail.target));
    }
  });
})();
