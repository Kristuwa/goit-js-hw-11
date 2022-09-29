import './css/styles.css';
import { ServiceApi } from './news-api';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const newServiceApi = new ServiceApi();

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.load_more'),
  galleryList: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  newServiceApi.query = e.currentTarget.elements.searchQuery.value;
newServiceApi.resetPage();
  newServiceApi.fetchAnimals();
}

function animalsMarkup(data) {
refs.galleryList.insertAdjacentHTML('beforeend', galleryItem(data));
}

function galleryItem({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
			<img src="${webformatURL}" alt="${tags}" loading="lazy" />
			<div class="info">
			  <p class="info-item">
				 <b>Likes: ${likes}</b>
			  </p>
			  <p class="info-item">
				 <b>Views: ${views}</b>
			  </p>
			  <p class="info-item">
				 <b>Comments: ${comments}</b>
			  </p>
			  <p class="info-item">
				 <b>Downloads: ${downloads}</b>
			  </p>
			</div>
		 </div>`;
}