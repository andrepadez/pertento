export const renderModal = () => {
  const modal = document.createElement('div');
  modal.id = 'pertento-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
  modal.style.zIndex = '9999';

  const modalContent = document.createElement('div');
  modalContent.style.position = 'fixed';
  modalContent.style.top = '50%';
  modalContent.style.left = '50%';
  modalContent.style.transform = 'translate(-50%, -50%)';
  // modalContent.style.width = '50%';
  // modalContent.style.height = '50%';
  modalContent.style.backgroundColor = 'white';
  modalContent.style.padding = '2rem 5rem';
  modalContent.style.zIndex = '9999';

  // const modalTitle = document.createElement('h1');
  // modalTitle.innerText = 'Pertento Editor';
  // modalTitle.style.textAlign = 'center';

  const modalTitle = document.createElement('img');
  modalTitle.src = 'https://app.pertento.ai/pertento_light.png';
  modalTitle.style.textAlign = 'center';
  modalTitle.style.height = '100px';
  modalTitle.style.display = 'block';
  modalTitle.style.margin = '0 auto';

  const modalBody = document.createElement('div');
  modalBody.style.height = '100%';
  modalBody.style.overflow = 'auto';

  const modalBodyContent = document.createElement('div');
  modalBodyContent.style.height = '100%';
  modalBodyContent.style.overflow = 'auto';

  modalBody.appendChild(modalBodyContent);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const style = document.createElement('style');
  style.innerHTML = styles;
  document.head.appendChild(style);

  return { modal, modalBody, modalContent, modalTitle, modalBodyContent };
};

const styles = `
#pertento-form-container p {
  margin: 20px auto;
  text-align: center;
}

#pertento-form {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#pertento-form div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
}

#pertento-form input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#pertento-form button {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}`;
