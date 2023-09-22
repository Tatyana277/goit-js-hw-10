import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const searchForm = document.querySelector('.breed-select');
const showInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
let numberBreeds = [];
searchForm.addEventListener('input', onSearch);

fetchBreeds()
  .then(data => {
    loader.hidden = true;
    searchForm.hidden = false;
    numberBreeds = data;

    for (let i = 0; i < numberBreeds.length; i += 1) {
      const breed = numberBreeds[i];
      let option = document.createElement('option');

      option.value = i;
      option.innerHTML = `${breed.name}`;
      searchForm.appendChild(option);
    }
    searchForm.classList.remove('is-hidden');
  })
  .catch(function (error) {
    loader.hidden = true;
    console.error(error);
    Notiflix.Notify.warning(
      'Oops! Something went wrong! Try reloading the page!'
    );
    clearHTML();
    errorEl.classList.remove('is-hidden');
    return;
  });

function onSearch(evt) {
  const breedId = evt.currentTarget.value;
  loader.hidden = false;
  clearHTML();

  fetchCatByBreed(breedId)
    .then(() => {
      loader.hidden = true;
      
      const catCard = `<img src="${numberBreeds[breedId].image.url}" width="500 px" alt="cat image"><div class="cat-info-desc"><h2>${numberBreeds[breedId].name}</h2><p>Description: ${numberBreeds[breedId].description}</p><p>Temperament: ${numberBreeds[breedId].temperament}</p></div>`;

      showInfo.innerHTML = catCard;
      showInfo.style.display = 'flex';
      showInfo.style.marginTop = '20px';
      showInfo.style.fontSize = '20px';
    })
    .catch(function (error) {
      console.error(error);
      Notiflix.Notify.warning(
        'Oops! Something went wrong! Try reloading the page!'
      );

      searchForm.hidden = true;
      errorEl.classList.remove('is-hidden');
      clearHTML();
      return;
    });
}

function clearHTML() {
  showInfo.innerHTML = '';
}
