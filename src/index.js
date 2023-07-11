import {fetchBreeds, fetchCatByBreed} from "./js/cat-api";

const errorText = document.querySelector(".error");
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

select.addEventListener('change', getCatData);

function getCatData(event) {
    loader.style.display = 'block';
    catInfo.innerHTML = '';

    const catId = event.target.value;
    fetchCatByBreed(catId)
        .then(data => {
        const img = data.url;
        const description = data.breeds[0].description;
        const name = data.breeds[0].name;
        const temperament = data.breeds[0].temperament;

        const catHTML = `<img src="${img}" alt="Cat Image">
                        <h2>${name}</h2>
                        <p><strong>Description:</strong> ${description}</p>
                        <p><strong>Temperament:</strong> ${temperament}</p>`;
        catInfo.innerHTML = catHTML;
        })
        .catch(() => {
        errorText.style.display = block;
        })
        .finally(() => {
        loader.style.display = 'none';
        });
}


fetchBreeds()
.then(cats => {
    cats.map(cat => {
        const option = `<option value="${cat.id}">${cat.name}</option`
        select.insertAdjacentHTML('beforeend', option);
    })
})
.catch(() => {
    errorText.style.display = block;
})
.finally(() => {
    loader.style.display = 'none';
});