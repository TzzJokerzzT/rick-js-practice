const character = document.getElementById("character_container");

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((items) => {
        const characterCard = document.createElement("section");
        characterCard.classList.add("character_card");
        const characterImage = document.createElement("img");
        characterImage.classList.add("character_image");
        characterImage.src = items.image;
        characterImage.alt = items.name;
        const characterName = document.createElement("h2");
        characterName.textContent = items.name;
        characterCard.appendChild(characterImage);
        characterCard.appendChild(characterName);
        character.appendChild(characterCard);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});