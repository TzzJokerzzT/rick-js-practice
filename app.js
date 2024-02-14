const character = document.getElementById("character_container");
const backBtn = document.getElementById("back_btn");
const nextBtn = document.getElementById("next_btn");
const searchBtn = document.getElementById("search_btn");
const search = document.getElementById("search_input");
const pagination = document.getElementById("pagination_container");
const loading = document.getElementById("loading");
const sidebar = document.getElementById("sidebar_nav");
const btnAlive = document.getElementById("alive_btn");
const btnDead = document.getElementById("dead_btn");
const btnUnknown = document.getElementById("unknown_btn");
const btnFemale = document.getElementById("female_btn");
const btnMale = document.getElementById("male_btn");
const btnGenderless = document.getElementById("genderless_btn");
const btnGenderUnknown = document.getElementById("unknown_gender_btn");
const btnReset = document.getElementById("resetBtn");

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
      loadCharacter(number, "", character_Status);
      highlightBtn(number);
    });
    pagination.appendChild(btn);
  }
}

paginationBtns(pageNumber);

function statusCharacter(status) {
  character_Status = status;

  // sidebar.innerHTML = "";
  // const status = ["Alive", "Dead", "Unknown"];
  // status.map((items) => {
  //   const btn = document.createElement("button");
  //   btn.classList.add("status_btn");
  //   btn.textContent = items;
  //   btn.addEventListener("click", function () {
  //     character_Status = items;
  //     loadCharacter(pageNumber, "", character_Status);
  //     highlightBtn(pageNumber);
  //   });
  //   sidebar.appendChild(btn);
  // });
}

function genderCharacter(gender) {
  character_Gender = gender;
}

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

function loadCharacter(page, name, status, gender) {
  loading.style.display = "block";
  fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}&status=${status}&gender=${gender}`
  )
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

loadCharacter(pageNumber, character_Name, character_Status, character_Gender);

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
  loadCharacter("", name, "", "");
});

btnAlive.addEventListener("click", function () {
  statusCharacter(btnAlive.value);
  loadCharacter(pageNumber, "", character_Status, "");
});

btnDead.addEventListener("click", function () {
  statusCharacter(btnDead.value);
  loadCharacter(pageNumber, "", character_Status, "");
});

btnUnknown.addEventListener("click", function () {
  statusCharacter(btnUnknown.value);
  loadCharacter(pageNumber, "", character_Status, "");
});

btnFemale.addEventListener("click", function () {
  genderCharacter(btnFemale.value);
  loadCharacter(pageNumber, "", "", character_Gender);
});

btnMale.addEventListener("click", function () {
  genderCharacter(btnMale.value);
  loadCharacter(pageNumber, "", "", character_Gender);
});

btnGenderless.addEventListener("click", function () {
  genderCharacter(btnGenderless.value);
  loadCharacter(pageNumber, "", "", character_Gender);
});

btnGenderUnknown.addEventListener("click", function () {
  genderCharacter(btnGenderUnknown.value);
  loadCharacter(pageNumber, "", "", character_Gender);
});

resetBtn.addEventListener("click", function () {
  search.value = "";
  loadCharacter(1, "", "", "");
  statusCharacter("");
  highlightBtn(1);
  paginationBtns(1);
});
