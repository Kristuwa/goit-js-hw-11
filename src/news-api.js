import Notiflix from 'notiflix';
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api';

export class ServiceApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchAnimals() {
 const key = '30242343-f6d10ec55d07081d5dcce6a52';
const url = `https://pixabay.com/api/?key=${key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(data => {
      this.incrementPage(); 
    return ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = data); });
  }

  incrementPage(){
this.page += 1;
  }

  resetPage(){
    this.page=1;
  }

  get query() {
    return this.searchQuery;
  }

 set query(newQuery) {
    this.searchQuery=newQuery;
  }
}
