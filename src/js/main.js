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

// funciones

function renderOne(oneCharacterData) {
  charactersResultUl.innerHTML += `
    <li class="characters__list__item js__character" data-id="${oneCharacterData._id}">
        <img class="characters__list__img" src="${oneCharacterData.imageUrl}"
          alt="Imagen personaje">
        <h4 class="characters__list__name">${oneCharacterData.name}</h4>
    </li>
    `;
}

function renderAll() {
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
  charactersSelectedUl.innerHTML += `
      <li class="characters__list__item js__character" data-id="${oneFavouriteData._id}">
          <img class="characters__list__img" src="${oneFavouriteData.imageUrl}"
            alt="Imagen personaje">
          <h4 class="characters__list__name">${oneFavouriteData.name}</h4>
      </li>
      `;
}

function renderFavourites() {
  charactersSelectedUl.innerHTML = "";

  for (const eachCharacter of favouritesData) {
    renderOneFavourite(eachCharacter);
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

  renderFavourites();

  console.log(selectedCharacterObj);
}

// eventos

// código que se ejecuta al cargar

fetch("//api.disneyapi.dev/character?page=5&pageSize=50")
  .then((response) => response.json())
  .then((data) => {
    charactersData = data.data;

    renderAll();
  });
