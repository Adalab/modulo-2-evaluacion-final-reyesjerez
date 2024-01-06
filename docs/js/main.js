console.log(">> Ready :)");const r=document.querySelector(".js__charactersResultUl"),l=document.querySelector(".js__charactersSelectedUl"),f=document.querySelector(".js__form__input"),v=document.querySelector(".js__form"),h=document.querySelector(".js__deleteAllCharacters"),u=document.querySelector(".js__favouritesEmptyText");let o=[],s=[];const m="https://via.placeholder.com/300x200/ffc0cb/ffffff/?text=Disney",g=JSON.parse(localStorage.getItem("favouritesData"));function S(e){s.findIndex(c=>c._id===e._id)===-1?e.imageUrl===void 0?r.innerHTML+=`
    <li class="characters__list__item js__character" data-id="${e._id}">
        <img class="characters__list__img" src=${m}
          alt="Imagen personaje">
        <h4 class="characters__list__name">${e.name}</h4>
    </li>
    `:r.innerHTML+=`
        <li class="characters__list__item js__character" data-id="${e._id}">
            <img class="characters__list__img" src="${e.imageUrl}"
              alt="Imagen personaje">
            <h4 class="characters__list__name">${e.name}</h4>
        </li>
        `:e.imageUrl===void 0?r.innerHTML+=`
      <li class="characters__list__item selected js__character" data-id="${e._id}">
          <img class="characters__list__img" src=${m}
            alt="Imagen personaje">
          <h4 class="characters__list__name">${e.name}</h4>
      </li>
      `:r.innerHTML+=`
          <li class="characters__list__item selected js__character" data-id="${e._id}">
              <img class="characters__list__img" src="${e.imageUrl}"
                alt="Imagen personaje">
              <h4 class="characters__list__name">${e.name}</h4>
          </li>
          `}function p(){r.innerHTML="";for(const t of o)S(t);const e=document.querySelectorAll(".js__character");for(const t of e)t.addEventListener("click",L)}function j(e){e.imageUrl===void 0?l.innerHTML+=`
        <li class="characters__list__item js__character" data-id="${e._id}">
            <img class="characters__list__img" src=${m}
              alt="Imagen personaje">
            <h4 class="characters__list__name">${e.name}</h4>
            <span class="characters__list__delete js__deleteFavourite">X</span>
        </li>
        `:l.innerHTML+=`
            <li class="characters__list__item js__character" data-id="${e._id}">
                <img class="characters__list__img" src="${e.imageUrl}"
                  alt="Imagen personaje">
                <h4 class="characters__list__name">${e.name}</h4>
                <span class="characters__list__delete js__deleteFavourite">X</span>
            </li>
            `}function i(){l.innerHTML="";for(const t of s)j(t);const e=document.querySelectorAll(".js__deleteFavourite");for(const t of e)t.addEventListener("click",y);s.length!==0?(h.classList.remove("hidden"),l.classList.remove("hidden"),u.classList.add("hidden")):(h.classList.add("hidden"),l.classList.add("hidden"),u.classList.remove("hidden"))}function I(){g===null||(s=g),i()}function L(e){console.log("click");const t=e.currentTarget;t.classList.toggle("selected");const c=t.dataset.id,n=o.find(a=>a._id===parseInt(c)),d=s.findIndex(a=>a._id===parseInt(c));d===-1?s.push(n):s.splice(d,1),localStorage.setItem("favouritesData",JSON.stringify(s)),i()}function $(e){e.preventDefault(),console.log(f.value),fetch(`//api.disneyapi.dev/character?pageSize=50&name=${f.value}`).then(t=>t.json()).then(t=>{o=t.data,p()})}function y(e){console.log("Click en DELETE");const n=e.currentTarget.parentElement.dataset.id,d=s.findIndex(_=>_._id===parseInt(n));s.splice(d,1);const a=document.querySelectorAll(".selected");console.log(a);for(const _ of a)_.dataset.id===n&&_.classList.remove("selected");localStorage.removeItem("favouritesData"),localStorage.setItem("favouritesData",JSON.stringify(s)),i()}function k(e){const t=document.querySelectorAll(".selected");for(const c of t)c.classList.remove("selected");s=[],localStorage.removeItem("favouritesData"),i()}v.addEventListener("submit",$);h.addEventListener("click",k);fetch("//api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{o=e.data,I(),p()});
//# sourceMappingURL=main.js.map
