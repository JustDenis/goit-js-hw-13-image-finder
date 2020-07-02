import imagesRequest from './services/apiService';
import refs from './refs';
import templateImage from '../templates/image-template.hbs';

refs.searchForm.addEventListener('submit', handleFormSubmit);
refs.btnLoadMore.addEventListener('click', handleBtnClick);


function handleFormSubmit(event) {
    event.preventDefault();
    renderImages(event);
}

function handleBtnClick() {
    imagesRequest.incrementPage();
    imagesRequest.fetchImages().then(images => addItemsToHTML(images));
}

function renderImages() {
    refs.gallery.innerHTML = '';
    imagesRequest.userQuery = refs.searchInput.value;
    imagesRequest.fetchImages().then(images => {
        addItemsToHTML(images);
        refs.btnLoadMore.classList.remove('hidden');
    });
}

function addItemsToHTML(items) {
    refs.gallery.insertAdjacentHTML('beforeend', templateImage(items.hits))
}