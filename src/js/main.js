"use strict";

console.log(">> Ready :)");

// query selectors

const charactersResultUl = document.querySelector(".js__charactersResultUl");

const charactersSelectedUl = document.querySelector(
  ".js__charactersSelectedUl"
);

const formInputElement = document.querySelector(".js__form__input");

const form = document.querySelector(".js__form");

// variables de datos

let charactersData = [];

let favouritesData = [];

const placeholder =
  "https://via.placeholder.com/300x200/ffc0cb/ffffff/?text=Disney";

const favouritesDatafromLS = JSON.parse(localStorage.getItem("favouritesData"));

// funciones

function renderOne(oneCharacterData) {
  const characterIndex = favouritesData.findIndex(
    (oneFavourite) => oneFavourite._id === oneCharacterData._id
  );

  console.log(characterIndex);

  if (characterIndex === -1) {
    if (oneCharacterData.imageUrl === undefined) {
      charactersResultUl.innerHTML += `
    <li class="characters__list__item js__character" data-id="${oneCharacterData._id}">
        <img class="characters__list__img" src=${placeholder}
          alt="Imagen personaje">
        <h4 class="characters__list__name">${oneCharacterData.name}</h4>
    </li>
    `;
    } else {
      charactersResultUl.innerHTML += `
        <li class="characters__list__item js__character" data-id="${oneCharacterData._id}">
            <img class="characters__list__img" src="${oneCharacterData.imageUrl}"
              alt="Imagen personaje">
            <h4 class="characters__list__name">${oneCharacterData.name}</h4>
        </li>
        `;
    }
  } else {
    if (oneCharacterData.imageUrl === undefined) {
      charactersResultUl.innerHTML += `
      <li class="characters__list__item selected js__character" data-id="${oneCharacterData._id}">
          <img class="characters__list__img" src=${placeholder}
            alt="Imagen personaje">
          <h4 class="characters__list__name">${oneCharacterData.name}</h4>
      </li>
      `;
    } else {
      charactersResultUl.innerHTML += `
          <li class="characters__list__item selected js__character" data-id="${oneCharacterData._id}">
              <img class="characters__list__img" src="${oneCharacterData.imageUrl}"
                alt="Imagen personaje">
              <h4 class="characters__list__name">${oneCharacterData.name}</h4>
          </li>
          `;
    }
  }
}

function renderAll() {
  charactersResultUl.innerHTML = "";
  for (const eachCharacter of charactersData) {
    renderOne(eachCharacter);
  }

  const allCharacters = document.querySelectorAll(".js__character");
  console.log(allCharacters);

  for (const eachCharacter of allCharacters) {
    eachCharacter.addEventListener("click", handleClickCharacters);
  }
}

function renderOneFavourite(oneFavouriteData) {
  if (oneFavouriteData.imageUrl === undefined) {
    charactersSelectedUl.innerHTML += `
        <li class="characters__list__item js__character">
            <img class="characters__list__img" src=${placeholder}
              alt="Imagen personaje">
            <h4 class="characters__list__name">${oneFavouriteData.name}</h4>
        </li>
        `;
  } else {
    charactersSelectedUl.innerHTML += `
            <li class="characters__list__item js__character">
                <img class="characters__list__img" src="${oneFavouriteData.imageUrl}"
                  alt="Imagen personaje">
                <h4 class="characters__list__name">${oneFavouriteData.name}</h4>
            </li>
            `;
  }
}

function renderFavourites() {
  charactersSelectedUl.innerHTML = "";

  for (const eachCharacter of favouritesData) {
    renderOneFavourite(eachCharacter);
  }
}

function renderFavouritesFromLS() {
  if (favouritesDatafromLS === null) {
    renderFavourites();
  } else {
    favouritesData = favouritesDatafromLS;
    renderFavourites();
  }
}

// funciones de eventos (handlers)

function handleClickCharacters(event) {
  console.log("click");

  const clickedCharacter = event.currentTarget;

  clickedCharacter.classList.toggle("selected");

  const clickedCharacterId = clickedCharacter.dataset.id;

  const selectedCharacterObj = charactersData.find(
    (oneCharater) => oneCharater._id === parseInt(clickedCharacterId)
  );

  const selectedCharacterIndex = favouritesData.findIndex(
    (oneFavourite) => oneFavourite._id === parseInt(clickedCharacterId)
  );

  if (selectedCharacterIndex === -1) {
    favouritesData.push(selectedCharacterObj);
  } else {
    favouritesData.splice(selectedCharacterIndex, 1);
  }

  localStorage.setItem("favouritesData", JSON.stringify(favouritesData));

  renderFavourites();
}

function handleSubmitForm(event) {
  event.preventDefault();

  console.log(formInputElement.value);

  fetch(
    `//api.disneyapi.dev/character?pageSize=50&name=${formInputElement.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      charactersData = data.data;

      renderAll();
    });
}

// eventos

form.addEventListener("submit", handleSubmitForm);

// código que se ejecuta al cargar

fetch("//api.disneyapi.dev/character?pageSize=50")
  .then((response) => response.json())
  .then((data) => {
    charactersData = data.data;

    renderFavouritesFromLS();

    renderAll();
  });
