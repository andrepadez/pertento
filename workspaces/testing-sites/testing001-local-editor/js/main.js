(function () {
  const modalOneButton = document.querySelector('.modal-one-button');
  const modalTwoButton = document.querySelector('.modal-two-button');

  $(modalTwoButton).on('click', () => {
    const modal = $(modalTemplate('Modal Two'));
    $('body').prepend(modal);
  });
})();

const modalTemplate = (title) => {
  return `
    <div class="modal">
      <div class="modal__content">
        <div class="modal__header">
          <h2 class="modal__title">${title}</h2>
          <button class="modal__close">X</button>
        </div>
        <div class="modal__body">
          <p>Modal body text goes here.</p>
        </div>
      </div>
    </div>
  `;
};
