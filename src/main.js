const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");

runEventListeners();

function runEventListeners() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

function clear(e) {
  e.preventDefault();
  searchInput.value = "";
  Array.from(imageListWrapper.children).forEach((child) => child.remove());
}

function search(e) {
  e.preventDefault();
  const value = searchInput.value.trim();
  if (!value) return;

  const apiKey = import.meta.env.VITE_UNSPLASH_KEY;

  console.log("API KEY:", import.meta.env.VITE_UNSPLASH_KEY);

  fetch(
    `https://api.unsplash.com/search/photos?query=${value}&client_id=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.results) {
        console.error("API sonuç getirmedi:", data);
        return;
      }
      Array.from(data.results).forEach((image) => {
        addImageToUI(image.urls.small);
      });
    })

    .catch((err) => console.log(err));
}

function addImageToUI(url) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = "400";
  img.width = "400";

  div.append(img);
  imageListWrapper.append(div);
}
