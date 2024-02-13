const character = document.getElementById("character_container");
const backBtn = document.getElementById("back_btn");
const nextBtn = document.getElementById("next_btn");
const searchBtn = document.getElementById("search_btn");
const search = document.getElementById("search_input");
const pagination = document.getElementById("pagination_container");
const loading = document.getElementById("loading");
const sidebar = document.getElementById("sidebar_nav");
const btnAlive = document.getElementById("alive_btn");

let pageNumber = 1;
let character_Name = "";
let character_Status = "";
let character_Species = "";
let character_Gender = "";

//Funciones
function changePage(offset) {
  pageNumber += offset;
  loadCharacter(pageNumber, "");
}

function paginationBtns(number) {
  pagination.innerHTML = "";
  for (let i = 1; i <= 42; i++) {
    const btn = document.createElement("button");
    btn.classList.add("pagination_btn");
    btn.textContent = i;
    btn.addEventListener("click", function () {
      number = i;
      loadCharacter(number, "");
      highlightBtn(number);
    });
    pagination.appendChild(btn);
  }
}

btnAlive.addEventListener("click", function () {
  c
});

paginationBtns(pageNumber);

function highlightBtn(number) {
  const btns = document.querySelectorAll("button");
  btns.forEach((items) => {
    items.classList.remove("active");
    if (parseInt(items.textContent) === number) {
      items.classList.add("active");
    }
    // ? items.classList.add("active")
    // : items.classList.remove("active");
  });
}

function loadCharacter(page, name) {
  loading.style.display = "block";
  fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      loading.style.display = "none";
      character.innerHTML = "";
      data.results.map((items) => {
        //Cards
        const characterCard = document.createElement("section");
        characterCard.classList.add("character_card");
        const characterImage = document.createElement("img");
        characterImage.classList.add("character_image");
        characterImage.src = items.image;
        characterImage.alt = items.name;
        const characterName = document.createElement("h1");
        characterName.classList.add("character_name");
        characterName.textContent = items.name;
        const characterStatus = document.createElement("p");
        characterStatus.classList.add("character_status");
        characterStatus.textContent = items.status;
        const characterGender = document.createElement("p");
        characterGender.classList.add("character_gender");
        characterGender.textContent = items.gender;
        character.appendChild(characterCard);
        characterCard.appendChild(characterImage);
        characterCard.appendChild(characterName);
        characterCard.appendChild(characterStatus);
        characterCard.appendChild(characterGender);
        pageNumber === 1
          ? (backBtn.disabled = true)
          : (backBtn.disabled = false);
        pageNumber === 42
          ? (nextBtn.disabled = true)
          : (nextBtn.disabled = false);
        if (characterStatus.textContent === "Alive") {
          characterStatus.classList.add("alive");
        }
        if (characterStatus.textContent === "Dead") {
          characterStatus.classList.add("dead");
        }
      });
    })
    .catch((error) => {
      loading.style.display = "none";
      console.error("Error fetching data:", error);
    });
}

loadCharacter(pageNumber, character_Name);

backBtn.addEventListener("click", function () {
  highlightBtn(pageNumber);
  changePage(-1);
});

nextBtn.addEventListener("click", function () {
  highlightBtn(pageNumber);
  changePage(1);
});

searchBtn.addEventListener("click", function () {
  const name = search.value.toLowerCase();
  loadCharacter("", name);
});
