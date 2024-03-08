const options = {
  garage: "Garagem",
  door: "Porta",
  window: "Janela",
  wall: "Parede",
  garden: "Jardim",
  stairs: "Escadas",
  balcony: "Sacada",
  porch: "Varanda",
  roof: "Telhado",
  floor: "Chão",
  doorbell: "Campainha",
  furniture: "Mobília",
  "living-room": "Sala de estar",
  television: "Televisão",
  couch: "Sofá",
  bookshelf: "Estante de livros",
  "ceiling-fan": "Ventilador de teto",
  "air-conditioner": "Ar condicionado",
  clock: "Relógio de parede",
  "coffee-table": "Mesinha de centro",
  cushion: "Almofada",
  doormat: "Capacho",
  rug: "Tapete",
  armchair: "Poltrona",
  "side-board": "Aparador",
  "dining-room": "Sala de jantar",
  table: "Mesa",
  tablecloth: "Toalha de mesa",
  chair: "Cadeira",
  plate: "Prato",
  silverware: "Talheres",
  fork: "Garfo",
  knife: "Faca",
  spoon: "Colher",
  glass: "Copo",
  bowl: "Tigela",
  kicthen: "Cozinha",
  fridge: "Geladeira",
  cabinet: "Armário",
  stove: "Fogão",
  oven: "Forno",
  "microwave-oven": "Forno de microondas",
  blender: "Liquidificador",
  sink: "Pia",
  faucet: "Torneira",
  "frying-pan": "Frigideira",
  "baking-tray": "Assadeira",
  "can-opener": "Abridor de lata",
  "chopping-board": "Tábua de cortar",
  cup: "Xícara",
  pot: "Panela",
  mug: "Caneca",
  ladle: "Concha",
  kettle: "Chaleira",
  mixer: "Batedeira",
  bedroom: "Quarto",
  bed: "Cama",
  blanket: "Cobertor",
  pillow: "Travesseiro",
  mattress: "Colchão",
  wardroble: "Guarda-roupas",
  lamp: "Abajur",
  "bedside-table": "Mesa de cabeceira",
  "alarm-clock": "Despertador",
  "chest-of-drawers": "Cômoda",
  bathroom: "Banheiro",
  mirror: "Espelho",
  toilet: "Vaso sanitário",
  shower: "Chuveiro",
  bathtub: "Banheira",
  towel: "Toalha",
  toothpaste: "Creme dental",
  toothbrush: "Escova dental",
  "toilet-paper": "papel higiênico",
  "hair-dryer": "Secador de cabelo",
  hairbrush: "Escova de cabelo",
  deodorant: "Desodorante",
  "dental-floss": "Fio dental",
  office: "Escritório",
  desk: "Escrivaninha",
  computer: "Computador",
  printer: "Impressora",
  telephone: "Telefone",
  "file-cabinet": "Armário de arquivos",
  "trash-can": "Lixeira",
  "bulletin-board": "Quadro de avisos",
  calculator: "Calculadora",
  earphone: "Fone de ouvidol",
  headphone: "Fone de ouvido",
  highlighter: "Caneta marca texto",
  keyboard: "Teclado",
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