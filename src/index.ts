interface IObject {
  number: string;
  src: string;
}

interface ICards extends Array<IObject> {}

const CARDS: ICards = [
  {
    number: "cat1",
    src: "./assets/img/cat1.png",
  },
  {
    number: "cat2",
    src: "./assets/img/cat2.png",
  },
  {
    number: "cat3",
    src: "./assets/img/cat3.png",
  },
  {
    number: "cat4",
    src: "./assets/img/cat4.png",
  },
  {
    number: "cat5",
    src: "./assets/img/cat5.png",
  },
  {
    number: "cat6",
    src: "./assets/img/cat6.png",
  },
];

const GAME_FIELD = document.querySelector(".game") as HTMLElement;
const OVERLAY = document.querySelector(".overlay") as HTMLDivElement;
const MODAL = document.querySelector(".modal") as HTMLDivElement;
const MODAL_CLOSE = document.querySelector("[data-close]") as HTMLDivElement;
const spanEl = document.querySelector(".user_moves") as HTMLSpanElement;
const TIMEOUT = 500;

let hasFlipedCard: boolean = false;
let boardLocked = false;
let firstCard: HTMLElement | null;
let secondCard: HTMLElement | null;
let score: number = 0;

const defaultSettings = (): void => {
  hasFlipedCard = false;
  boardLocked = false;
  firstCard = null;
  secondCard = null;
};

function createCards(myCards: ICards): void {
  GAME_FIELD.innerHTML = ``;

  const doubleCards = [...myCards, ...myCards];
  const cards: string = doubleCards
    .sort(() => 0.5 - Math.random())
    .map(
      (card) =>
        `<div class="card" data-card="${card.number}">
        <img src="${card.src}" alt="" class="front">
        <img src="./assets/img/background.png" alt="" class="back">
      </div>`
    )
    .join("");

  GAME_FIELD.innerHTML = cards;
}

function openCards() {
  boardLocked = true;
  const MY_CARDS = document.querySelectorAll(
    ".card"
  ) as NodeListOf<HTMLElement>;
  MY_CARDS.forEach((card) => {
    card.classList.add("flip");
  });

  MY_CARDS.forEach((card, i) => {
    setTimeout(() => {
      card.classList.remove("flip");
    }, TIMEOUT * (i + 1));
  });

  setTimeout(() => {
    boardLocked = false;
  }, TIMEOUT * MY_CARDS.length);
}

function showModal() {
  OVERLAY.style.display = "block";
  MODAL.style.display = "block";
}

function closeModal() {
  OVERLAY.style.display = "none";
  MODAL.style.display = "none";
  setTimeout(() => {
    createCards(CARDS);
    openCards();
  }, 300);
}

OVERLAY.addEventListener("click", (e: Event) => {
  const clickedElement = e.target as HTMLElement;
  if (clickedElement === OVERLAY) {
    closeModal();
  }
});

MODAL_CLOSE.addEventListener("click", closeModal);

const restartTurn = () => {
  score += 1;
  boardLocked = true;
  setTimeout(() => {
    firstCard?.classList.remove("flip");
    secondCard?.classList.remove("flip");
    defaultSettings();
  }, TIMEOUT);
};

const checkedPairs = () => {
  score += 1;
  firstCard?.removeEventListener("click", flipCards);
  secondCard?.removeEventListener("click", flipCards);
  boardLocked = true;
  setTimeout(() => {
    firstCard?.classList.remove("flip");
    secondCard?.classList.remove("flip");
    firstCard?.classList.add("hide");
    secondCard?.classList.add("hide");

    if (firstCard !== null && secondCard !== null) {
      firstCard.style.pointerEvents = "none";
      secondCard.style.pointerEvents = "none";
    }
    defaultSettings();
    congratsWinner();
  }, TIMEOUT);
};

const congratsWinner = () => {
  const HIDE_CARDS = document.querySelectorAll(
    "div.card.hide"
  ) as NodeListOf<HTMLElement>;

  if (HIDE_CARDS.length === 12) {
    spanEl.innerText = String(score);
    showModal();
    console.log(score);
  }
};

const checkedWinner = () => {
  if (firstCard !== null && secondCard !== null) {
    firstCard.dataset.card === secondCard.dataset.card
      ? checkedPairs()
      : restartTurn();
  }
};

function flipCards(e: Event) {
  const target = e.target as HTMLElement;
  if (!target?.closest(".card") || boardLocked) return;

  const selectedCard = target.parentNode as HTMLElement;

  selectedCard.classList.add("flip");

  if (selectedCard === firstCard) return;

  if (!hasFlipedCard) {
    hasFlipedCard = true;
    firstCard = selectedCard;
  } else {
    hasFlipedCard = false;
    secondCard = selectedCard;

    checkedWinner();
  }
}

createCards(CARDS);

openCards();

GAME_FIELD.addEventListener("click", flipCards);
