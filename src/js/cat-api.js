import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
    'live_wAakFgBm0LbxNIQQWKgRxnJG7C3rNGitOOIangUaXut2L8huVOdvcJdJJhhFvaMg';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds'; 
const CAT_DATA_URL = "https://api.thecatapi.com/v1/images/search";

export default function fetchBreeds() {
    return axios(BASE_URL).then(response => {
    if (response.status !== 200) {
        throw new Error(response.status);
    }
    return response.data;
    });
}

function fetchCatByBreed(breedId) {
    return axios(`${CAT_DATA_URL}?breed_ids=${breedId}`)
    .then(response => {
    if (response.status !== 200) {
        throw new Error(response.status);
    }
    return response.data[0];
        }) 
}

export {fetchBreeds, fetchCatByBreed};
