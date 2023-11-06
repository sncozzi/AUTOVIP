const carContainer = document.getElementById("car-container");
const yearSelect = document.getElementById("yearSelect");
const modeloSelect = document.getElementById("modeloSelect");
const select = document.getElementById("marca");
const estado = document.getElementById("estado");
const loader = document.querySelector("#loader");

loadAllCars();

function createCarCard(car) {
  const card = document.createElement("div");
  card.className = "card mb-3 mt-3";
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= car.rating) {
      starIcons.push('<i class="bi bi-star-fill"></i>');
    } else {
      starIcons.push('<i class="bi bi-star"></i>');
    }
  }
  const isNewBadge =
    car.status === 1
      ? '<span class="badge text-bg-danger m-2 p-2 position-absolute badge-hover">Nuevo</span>'
      : "";

  const priceFormatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(car.price_usd);

  card.innerHTML = `
    <div class="row g-0">
      <div class="col-12 col-xl-5 position-relative">
        ${isNewBadge}
        <img src="${
          car.image
        }" class="img-fluid rounded-start imgAuto" alt="" />
      </div>
      <div class="col-12 col-xl-7">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title"><strong>${car.brand} ${
    car.model
  }</strong></h5>
            <div class="d-flex justify-content-between">
              <p class="pe-1">${car.year}</p>
              <p class="pe-1">| ${priceFormatted} |</p>
              <form>
                <p class="clasificacion">${starIcons.join("")}</p>
              </form>
            </div>
          </div>
          <p class="card-text" style="display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${
            car.description
          }</p>
          <div>
            <button type="button" class="btn" style="background-color: #5cb95c; color: aliceblue">
              <i class="bi bi-cart-fill"></i>Comprar
            </button>
            <button type="button" class="btn btn-light" style="border: 1px solid #000">
              <i class="bi bi-plus-square"></i> Información
            </button>
            <button type="button" class="btn btn-light mt-2 mt-sm-0" style="border: 1px solid #000">
              <i class="bi bi-box-arrow-up-right"></i>Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  return card;
}

fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
  .then((res) => res.json())
  .then(() => {
    for (let i = 1900; i <= 2023; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      yearSelect.appendChild(option);
    }
  })
  .catch((error) => {
    console.error(error);
  });

fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then((res) => res.json())
  .then((marcas) => {
    for (const marca of marcas) {
      const option = document.createElement("option");
      option.value = marca;
      option.textContent = marca;
      select.appendChild(option);
    }
  })
  .catch((error) => {
    console.error(error);
  });

function loadAllCars() {
  fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
    .then((response) => response.json())
    .then((data) => {
      carContainer.innerHTML = "";
      if (data.length === 0) {
        carContainer.innerHTML = "No se encontraron autos.";
      } else {
        data.forEach((car) => {
          const card = createCarCard(car);
          carContainer.appendChild(card);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

select.addEventListener("change", function () {
  const selectedBrand = select.value;

  fetch(
    `https://ha-front-api-proyecto-final.vercel.app/models?brand=${selectedBrand}`
  )
    .then((res) => res.json())
    .then(function (modelos) {
      modeloSelect.innerHTML = "";
      const modelosHTML = modelos
        .map((modelo) => `<option value="${modelo}">${modelo}</option>`)
        .join("");
      modeloSelect.insertAdjacentHTML("beforeend", modelosHTML);
    })
    .catch((error) => {
      console.error(error);
    });
});

document
  .getElementById("filterButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    loader.style.display = "block";
    carContainer.innerHTML = "";

    const selectedYear = yearSelect.value;
    const selectedBrand = select.value;
    const selectedModel = modeloSelect.value;
    const selectedState = estado.value;

    if (!selectedYear && !selectedBrand && !selectedModel && !selectedState) {
      carContainer.innerHTML = `
      <div class="alert alert-danger mt-3" role="alert">Debes seleccionar al menos una opción de filtro.</div>
    `;
      loader.style.display = "none";
      return;
    }
    let apiUrl = "https://ha-front-api-proyecto-final.vercel.app/cars?";
    if (selectedYear) {
      apiUrl += `year=${selectedYear}&`;
    }
    if (selectedBrand) {
      apiUrl += `brand=${selectedBrand}&`;
    }
    if (selectedModel) {
      apiUrl += `model=${selectedModel}&`;
    }
    if (selectedState) {
      apiUrl += `status=${selectedState === "Nuevo" ? 1 : 0}&`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          carContainer.innerHTML = `
          <div class="alert alert-danger mt-3" role="alert">No hay resultados que coincidan con los filtros seleccionados.</div>
        `;
        } else {
          data.forEach((car) => {
            const card = createCarCard(car);
            carContainer.appendChild(card);
          });
        }
        loader.style.display = "none";
      })
      .catch((error) => {
        console.error(error);
        loader.style.display = "none";
      });
  });

var form = document.getElementById("my-form");
var submitButton = document.getElementById("submit-button");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      Accept: "application/json",
    },
  })
    .then(function (response) {
      console.log(new FormData(form));
      return response.json();
    })
    .then(function (data) {
      if (data.success) {
        alert("¡Mensaje enviado con éxito!");
      } else {
        alert(
          "Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde."
        );
      }
    });
  var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.hide();
});

var closeButton = document.querySelector("#exampleModal .btn-close");
closeButton.addEventListener("click", function () {
  var modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.hide();
});
