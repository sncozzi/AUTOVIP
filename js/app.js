const carImg = document.getElementById("carImg");
const year = document.getElementById("year");
const price = document.getElementById("price");
const description = document.getElementById("description")
const brand = document.getElementById("brand")

fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
.then(function (res){
    return res.json();
})
.then

.catch(function (err) {
    console.error(err);
    loader.style.display = "none"; })