const options = {
  laptop: "Notebook",
  notepad: "Bloco de notas",
  "paper-clip": "Clipe",
  planner: "Agenda",
  stamp: "Carimbo",
  stapler: "Grampeador",
  "laundry-shop": "Lavanderia",
  mop: "Esfregão",
  "washing-machine": "Máquina de lavar roupas",
  iron: "Ferro de passar",
  "ironing-board": "Tábua de passar",
  soap: "Sabão",
  "laundry-detergent": "Sabão em pó",
  "vacuum-cleaner": "Aspirador",
  broom: "Vassoura",
  bucket: "Balde",
  crayon: "Giz de cera",
  "drawing-pad": "bloco de desenho",
  eraser: "Borracha",
  "mechanical-pencil": "Lapiseira",
  paint: "Tinta",
  "paint-brush": "Pincel",
  paper: "Papel",
  pen: "Caneta",
  pencil: "Lápis",
  "pencil-case": "Estojo",
  "pencil-compass": "Compasso",
  ruler: "Régua",
  scissors: "Tesoura",
  sharpener: "Apontador",
  sticker: "Adesivo",
  "watercolor-set": "Aquarela",
  backpack: "Mochila",
  bag: "Bolsa",
  "cell-phone": "Telefone celular",
  glasses: "óculos",
  keychain: "Chaveiro",
  keys: "Chave",
  ring: "Anel",
  wallet: "Carteira",
  watch: "Relógio de pulso",
  "allen-wrench": "Chave allen",
  axe: "Machado",
  bolt: "Parafuso de porca",
  chainsaw: "Motoserra",
  crowbar: "Pé de cabra",
  drill: "Furadeira",
  file: "Lima",
  "grinding-machine": "Esmeril",
  hammer: "Martelo",
  hook: "Gancho",
  nail: "Prego",
  penknife: "Canivete",
  "phillips-screwdriver": "Chave phillips",
  pickaxe: "Picareta",
  "pipe-wrench": "Chave de grifo",
  plier: "Alicate",
  screwdriver: "Chave de fenda",
  sickle: "Foice",
  "socket-wrench": "Chave de boca",
  square: "Esquadro",
  "stanley-knife": "Estilete",
  "wheel-wrench": "Chave de roda",
  wheelbarrow: "Carrinho de mão",
  wrench: "Chave",
  ball: "Bola",
  basket: "Cesta",
  bass: "Baixo",
  binoculars: "Binóculos",
  book: "Livro",
  cap: "Boné",
  comb: "Pente",
  compass: "Bússola",
  doll: "Boneca",
  "double-bass": "Contrabaixo",
  drums: "Bateria",
  piano: "Piano",
  "fishing-rod": "Vara de pescar",
  flashlight: "Lanterna",
  guitar: "Guitarra; Violão",
  hose: "Mangueira",
  lighter: "Isqueiro",
  "lip-gloss": "Brilho labial",
  lipstick: "Batom",
  razor: "Barbeador",
  "roller-skates": "Patins",
  saxophone: "Saxofone",
  skateboard: "Skate",
  trumpet: "Trompete",
  umbrella: "Guarda-chuva",
};

// Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "";
let randomHint = "";
let winCount = 0;
let lossCount = 0;

// Generate random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
};

// Start Game
startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
});

// Stop Game
const stopGame = () => {
    controls.classList.remove("hide");
};

// Generate Word Function
const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint"><span>Dica: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
        if (value === "-") {
            displayItem += '<span class="inputSpace">- </span>';
        } else {
            displayItem += '<span class="inputSpace">_ </span>';
        }
    });
    // Display each element as span
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>Chances restantes: ${lossCount}</div>`;
};

// Initial Function
const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    // For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);

        // Character button onclick
        button.addEventListener("click", () => {
            if (randomWord.includes(button.innerText.toLowerCase())) {
                // Correct letter
                button.classList.add("correct");
                updateDisplay(button.innerText.toLowerCase());
                message.innerText = "Letra Correta";
                message.style.color = "#008000";
            } else {
                // Incorrect letter
                button.classList.add("incorrect");
                lossCount -= 1;
                updateDisplay();
                message.innerText = "Letra Incorreta";
                message.style.color = "#ff0000";
            }

            // Check if the word is complete
            if (!userInpSection.innerText.includes("_")) {
                resultText.innerHTML = "WOW! VOCÊ ACERTOU!";
                startBtn.innerText = "Jogar novamente";
                // Block all buttons
                blocker();
            } else if (lossCount === 0) {
                word.innerHTML = `A palavra era: <span>${randomWord}</span>`;
                resultText.innerHTML = "IH! VOCÊ ERROU!";
                startBtn.innerText = "Tente novamente";
                blocker();
            }

            // Disable clicked buttons
            button.disabled = true;
        });

        // Append generated buttons to the letters container
        letterContainer.appendChild(button);
    }
};

// Update the display based on the guessed letter
const updateDisplay = (guessedLetter = "") => {
    let charArray = randomWord.split("");
    let inputSpaces = document.getElementsByClassName("inputSpace");

    charArray.forEach((char, index) => {
        if (char === guessedLetter || char === "-") {
            inputSpaces[index].innerText = char;
            if (char === guessedLetter) {
                winCount += 1;
            }
        }
    });

    document.getElementById("chanceCount").innerText = `Chances restantes: ${lossCount}`;
};

window.onload = () => {
    init();
};