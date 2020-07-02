import imagesRequest from './services/apiService';
import refs from './refs';
import templateImage from '../templates/image-template.hbs';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css'

refs.searchForm.addEventListener('submit', handleFormSubmit);
refs.btnLoadMore.addEventListener('click', handleBtnClick);
refs.gallery.addEventListener('click', handleImgClick);

function handleFormSubmit(event) {
  event.preventDefault();
  renderImages(event);
}

function handleBtnClick() {
  imagesRequest.incrementPage();
  imagesRequest.fetchImages().then(images => {
    addItemsToHTML(images);
    const halfOfScreen = window.innerHeight / 1.5;
    window.scrollTo({
      top: window.pageYOffset + halfOfScreen,
      left: 0,
      behavior: 'smooth',
    });
  });
}

function handleImgClick(event) {
  const currentImgURL = event.target.dataset.source;
  basicLightbox.create(
    `<img src="${currentImgURL}" width="800" height="600">`,
    {
        closable: true,
    }
  ).show();

}

function renderImages() {
  refs.gallery.innerHTML = '';
  imagesRequest.userQuery = refs.searchInput.value;
  imagesRequest.resetPage();
  imagesRequest.fetchImages().then(images => {
    if (images.hits.length === 0) {
      error({
        text: 'Cannot find images. Try again!',
      });
      return;
    }
    addItemsToHTML(images);
    refs.btnLoadMore.classList.remove('hidden');
  });
}

function addItemsToHTML(items) {
  refs.gallery.insertAdjacentHTML('beforeend', templateImage(items.hits));
}
