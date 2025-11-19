const cardArray = [
   {
        name: "cheeseburguer",
        img: "cheeseburger.png",
   },
   {
        name: "fries",
        img: "fries.png",
   },
   {
        name: "hotdog",
        img: "hotdog.png",
   },
   {
        name: "ice-cream",
        img: "ice-cream.png",
   },
   {
        name: "milkshake",
        img: "milkshake.png",
   },
   {
        name: "pizza",
        img: "pizza.png",
   },
    {
        name: "cheeseburguer",
        img: "cheeseburger.png",
   },
   {
        name: "fries",
        img: "fries.png",
   },
   {
        name: "hotdog",
        img: "hotdog.png",
   },
   {
        name: "ice-cream",
        img: "ice-cream.png",
   },
   {
        name: "milkshake",
        img: "milkshake.png",
   },
   {
        name: "pizza",
        img: "pizza.png",
   }
];

// BARALHAR ORDEM DO ARRAY
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const imgFolder = "images/";
const imgCover = "cover.png";
const imgWhite = "white.png";

let cardsChosen = [];
let cardsWon = [];
let timeStart, timeEnd;

function createBoard(){
    cardArray.forEach((value, i) => {
        const card = document.createElement("img");
        card.src = imgFolder + imgCover;
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        gridDisplay.appendChild(card);
      
    });
}

function flipCard() {
    if (timeStart == undefined) timeStart = Date.now();
    const cardId = this.dataset.id;
    this.src = imgFolder + cardArray[cardId].img;
    cardsChosen.push(this);
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
        
    }
}

function checkMatch() {
    const firstId = cardsChosen[0].dataset.id;
    const secondtId = cardsChosen[1].dataset.id;
    console.log(cardArray[firstId].name, cardArray[secondtId].name);

        
    if (firstId === secondtId) {

        cardsChosen[0].src = imgFolder + imgCover;
    
    
    } else if (cardArray[firstId].name === cardArray[secondtId].name) {
            
            cardsChosen[0].src = cardsChosen[1].src = imgFolder + imgWhite;
            cardsChosen[0].removeEventListener("click", flipCard);
            cardsChosen[1].removeEventListener("click", flipCard);
            cardsWon.push(cardsChosen);
        } else {
            
            cardsChosen[0].src = cardsChosen[1].src = imgFolder + imgCover;
            
        }

        cardsChosen = [];

        if (cardsWon.length === cardArray.length / 2) {
            timeEnd = Date.now();
            const timeTotal = Math.floor((timeEnd - timeStart) / 1000);
            resultDisplay.innerHTML = `Year!! Ganhaste em ${timeTotal} segundos`;
        } else {
            resultDisplay.innerHTML = cardsWon.length;
        }
}


createBoard();