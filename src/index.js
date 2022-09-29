import './css/styles.css';
// import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import axios from 'axios';

const DEBOUNCE_DELAY = 300;

const refs = {
  form: document.querySelector('.search-form'),
  button: document.querySelector('.load_more'),
};

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value;

  const key = '30242343-f6d10ec55d07081d5dcce6a52';

  const url = `https://pixabay.com/api/?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(url)
    .then(response => response.json())
    .then(console.log);
}
