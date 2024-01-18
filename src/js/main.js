"use strict";

console.log(">> Ready :)");

// query selectors

const charactersResultUl = document.querySelector(".js__charactersResultUl");

const charactersSelectedUl = document.querySelector(
  ".js__charactersSelectedUl"
);

const formInputElement = document.querySelector(".js__form__input");

const form = document.querySelector(".js__form");

const deleteAllBtn = document.querySelector(".js__deleteAllCharacters");

const favouritesEmptyText = document.querySelector(".js__favouritesEmptyText");

const logBtn = document.querySelector(".js__log");

// variables de datos

let charactersData = [];

let favouritesData = [];

const placeholder =
  "https://via.placeholder.com/300x200/ffc0cb/ffffff/?text=Disney";

const favouritesDatafromLS = JSON.parse(localStorage.getItem("favouritesData"));

// funciones

function addInfo(character) {
  if (character.films.length === 0) {
    return `
  <p class="characters__list__info"> No aparece en ninguna película.</p>
  <p class="characters__list__info"> Última actualización: ${character.updatedAt}.</p>
  `;
  } else {
    return `
  <p class="characters__list__info"> Número de películas: ${character.films.length}.</p>
  <p class="characters__list__info"> Última actualización: ${character.updatedAt}.</p>
  `;
  }
}
function renderOne(oneCharacterData) {
  const characterIndex = favouritesData.findIndex(
    (oneFavourite) => oneFavourite._id === oneCharacterData._id
  );

  if (characterIndex === -1) {
    if (oneCharacterData.imageUrl === undefined) {
      charactersResultUl.innerHTML += `
    <li class="characters__list__item js__character" data-id="${
      oneCharacterData._id
    }">
        <img class="characters__list__img" src=${placeholder}
          alt="Imagen personaje">
        <a class="characters__list__name" href=${
          oneCharacterData.sourceUrl
        } target="_blank">${oneCharacterData.name}</a>
        ${addInfo(oneCharacterData)}
    </li>
    `;
    } else {
      charactersResultUl.innerHTML += `
        <li class="characters__list__item js__character" data-id="${
          oneCharacterData._id
        }">
            <img class="characters__list__img" src="${
              oneCharacterData.imageUrl
            }"
              alt="Imagen personaje">
            <a class="characters__list__name" href=${
              oneCharacterData.sourceUrl
            } target="_blank">${oneCharacterData.name}</a>
            ${addInfo(oneCharacterData)}

        </li>
        `;
    }
  } else {
    if (oneCharacterData.imageUrl === undefined) {
      charactersResultUl.innerHTML += `
      <li class="characters__list__item selected js__character" data-id="${
        oneCharacterData._id
      }">
          <img class="characters__list__img" src=${placeholder}
            alt="Imagen personaje">
          <a class="characters__list__name" href=${
            oneCharacterData.sourceUrl
          } target="_blank">${oneCharacterData.name}</a>
          ${addInfo(oneCharacterData)}

      </li>
      `;
    } else {
      charactersResultUl.innerHTML += `
          <li class="characters__list__item selected js__character" data-id="${
            oneCharacterData._id
          }">
              <img class="characters__list__img" src="${
                oneCharacterData.imageUrl
              }"
                alt="Imagen personaje">
              <a class="characters__list__name" href=${
                oneCharacterData.sourceUrl
              } target="_blank">${oneCharacterData.name}</a>
              ${addInfo(oneCharacterData)}

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

  for (const eachCharacter of allCharacters) {
    eachCharacter.addEventListener("click", handleClickCharacters);
  }
}

function renderOneFavourite(oneFavouriteData) {
  if (oneFavouriteData.imageUrl === undefined) {
    charactersSelectedUl.innerHTML += `
        <li class="characters__list__item" data-id="${oneFavouriteData._id}">
            <img class="characters__list__img" src=${placeholder}
              alt="Imagen personaje">
            <a class="characters__list__name" href=${
              oneFavouriteData.sourceUrl
            } target="_blank">${oneFavouriteData.name}</a>
            ${addInfo(oneFavouriteData)}

            <span class="characters__list__delete js__deleteFavourite">X</span>
        </li>
        `;
  } else {
    charactersSelectedUl.innerHTML += `
            <li class="characters__list__item" data-id="${
              oneFavouriteData._id
            }">
                <img class="characters__list__img" src="${
                  oneFavouriteData.imageUrl
                }"
                  alt="Imagen personaje">
                <a class="characters__list__name href=${
                  oneFavouriteData.sourceUrl
                } target="_blank">${oneFavouriteData.name}</a>
                ${addInfo(oneFavouriteData)}
                <span class="characters__list__delete js__deleteFavourite">X</span>
            </li>
            `;
  }
}

function renderFavourites() {
  charactersSelectedUl.innerHTML = "";

  for (const eachCharacter of favouritesData) {
    renderOneFavourite(eachCharacter);
  }

  const deleteFavourites = document.querySelectorAll(".js__deleteFavourite");

  for (const eachDelete of deleteFavourites) {
    eachDelete.addEventListener("click", handleClickDeleteFavourites);
  }

  if (favouritesData.length !== 0) {
    deleteAllBtn.classList.remove("hidden");
    charactersSelectedUl.classList.remove("hidden");
    favouritesEmptyText.classList.add("hidden");
  } else {
    deleteAllBtn.classList.add("hidden");
    charactersSelectedUl.classList.add("hidden");
    favouritesEmptyText.classList.remove("hidden");
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
      if (Array.isArray(data.data)) {
        charactersData = data.data;
      } else {
        charactersData = [];
        charactersData.push(data.data);
      }

      renderAll();
    });
}

function handleClickDeleteFavourites(event) {
  //ESCRIBIR UNA FUNCIÓN QUE BORRE LOS FAVORITOS DE LA LISTA Y DE EL LOCALSTORAGE.

  console.log("Click en DELETE");

  //eliminamos el personaje de favouriteData

  const clickedCharacter = event.currentTarget;

  const motherofClickedCharacter = clickedCharacter.parentElement;

  const clickedCharacterId = motherofClickedCharacter.dataset.id;

  const selectedCharacterIndex = favouritesData.findIndex(
    (oneFavourite) => oneFavourite._id === parseInt(clickedCharacterId)
  );

  favouritesData.splice(selectedCharacterIndex, 1);

  /*const selectedCharacterObj = favouritesData.find(
    (oneFavourite) => oneFavourite._id === parseInt(clickedCharacterId)
  );

  console.log(selectedCharacterObj.name);*/

  //quitamos la clase selected en la lista general de personajes

  const selectedCharacters = document.querySelectorAll(".selected");

  for (const eachSelectedCharacter of selectedCharacters) {
    if (eachSelectedCharacter.dataset.id === clickedCharacterId) {
      eachSelectedCharacter.classList.remove("selected");
    }
  }

  //eliminamos el personaje del localStorage

  localStorage.removeItem(`favouritesData`);

  localStorage.setItem("favouritesData", JSON.stringify(favouritesData));

  //volvemos a pintar los personajes favoritos

  renderFavourites();
}

function handleClickDeleteAllBtn(event) {
  const selectedCharacters = document.querySelectorAll(".selected");

  for (const eachSelectedCharacter of selectedCharacters) {
    eachSelectedCharacter.classList.remove("selected");
  }

  favouritesData = [];
  localStorage.removeItem(`favouritesData`);

  renderFavourites();
}

function handleClickLogBtn(event) {
  for (const eachFavourite of favouritesData) {
    console.log(
      `La dirección de la página de ${eachFavourite.name} es ${eachFavourite.sourceUrl}.`
    );
  }
}

// eventos

form.addEventListener("submit", handleSubmitForm);

deleteAllBtn.addEventListener("click", handleClickDeleteAllBtn);

logBtn.addEventListener("click", handleClickLogBtn);

// código que se ejecuta al cargar

fetch("//api.disneyapi.dev/character?pageSize=50")
  .then((response) => response.json())
  .then((data) => {
    charactersData = data.data;

    renderFavouritesFromLS();

    renderAll();
  });
