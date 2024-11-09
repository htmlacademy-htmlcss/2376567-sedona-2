'use strict'

const searchLink = document.querySelector('#search-link');

const modal = document.querySelector('.modal');

const resetModal = modal.querySelector('#modal-close');

const body = document.querySelector('body');

const openModalForm = (event) => {
  event.preventDefault();
  modal.classList.remove('visually-hidden');
  body.classList.add('modal-open');
  searchLink.removeEventListener('click', openModalForm);
  resetModal.addEventListener ('click', closeModalForm);
};

const closeModalForm = () => {
  modal.classList.add('visually-hidden');
  body.classList.remove('modal-open');
  resetModal.removeEventListener('click', closeModalForm);
  searchLink.addEventListener('click', openModalForm);
};

const loadModal = () => {
  searchLink.addEventListener('click', openModalForm);
};

loadModal();
