const options = {
  airport: "Aeroporto",
  aquarium: "Aquário",
  "art-gallery": "Galeria de arte",
  avenue: "Avenida",
  bakery: "padaria",
  bank: "Banco",
  pub: "Bar",
  "barber-shop": "Barbearia",
  bookstall: "Banca de livros",
  bridge: "Ponte",
  bulding: "Prédio",
  "building-site": "Obra; Construção",
  "bus-station": "Estação de ônibus; Rodoviária",
  "bus-station": "Ponto de Ônibus",
  butchers: "Açougue",
  cathedral: "Catedral",
  "cemetery": "Cemitério",
  church: "Igreja",
  "city-hall": "Prefeitura",
  club: "Clube",
  corner: "Esquina",
  crosswalk: "Faixa de pedestre",
  district: "Distrito",
  downtown: "Centro da cidade",
  drugstore: "Farmácia",
  factory: "Fábrica",
  "fire-department": "Corpo de bombeiros",
  "gas-station": "Posto de gasolina",
  gym: "Academia",
  hairdressers: "Cabeleireiro",
  hospital: "Hospital",
  hotel: "Hotel",
  hostel: "Hostel; Albergue",
  house: "Casa",
  "jewelry-store": "Joalheria",
  "laundry-shop": "Lavanderia",
  mosque: "Mesquita",
  neighborhood: "Bairro",
  "law-court": "Corte; Tribunal",
  library: "Biblioteca",
  "lottery-retailer": "Lotérica",
  monument: "Monumento",
  "movie-theater": "Cinema",
  museum: "Museu",
  "newspaper-stand": "Banca de jornal",
  "night-club": "Casa noturna; Boate",
  orphanage: "Orfanato",
  outskirts: "Periferia",
  park: "Parque",
  "parking-lot": "Estacionamento",
  penitentiary: "Penitenciária",
  "police-station": "Delegacia de policia",
  port: "Porto",
  "post-office": "Correios",
  prison: "Prisão",
  restaurant: "Restaurante",
  School: "Escola",
  "mall-center": "Shopping center",
  "snack-bar": "Lanchonete",
  square: "Quadra",
  stadium: "Estádio",
  store: "Loja",
  street: "Rua",
  suburbs: "Subúrbio",
  "subway-station": "Estação de mêtro",
  supermarket: "Supermercado",
  synagogue: "Sinagoga",
  temple: "Templo",
  theater: "Teatro",
  river: "Rio",
  mountain: "Montanha",
  desert: "Deserto",
  university: "Universidade",
  zoo: "Zoológico",
 
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