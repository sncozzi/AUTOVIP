const carImg = document.getElementById("carImg");
const year = document.getElementById("year");
const price = document.getElementById("price");
const description = document.getElementById("description");
const brand = document.getElementById("brand");

fetch("https://ha-front-api-proyecto-final.vercel.app/cars").then(function (
  res
) {
  return res.json();
}).then;
for (let i = 1900; i < 2023; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  year.appendChild(option);
}
