const options = {
  head: "Cabeça",
  scalp: "Couro cabeludo",
  hair: "Cabelo",
  forehead: "Testa",
  eyebrow: "Sobrancelha",
  eye: "Olho",
  eyelid: "Pálpebra",
  eyelashes: "Cílios",
  ear: "Orelha",
  nose: "Nariz",
  mouth: "Boca",
  throat: "Garganta",
  lips: "Lábios",
  tooth: "Dente",
  teeth: "Dentes",
  "wisdow-teeth": "Dentes do siso",
  tongue: "Língua",
  cheek: "Bochecha",
  freckles: "Sardas",
  beard: "Barba",
  "face-dimple": "Covinhas de rosto",
  moustache: "Bigode",
  chin: "Queixo",
  jaw: "Mandíbula",
  body: "Corpo",
  neck: "Pescoço",
  "adams-apple": "Pomo de adão",
  nape: "Nuca",
  shoulder: "Ombro",
  armpits: "Axilas",
  chest: "Peito",
  nipple: "Mamilo",
  arm: "Braço",
  elbow: "Cotovelo",
  forearm: "Antebraço",
  wrist: "Pulso",
  fist: "Punho",
  hand: "Mão",
  palm: "Palma da mão",
  "thumb-finger": "Dedo polegar",
  "pointer-finger": "Dedo indicador",
  "middle-finger": "Dedo médio",
  "ring-finger": "Dedo anelar",
  "pinky-finger": "Dedo mindinho",
  knuckles: "Juntas",
  nails: "Unhas",
  breast: "Seio",
  waist: "Cintura",
  belly: "Barriga",
  bellybutton: "Umbigo",
  back: "Costas",
  "low-back": "Lombar",
  hip: "Quadril",
  buttocks: "Nádegas",
  groin: "Virilha",
  thighs: "Coxas",
  knee: "Joelho",
  calf: "Panturrilha",
  shin: "Canela",
  ankle: "Tornozelo",
  foot: "Pé",
  feet: "Pés",
  toe: "Dedo do pé",
  finger: "Dedo",
  heel: "Calcanhar",
  sole: "Sola do pé",
  brain: "Cérebro",
  pharynx: "Faringe",
  larynx: "Laringe",
  thyroid: "Tireóide",
  heart: "Coração",
  lang: "Pulmão",
  pancreas: "Pâncreas",
  liver: "Fígado",
  spleen: "Baço",
  ribs: "Costelas",
  kidney: "Rim",
  stomach: "Estômago",
  intestine: "Intestino",
  appendix: "Apêndice",
  bladder: "Bexiga",
  uterus: "Útero",
  skin: "Pele",
  muscle: "Músculo",
  bone: "Osso",
  skeleton: "Esqueleto",
  spine: "Espinha",
  blood: "Sangue",
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
                resultText.innerHTML = "IH!, VOCÊ ERROU!";
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