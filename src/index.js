import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import getRefs from './js-partials/refs-bundle';
import NewQuery from './js-partials/server-query';
import 'simplelightbox/dist/simple-lightbox.min.css';


const lightbox = new SimpleLightbox('.gallery a');
const newSearchQuery = new NewQuery();
const refs = getRefs();

refs.form.addEventListener("submit", onSubmit);
refs.moreButton.addEventListener("submit", onGetAndRenderCards);

function onSubmit(event) {
  event.preventDefault();
  onCleanGallery();

  const inputValue = event.currentTarget.elements.searchQuery.value;
  newSearchQuery.searchQuery = inputValue;

  if (newSearchQuery.searchQuery === '') {
    Notiflix.Notify.failure('Nothing match anything. Please, fill input correctly');
    return;
  }

  newSearchQuery.resetQuery();
  onGetAndRenderCards();
}

async function onGetAndRenderCards() {
  refs.moreButton.classList.add('is-hidden');
  try {
    const response = await newSearchQuery.getPhotoPixabay();
    const checkEmptyResponse = await onEmptyResponse(response);
    const render = await renderCards(checkEmptyResponse);

    lightbox.refresh();
    refs.moreButton.classList.remove('is-hidden');

    return await render;

  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
  }
}

function renderCards(cardsArray) {
  showTotalHits(cardsArray.totalHits)

  const cardMarkup = cardsArray.hits.map(card => {
    return `
    
      <div class='photo-card'>
      <a href='${card.largeImageURL}'> <img src='${card.webformatURL}'
      alt='${card.tags}'
      loading = 'lazy'/></a>
        <div class='info'>
          <p class='info-item'>
            <b>Likes</b>
            <span> ${card.likes}</span>
          </p>
          <p class='info-item'>
            <b>Views</b>
            <span>${card.views}</span>
          </p>
          <p class='info-item'>
            <b>Comments</b>
            <span>${card.comments}</span>
          </p>
          <p class='info-item'>
            <b>Downloads</b>
            <span>${card.downloads}</span>
          </p>
      </div>
    </div>
  `
  }).join('');

  refs.gallery.insertAdjacentHTML('beforeend', cardMarkup);
}

function onEmptyResponse(array) {
  if (array.hits.length === 0) {
    Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    return
  } else {
    return array;
  }
}

function onCleanGallery() {
  refs.gallery.innerHTML = '';
}

function showTotalHits(total) {
  Notiflix.Notify.info(`Hooray!We found ${total} images.`);
}