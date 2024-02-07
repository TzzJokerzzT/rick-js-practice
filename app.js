const character = document.getElementById("character_container");
const backBtn = document.getElementById("back_btn");
const nextBtn = document.getElementById("next_btn");
const search = document.getElementById("search_input");
const pagination = document.getElementById("pagination_container");

let pageNumber = 1;
let character_Name = "";

//Funciones
function changePage(offset) {
  pageNumber += offset;
  loadCharacter(pageNumber, "");
}

function paginationBtns() {
  pagination.innerHTML = "";
  for (let i = 1; i <= 42; i++) {
    const btn = document.createElement("button");
    btn.classList.add("pagination_btn");
    btn.textContent = i;
    btn.addEventListener("click", function () {
      pageNumber = i;
      loadCharacter(pageNumber, "");
      highlightBtn();
    });
    pagination.appendChild(btn);
  }
}

paginationBtns();

function highlightBtn() {
  const btns = document.querySelectorAll("button");
  btns.forEach((items) => {
    parseInt(items.textContent) === pageNumber
      ? items.classList.add("active")
      : items.classList.remove("active");
  });
}

function loadCharacter(page, name) {
  fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      character.innerHTML = "";
      data.results.map((items) => {
        const characterCard = document.createElement("section");
        characterCard.classList.add("character_card");
        const characterImage = document.createElement("img");
        characterImage.classList.add("character_image");
        characterImage.src = items.image;
        characterImage.alt = items.name;
        const characterName = document.createElement("h1");
        characterName.classList.add("character_name");
        characterName.textContent = items.name;
        character.appendChild(characterCard);
        characterCard.appendChild(characterImage);
        characterCard.appendChild(characterName);
        pageNumber === 1
          ? (backBtn.disabled = true)
          : (backBtn.disabled = false);
        pageNumber === 42
          ? (nextBtn.disabled = true)
          : (nextBtn.disabled = false);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

loadCharacter(pageNumber, character_Name);

backBtn.addEventListener("click", function () {
  changePage(-1);
});

nextBtn.addEventListener("click", function () {
  changePage(1);
});

search.addEventListener("input", function () {
  const name = search.value.toLowerCase();
  loadCharacter("", name);
});
