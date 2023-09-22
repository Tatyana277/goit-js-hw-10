const BASE_URL = `https://api.thecatapi.com/v1`;
const apiKey =
  'live_8SPOJy6FCMzKrgiTFjoXQgCe3hD2SbxmUpZ4A9kLAD6vIJlUZH1FFXFqlU56YLEl';

const urlBreeds = BASE_URL + "/breeds";

export function fetchBreeds() {
  return fetch(urlBreeds, {
    headers: {
      'x-api-key': apiKey,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export function fetchCatByBreed(breedId) {
  const urlSearch = BASE_URL + `/images/search?breed_id=${breedId}`;
  return fetch(urlSearch, {
    headers: {
      'x-api-key': apiKey,
      breed_ids: breedId,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
  };