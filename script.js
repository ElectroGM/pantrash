const frases = [
  { texto: "La banda Pantrash una vez también se llamó Orión...", pesoBase: 10, pesoActual: 10 },
  { texto: "A veces, ensayar no es tan necesario...", pesoBase: 10, pesoActual: 10 },
  { texto: "La sala de musica estara algun dia desocupada...", pesoBase: 10, pesoActual: 10 },
  { texto: "Nuestros mejores amigos son los que hacemos en el liceo...", pesoBase: 10, pesoActual: 10 },

  { 
    texto: "frase especial",
    pesoBase: 10,
    pesoActual: 10,
    especial: true
  },

  { texto: "No puedes ser Metalica y Megadeth a la vez...", pesoBase: 10, pesoActual: 10 },
  { texto: "Descansa en paz Cliff...", pesoBase: 10, pesoActual: 10 },

  { texto: "¯\\_(ツ)_/¯", pesoBase: 2, pesoActual: 2 },
  { texto: "¯\\_( ͡° ͜ʖ ͡°)_/¯", pesoBase: 2, pesoActual: 2 },
  { texto: "ಠ_ಠ", pesoBase: 2, pesoActual: 2 },
  { texto: "¯\\_㋡_/¯", pesoBase: 2, pesoActual: 2 },
  { texto: "☝(ツ)", pesoBase: 2, pesoActual: 2 }
];

const elementoFooter = document.getElementById("fraseFooter");
let fraseActual = null;

function elegirFrasePorPeso() {
  const pesoTotal = frases.reduce((total, frase) => total + frase.pesoActual, 0);
  let random = Math.random() * pesoTotal;

  for (const frase of frases) {
    random -= frase.pesoActual;
    if (random <= 0) return frase;
  }

  return frases[frases.length - 1];
}

function actualizarPesos(fraseElegida) {
  for (const frase of frases) {
    if (frase === fraseElegida) {
      frase.pesoActual = Math.max(1, frase.pesoBase * 0.15);
    } else {
      frase.pesoActual = Math.min(frase.pesoBase, frase.pesoActual + frase.pesoBase * 0.25);
    }
  }
}

function obtenerHoraActual() {
  const ahora = new Date();
  return ahora.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function obtenerMensajePorHora() {
  const hora = new Date().getHours();

  if (hora >= 6 && hora < 12) {
    return "...joder, que temprano que estas despierto...";
  } else if (hora >= 12 && hora < 18) {
    return "su cs?";
  } else if (hora >= 18 && hora < 22) {
    return "ya se está haciendo tarde...";
  } else {
    return "muy tarde bro...";
  }
}

function mostrarFrase(frase) {
  if (frase.especial) {
    elementoFooter.innerHTML = `
      <div class="frase-especial-contenedor">
        <div class="frase-superior">${obtenerMensajePorHora()}</div>
        <div class="frase-linea">
          <span class="hora-pc">${obtenerHoraActual()}</span>
          <span class="flecha-final">🡣</span>
        </div>
      </div>
    `;
    elementoFooter.classList.add("frase-especial");
  } else {
    elementoFooter.textContent = frase.texto;
    elementoFooter.classList.remove("frase-especial");
  }
}

function cambiarFrase() {
  elementoFooter.classList.remove("mostrar");
  elementoFooter.classList.add("ocultar");

  setTimeout(() => {
    let nuevaFrase;

    do {
      nuevaFrase = elegirFrasePorPeso();
    } while (frases.length > 1 && nuevaFrase === fraseActual);

    fraseActual = nuevaFrase;
    mostrarFrase(nuevaFrase);
    actualizarPesos(nuevaFrase);

    elementoFooter.classList.remove("ocultar");
    elementoFooter.classList.add("mostrar");
  }, 2000);
}

fraseActual = elegirFrasePorPeso();
mostrarFrase(fraseActual);
actualizarPesos(fraseActual);

elementoFooter.classList.add("mostrar");

setInterval(cambiarFrase, 6010);