const options = {
  architect: "Arquiteto",
  accountant: "Contador",
  actor: "Ator",
  acupunturist: "Acupunturista",
  administrator: "Administrador",
  anesthesiologist: "Anestesista",
  archeologist: "Arqueólogo",
  astronomer: "Astrônomo",
  athlete: "Atleta",
  babysitter: "Babá",
  baker: "Padeiro",
  barber: "Barbeiro",
  beautician: "Esteticista",
  biomedical: "Biomédico",
  blacksmith: "Ferreiro",
  bricklayer: "Pedreiro",
  butcher: "Açougueiro",
  carpenter: "Carpinteiro",
  cashier: "Caixa",
  chef: "Cozinheiro",
  "cattle-breeder": "Pecuarista",
  chemist: "Químico",
  choreographer: "Coreógrafo",
  cobbler: "Sapateiro",
  composer: "Compositor",
  comedian: "Comediante",
  "cultural-producer": "Produtor cultural",
  dancer: "Dançarino",
  dentist: "Dentista",
  dermatologist: "Dermatologista",
  designer: "Desenhista/Designer",
  detective: "Detetive",
  doctor: "Doutor",
  driver: "Motorista",
  endocrinologist: "Endocrinologista",
  engineer: "Engenheiro",
  farmer: "Fazendeiro",
  filmmaker: "Cineasta",
  fireman: "Bombeiro",
  fisherman: "Pescador",
  florist: "Florista",
  "football-player": "Jogador de futebol",
  "garbage-collector": "Lixeiro",
  gardener: "Jardineiro",
  gynaecologist: "Ginecologista",
  guide: "Guia",
  hairdresser: "Cabeleireiro",
  janitor: "Zelador",
  jeweler: "Joalheiro",
  journalist: "Jornalista",
  "international-relations-professional": "Profissional de relações internacionais",
  lawyer: "Advogado",
  librarian: "Bibliotecário",
  lifeguard: "Salva-vidas",
  linguist: "Linguista",
  magician: "Mágico",
  "make-up-artist": "Maquiador",
  manicure: "Manicure",
  mariner: "Marinheiro",
  mathematician: "Matemático",
  milkman: "Leiteiro",
  mechanical: "Mecânico",
  musician: "Músico",
  neurologist: "neurologista",
  nurse: "Enfermeiro",
  nutritionist: "Nutricionista",
  obstetrician: "Obstetra",
  "occupational-therapist": "Terapeuta ocupacional",
  oncologist: "Oncologista",
  orthopedist: "Ortopedista",
  painter: "Pintor",
  pharmacist: "Farmacêutico",
  photographer: "Fotógrafo",
  "physical-educator": "Educador físico",
  physiotherapist: "Fisioterapeuta",
  pilot: "Piloto",
  player: "Jogador",
  plumber: "Encanador",
  policeman: "Policial",
  politician: "Político",
  porter: "Porteiro",
  postman: "Carteiro",
  programmer: "Programador",
  psychiatrist: "Psiquiatra",
  psychologist: "Psicólogo",
  "public-relations": "Relações públicas",
  publicist: "Publicitário",
  receptionist: "Recepcionista",
  referee: "Árbitro",
  salesperson: "Vendedor",
  seamstress: "Costureira",
  secretary: "Secretária",
  seller: "Vendedor",
  singer: "Cantor",
  soldier: "Soldado",
  stewardess: "Aeromoça/Comissária de bordo",
  surgeon: "Cirurgião",
  "taxi-driver": "Taxista",
  teacher: "Professor",
  professor: "Professor",
  translator: "Tradutor",
  "travel-agent": "Agente de viagem",
  typist: "Digitador",
  urologist: "Urologista",
  waiter: "Garçom",
  writer: "Escritor",
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