let intentos = 6;
let palabra = '';
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const grid = document.getElementById("grid");
const guesses = document.getElementById("guesses");
const diccionario = ['MANOS', 'TIGRE', 'SILLA', 'FUEGO', 'COCHE', 'PERRO', 'GATOS', 'MESAS', 'PATIO', 'LUNES', 'JUEGO', 'BEBES', 'RADIO', 'SOLAR', 'PULPO', 'CIELO', 'HOYOS', 'ROJOS', 'RELOJ'];

// Obtener palabra aleatoria en español de longitud 5
function obtenerPalabra() {
  fetch("https://random-word-api.herokuapp.com/word?length=5&lang=es")
    .then(response => response.json())
    .then(data => {
      palabra = data[0].toUpperCase();
      console.log(palabra);
    })
    .catch(error => {
      console.log(error);
      palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
      console.log(palabra);
    });
}

// Agregar evento al botón
button.addEventListener("click", intentar);

// Agregar evento a enter
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    intentar();
  }
});

function terminar(mensaje) {
  input.disabled = true;
  guesses.innerHTML = mensaje;
};


function errorCaracteres(mensaje) {
  guesses.innerHTML = mensaje;
}

function limpiarError() {
  guesses.innerHTML = "";
}

function validarIntento(intento) {
  intento = intento.toUpperCase();
  if (intento.length !== 5) {
    return false;
  }
  return true;
}

function intentar() {
  limpiarError();
  const INTENTO = input.value.toUpperCase();

  if (!validarIntento(INTENTO)) {
    errorCaracteres("El intento debe tener 5 caracteres :)");
    return;
  }

  if (INTENTO === palabra) {
    terminar("<p class='mensaje'>¡GANASTE! 😀</p>");
    return;
  }

  const row = document.createElement("div");
  row.className = "row";

  for (let i = 0; i < palabra.length; i++) {
    const span = document.createElement("span");
    span.className = "letter";

    if (INTENTO[i] === palabra[i]) {
      span.innerHTML = INTENTO[i];
      span.style.backgroundColor = "green";
    } else if (palabra.includes(INTENTO[i])) {
      span.innerHTML = INTENTO[i];
      span.style.backgroundColor = "yellow";
    } else {
      span.innerHTML = INTENTO[i];
      span.style.backgroundColor = "grey";
    }

    row.appendChild(span);
  }

  grid.appendChild(row);
  intentos--;

  if (intentos === 0) {
    terminar("<p class='mensaje'>¡PERDISTE! 😖</p>");
  }
}

obtenerPalabra();
