const carImg = document.getElementById("carImg");
const year = document.getElementById("yearSelect");
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


document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://ha-front-api-proyecto-final.vercel.app/cars";

  const carContainer = document.getElementById("car-container");

  fetch(apiUrl)
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
                <di class="col-12 col-xl-7">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <h5 id="brand" class="card-title">
                        <strong> ${car.brand} ${car.model}</strong>
                      </h5>
                      <div class="d-flex justify-content-between">
                        <p id="year" class="pe-1">${car.year}</p>
                        <p id="price" class="pe-1">| USD 92.000 |</p>
                        <form>
                          <p class="clasificacion">
                            <input
                              id="radio1"
                              type="radio"
                              name="estrellas"
                              value="5"
                            /><!--
                        --><label for="radio1">★</label
                            ><!--
                        --><input
                              id="radio2"
                              type="radio"
                              name="estrellas"
                              value="4"
                            /><!--
                        --><label for="radio2">★</label
                            ><!--
                        --><input
                              id="radio3"
                              type="radio"
                              name="estrellas"
                              value="3"
                            /><!--
                        --><label for="radio3">★</label
                            ><!--
                        --><input
                              id="radio4"
                              type="radio"
                              name="estrellas"
                              value="2"
                            /><!--
                        --><label for="radio4">★</label
                            ><!--
                        --><input
                              id="radio5"
                              type="radio"
                              name="estrellas"
                              value="1"
                            /><!--
                        --><label for="radio5">★</label>
                          </p>
                        </form>
                      </div>
                    </div>
                    <p id="description" class="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corporis repellat illum, possimus ullam modi quam,
                      quisquam obcaecati rerum esse est optio pariatur totam
                      inventore debitis magni, voluptatem ut repellendus
                      molestias.
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
});
