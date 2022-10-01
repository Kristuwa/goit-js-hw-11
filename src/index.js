import './css/styles.css';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ServiceApi } from './news-api';
import Notiflix from 'notiflix';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const newServiceApi = new ServiceApi();

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.load-more'),
  galleryList: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMoreImg);

function onSearch(e) {
  e.preventDefault();
  clearGallery();
  refs.button.classList.add('is-hidden');

  newServiceApi.query = e.currentTarget.elements.searchQuery.value;

  newServiceApi.resetPage();

  if (newServiceApi.query === '') {
    return Notiflix.Notify.failure('Please enter valid name.');
  }

  newServiceApi.resetPage();

  newServiceApi
    .fetchAnimals()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        const maxPage = totalHits / hits.length;
        const currentPage = newServiceApi.page - 1;
        if (maxPage <= currentPage) {
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
          return animalsMarkup(hits);
        }
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        refs.button.classList.remove('is-hidden');

        return animalsMarkup(hits);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.button.disabled = false;
    });
}

function onLoadMoreImg() {
  refs.button.disabled = true;

  newServiceApi
    .fetchAnimals()
    .then(({ hits, totalHits }) => {
      const currentPage = newServiceApi.page - 1;
      console.log(currentPage);
      const endPage = totalHits / (40 * (currentPage - 1) + hits.length);

      console.log(endPage);
      if (endPage <= 1) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        refs.button.classList.add('is-hidden');
      }
      return animalsMarkup(hits);
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.button.disabled = false;
    });
}

function animalsMarkup(data) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryItem(data));
  lightbox.refresh();
}

function galleryItem(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery-item" href="${largeImageURL}">
		 <div class="photo-card">
		  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="320" height="214"/>
		  <div class="info"><p class="info-item">
		  <b>Likes:</b> ${likes}
		</p>
		<p class="info-item">
		  <b>Views:</b> ${views}
		</p>
		<p class="info-item">
		  <b>Comments:</b> ${comments}
		</p>
		<p class="info-item">
		  <b>Downloads:</b> ${downloads}
		</p>
	 </div></div></a>`;
      }
    )
    .join('');
  return markup;
}

function clearGallery() {
  refs.galleryList.innerHTML = '';
}
