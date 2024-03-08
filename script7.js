const options = {
  jackdaw: "Gralha",
  vulture: "Urubu",
  ant: "Formiga",
  bee: "Abelha",
  beetle: "Besouro",
  butterfly: "Borboleta",
  caterpillar: "Lagarta",
  cockroach: "Barata",
  clicket: "Grilo",
  dragonfly: "Libélula",
  firefly: "Vagalume",
  flea: "Pulga",
  fly: "Mosca",
  housefly: "Mosca",
  mosquito: "Mosquito",
  gnat: "Mosquito",
  ladybug: "Joaninha",
  "lady-bug": "Joaninha",
  louse: "Piolho",
  moth: "Mariposa",
  alligator: "Jacaré",
  antelope: "Antílope",
  bear: "Urso",
  beaver: "Castor",
  bison: "Bisão",
  boar: "Javali",
  buffalo: "Búfalo",
  camel: "Camelo",
  chameleon: "Camaleão",
  chimpanzee: "Chimpanzé",
  crocodile: "Crocodilo",
  deer: "Veado",
  stag: "Veado",
  elephant: "Elefante",
  fox: "Raposa",
  gazelle: "Gazela",
  gecko: "Iguana",
  giraffe: "Girafa",
  gorilla: "Gorila",
  "grizzly-bear": "Urso pardo",
  hedgehog: "Ouriço",
  hippo: "Hipopótamo",
  hyena: "Hiena",
  kangaroo: "Cangurú",
  lion: "Leão",
  lizard: "Lagarto",
  llama: "Lhama",
  lynx: "Lince",
  mammoth: "Mamute",
  marmot: "Marmota",
  mooose: "Alce",
  "panda-bear": "Urso panda",
  panther: "Leopardo",
  platypus: "Ornitorrinco",
  "polar-bear": "Urso polar",
  polecat: "Doninha",
  raccoon: "Guaxinim",
  reindeer: "Rena",
  rhino: "Rinoceronte",
  rhinoceros: "Rinoceronte",
  scorpion: "Escorpião",
  snake: "Cobra",
  squirrel: "Esquilo",
  tiger: "Tigre",
  "venomous-snake": "Salamandra",
  wolf: "Lobo",
  zebra: "Zebra",
  "giant-anteater": "Tamanduá-bandeira",
  armadillo: "Tatu",
  capybara: "Capivara",
  coati: "Quati",
  "giant-otter": "Ariranha",
  "golden-lion-tamarin": "Mico-leão-dourado",
  "maned-wolf": "Lobo-guará",
  jaguar: "Onça-pintada",
  "pink-dolphin": "Boto cor-de-rosa",
  sloth: "Bicho-preguiça",
  tapir: "Anta",
  tortoise: "Jabuti",
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