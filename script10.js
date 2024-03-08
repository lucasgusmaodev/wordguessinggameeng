const options = {
  vegetables: "Legumes e Verduras",
  beet: "Beterraba",
  broccoli: "Brócolis",
  cabbage: "Repolho",
  carrot: "Cenoura",
  cauliflower: "Couve-flor",
  chayote: "Chuchu",
  chickpeas: "Gão-de-bico",
  corn: "Milho",
  collards: "Couve",
  cucumber: "Pepino",
  eggplant: "Beringela",
  "green-beans": "Vagem",
  lettuce: "Alface",
  pepper: "Pimentão",
  potato: "Batata",
  pumpkin: "Abóbora/Moranga",
  salad: "Salada",
  tomato: "Tomate",
  meat: "Carnes",
  barbecue: "Churrasco",
  "ground-beef": "Carne moída",
  hamburguer: "Hambúrguer",
  meatball: "Almôndega",
  "rib-cuts": "Costela",
  steak: "Bife",
  "chicken-breast": "Peito de frango",
  "chicken-legs": "Coxas de frango",
  "chicken-wings": "Asinhas de frango",
  "roast-chicken": "Frango assado",
  "pork-chops": "Bisteca de porco",
  sausage: "Linguiça",
  "grilled-fish": "Peixe grelhado",
  seafood: "Frutos do mar",
  shrimp: "Camarão",
  bread: "Pão",
  beans: "Feijão",
  "fried-egg": "Ovo frito",
  "french-fries": "Batata frita",
  omelet: "Omelete",
  "mashed-potatoes": "Purê de batatas",
  rice: "Arroz",
  "scrambled-eggs": "Ovos mexidos",
  pasta: "Massas",
  cannelloni: "Canelone",
  gnocci: "Nhoque",
  lasagna: "Lasanha",
  pasta: "Macarrão",
  noodles: "Macarrão instantâneo",
  pizza: "Pizza",
  spaguetti: "Espaguete",
  taglierini: "Talharim",
  cake: "Bolo",
  chocolates: "Bombons",
  cookies: "Biscoitos",
  fruit: "Fruta",
  "fruit-salad": "Salada de frutas",
  "ice-cream": "Sorvete",
  jello: "Gelatina",
  popsicle: "Picolé",
  coffee: "Café",
  milk: "Leite",
  juice: "Suco",
  toast: "Torrada",
  pie: "Torta",
  cheese: "Queijo",
  ham: "Presunto",
  butter: "Manteiga",
  yogurt: "Iogurte",
  muesli: "Granola",
  soda: "Refrigerante",
  sandwich: "Sanduíche",
  soup: "Sopa",
  "brazilian-cheese-bread": "Pão de queijo",
  pancake: "Panqueca",
  oil: "Azeite/Ôleo",
  cappuccino: "Cappuccino",
  tea: "Chá",
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
                resultText.innerHTML = "IH! VOCÊ PERDEU!";
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