console.log(">> Ready :)");const l=document.querySelector(".js__charactersResultUl"),i=document.querySelector(".js__charactersSelectedUl"),f=document.querySelector(".js__form__input"),v=document.querySelector(".js__form"),h=document.querySelector(".js__deleteAllCharacters"),u=document.querySelector(".js__favouritesEmptyText");let a=[],s=[];const m="https://via.placeholder.com/300x200/ffc0cb/ffffff/?text=Disney",g=JSON.parse(localStorage.getItem("favouritesData"));function S(e){s.findIndex(c=>c._id===e._id)===-1?e.imageUrl===void 0?l.innerHTML+=`
    <li class="characters__list__item js__character" data-id="${e._id}">
        <img class="characters__list__img" src=${m}
          alt="Imagen personaje">
        <h4 class="characters__list__name">${e.name}</h4>
    </li>
    `:l.innerHTML+=`
        <li class="characters__list__item js__character" data-id="${e._id}">
            <img class="characters__list__img" src="${e.imageUrl}"
              alt="Imagen personaje">
            <h4 class="characters__list__name">${e.name}</h4>
        </li>
        `:e.imageUrl===void 0?l.innerHTML+=`
      <li class="characters__list__item selected js__character" data-id="${e._id}">
          <img class="characters__list__img" src=${m}
            alt="Imagen personaje">
          <h4 class="characters__list__name">${e.name}</h4>
      </li>
      `:l.innerHTML+=`
          <li class="characters__list__item selected js__character" data-id="${e._id}">
              <img class="characters__list__img" src="${e.imageUrl}"
                alt="Imagen personaje">
              <h4 class="characters__list__name">${e.name}</h4>
          </li>
          `}function p(){l.innerHTML="";for(const t of a)S(t);const e=document.querySelectorAll(".js__character");for(const t of e)t.addEventListener("click",j)}function I(e){e.imageUrl===void 0?i.innerHTML+=`
        <li class="characters__list__item" data-id="${e._id}">
            <img class="characters__list__img" src=${m}
              alt="Imagen personaje">
            <h4 class="characters__list__name">${e.name}</h4>
            <span class="characters__list__delete js__deleteFavourite">X</span>
        </li>
        `:i.innerHTML+=`
            <li class="characters__list__item" data-id="${e._id}">
                <img class="characters__list__img" src="${e.imageUrl}"
                  alt="Imagen personaje">
                <h4 class="characters__list__name">${e.name}</h4>
                <span class="characters__list__delete js__deleteFavourite">X</span>
            </li>
            `}function n(){i.innerHTML="";for(const t of s)I(t);const e=document.querySelectorAll(".js__deleteFavourite");for(const t of e)t.addEventListener("click",$);s.length!==0?(h.classList.remove("hidden"),i.classList.remove("hidden"),u.classList.add("hidden")):(h.classList.add("hidden"),i.classList.add("hidden"),u.classList.remove("hidden"))}function L(){g===null||(s=g),n()}function j(e){console.log("click");const t=e.currentTarget;t.classList.toggle("selected");const c=t.dataset.id,d=a.find(r=>r._id===parseInt(c)),_=s.findIndex(r=>r._id===parseInt(c));_===-1?s.push(d):s.splice(_,1),localStorage.setItem("favouritesData",JSON.stringify(s)),n()}function y(e){e.preventDefault(),console.log(f.value),fetch(`//api.disneyapi.dev/character?pageSize=50&name=${f.value}`).then(t=>t.json()).then(t=>{Array.isArray(t.data)?a=t.data:(a=[],a.push(t.data)),p()})}function $(e){console.log("Click en DELETE");const d=e.currentTarget.parentElement.dataset.id,_=s.findIndex(o=>o._id===parseInt(d));s.splice(_,1);const r=document.querySelectorAll(".selected");for(const o of r)o.dataset.id===d&&o.classList.remove("selected");localStorage.removeItem("favouritesData"),localStorage.setItem("favouritesData",JSON.stringify(s)),n()}function k(e){const t=document.querySelectorAll(".selected");for(const c of t)c.classList.remove("selected");s=[],localStorage.removeItem("favouritesData"),n()}v.addEventListener("submit",y);h.addEventListener("click",k);fetch("//api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{a=e.data,L(),p()});
//# sourceMappingURL=main.js.map
