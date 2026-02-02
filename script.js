// ===============================
// FECHA ESTIMADA DE NACIMIENTO
// ===============================
const fechaNacimiento = new Date("2026-07-21T08:00:00");

// ===============================
// REFERENCIAS AL DOM
// ===============================
const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");
const fechaTexto = document.getElementById("fechaNacimiento");
const semanaEl = document.getElementById("semanaActual");
const tamanoEl = document.getElementById("tamanoBebe");
const listaDiario = document.getElementById("listaDiario");

// ===============================
// MOSTRAR FECHA ESTIMADA
// ===============================
fechaTexto.textContent = fechaNacimiento.toLocaleDateString("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

// ===============================
// SEMANAS DE EMBARAZO
// Base: 3 de febrero = 16 semanas
// ===============================
const fechaBase = new Date("2026-02-03T00:00:00");
const semanasBase = 16;

// ===============================
// TAMAÑO DEL BEBÉ POR SEMANA
// ===============================
const tamanosPorSemana = {
  15: "un aguacate 🥑",
  16: "un aguacate 🥑",
  17: "una pera 🍐",
  18: "un pimiento 🫑",
  19: "un mango 🥭",
  20: "un plátano 🍌",
  21: "una zanahoria 🥕",
  22: "una papaya pequeña",
  23: "una berenjena 🍆",
  24: "una mazorca 🌽",
  25: "un nabo",
  26: "una lechuga",
  27: "una col",
  28: "una berenjena grande"
};

// ===============================
// DIARIO
// ===============================
const entradasDiario = [
  "🌱 Finales de noviembre: Mamá corria, nadaba, saltaba y convivia, pero ya se sentía un poco cansada, aunque aún no sospechabamos nada.",
  "💫 Martes 3 de diciembre: hoy nos enteramos de tu llegada con dos pruebas positivas, muy emocionados pero con algo miedo e incertidumbre.",
  "🩺 Jueves 5 de diciembre: primer ultrasonido; estábamos muy nerviosos, pero te vimos con 7 semanas y 3 días y escuchamos tus latidos. Todo salió bien.",
  "🤍 Lunes 9 de diciembre: empezamos a cuidarnos más por ti; todo comenzó a girar a tu alrededor.",
  "🩺 Jueves 19 de diciembre: segundo ultrasonido; llegamos nerviosos, pero te vimos creciendo bien. Todo volvió a salir perfecto.",
  "🗓️ Martes 23 de diciembre: cumpliste 10 semanas; ya estabas más fuerte y mamá empezaba a sentirlo más.",
  "🎄 Miércoles 24 de diciembre: te portaste mal e hiciste vomitar a mamá en plena Navidad.",
  "🤢 Sábado 27 de diciembre : fue el peor día hasta ahora; hiciste que mamá vomitara 4 veces.",
  "⚠️ Lunes 30 de diciembre: hoy hubo un sangrado y nos preocupamos mucho, pero el doctor dijo que era algo normal.",
  "🎆 Martes 31 de diciembre: despedimos el año y otra vez te portaste mal e hiciste vomitar a mamá.",
  "🌤️ Martes 7 de enero: nos acercábamos al final del primer trimestre y empezábamos a sentir un poco más de calma.",
  "🩺 Jueves 16 de enero: ultrasonido del primer trimestre; estábamos muy nerviosos, pero todo salió excelente y nos dijeron que estabas sano.",
  "🌱 Miércoles 22 de enero: supimos que tenías 14 semanas y 2 días; entramos oficialmente a una nueva etapa contigo.",
  "💛 Lunes 2 de febrero: hoy sigues creciendo fuerte y sano, estamos felices de estar en día festivo juntos y orar por ti todas las noches, serás el bebé más amado."
];


entradasDiario.forEach(texto => {
  const li = document.createElement("li");
  li.textContent = texto;
  listaDiario.appendChild(li);
});

// ===============================
// ANIMACIÓN DE NÚMEROS
// ===============================
function animarCambio(elemento, nuevoValor) {
  if (elemento.textContent !== String(nuevoValor)) {
    elemento.textContent = nuevoValor;
    elemento.classList.add("animar");
    setTimeout(() => elemento.classList.remove("animar"), 300);
  }
}

// ===============================
// FUNCIÓN PRINCIPAL
// ===============================
function actualizarContador() {
  const ahora = new Date();
  const diferencia = fechaNacimiento - ahora;

  if (diferencia > 0) {
    const totalSegundos = Math.floor(diferencia / 1000);
    const totalMinutos = Math.floor(totalSegundos / 60);
    const totalHoras = Math.floor(totalMinutos / 60);
    const totalDias = Math.floor(totalHoras / 24);

    animarCambio(diasEl, totalDias);
    animarCambio(horasEl, totalHoras % 24);
    animarCambio(minutosEl, totalMinutos % 60);
    animarCambio(segundosEl, totalSegundos % 60);
  }

  const msPorSemana = 1000 * 60 * 60 * 24 * 7;
  const diferenciaSemanas = Math.floor((ahora - fechaBase) / msPorSemana);
  const semanaActual = semanasBase + diferenciaSemanas;

  semanaEl.textContent = semanaActual;
  tamanoEl.textContent =
    tamanosPorSemana[semanaActual] || "creciendo fuerte 💪";
}

// ===============================
// INICIO
// ===============================
actualizarContador();
setInterval(actualizarContador, 1000);
// ===============================
// CARRUSEL
// ===============================
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let indice = 0;

function mostrarSlide() {
  slides.style.transform = `translateX(-${indice * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  indice = (indice + 1) % images.length;
  mostrarSlide();
});

prevBtn.addEventListener("click", () => {
  indice = (indice - 1 + images.length) % images.length;
  mostrarSlide();
});

// ===============================
// BOTÓN AUDIO LATIDOS
// ===============================
const audio = document.getElementById("latidos");
const btnAudio = document.getElementById("btnAudio");

let reproduciendo = false;

btnAudio.addEventListener("click", () => {
  if (!reproduciendo) {
    audio.play();
    btnAudio.textContent = "⏸ Pausar latidos";
    reproduciendo = true;
  } else {
    audio.pause();
    btnAudio.textContent = "▶ Escuchar latidos";
    reproduciendo = false;
  }
});
