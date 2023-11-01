const carImg = document.getElementById("carImg");
const year = document.getElementById("yearSelect");
const price = document.getElementById("price");
const description = document.getElementById("description");
const brand = document.getElementById("brand");
const select = document.getElementById("marca");
const carContainer = document.getElementById("car-container");

fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
  .then(function (res) {
    return res.json();
  })
  .then(function (car) {
    for (let i = 1900; i < 2023; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      year.appendChild(option);
    }
  });
fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then(function (res) {
    return res.json();
  })
  .then(function (marcas) {
    for (const marca of marcas) {
      const option = document.createElement("option");
      option.value = marca;
      option.textContent = marca;
      select.appendChild(option);
    }
  });

document
  .getElementById("filterButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita el envío del formulario

    // el código de filtrado mas tarde

    carContainer.innerHTML = ""; // Limpia el contenido anterior

    fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((car) => {
          const card = createCarCard(car);
          carContainer.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });
  });

function createCarCard(car) {
  const card = document.createElement("div");
  card.className = "card mb-3 mt-3";

  card.innerHTML = `
  <div class="row g-0">
    <div class="col-12 col-xl-5">
      <img
        src="${car.image}"
        id="carImg"
        class="img-fluid rounded-start imgAuto"
        alt=""
      />
    </div>
    <div class="col-12 col-xl-7">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 id="brand" class="card-title">
            <strong> ${car.brand} ${car.model}</strong>
          </h5>
          <div class="d-flex justify-content-between">
            <p id="year" class="pe-1">${car.year}</p>
            <p id="price" class="pe-1">| USD ${car.price_usd} |</p>
            <form>
              <p class="clasificacion">
                ${getStarRating(car.rating)}
              </p>
            </form>
          </div>
        </div>
        <p id "description" class="card-text">
          ${car.description}
        </p>
        <div>
          <button
            type="button"
            class="btn"
            style="background-color: #5cb95c; color: aliceblue"
          >
            <i class="bi bi-cart-fill"> </i>Comprar
          </button>
          <button
            type="button"
            class="btn btn-light"
            style="border: 1px solid #000"
          >
            <i class="bi bi-plus-square"> </i> Más información
          </button>
          <button
            type="button"
            class="btn btn-light"
            style="border: 1px solid #000"
          >
            <i class="bi bi-box-arrow-up-right"> </i>Compartir
          </button>
        </div>
      </div>
    </div>
  </div>
`;

  return card;
}

function getStarRating(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars +=
        '<input type="radio" name="estrellas" value="' +
        i +
        '" checked id="radio' +
        i +
        '">';
    } else {
      stars +=
        '<input type="radio" name="estrellas" value="' +
        i +
        '" id="radio' +
        i +
        '">';
    }
    stars += '<label for="radio' + i + '">★</label>';
  }
  return stars;
}
