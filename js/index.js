"use strict";
const CARDS = [
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
const GAME_FIELD = document.querySelector(".game");
const OVERLAY = document.querySelector(".overlay");
const MODAL = document.querySelector(".modal");
const MODAL_CLOSE = document.querySelector("[data-close]");
const spanEl = document.querySelector(".user_moves");
const TIMEOUT = 500;
let hasFlipedCard = false;
let boardLocked = false;
let firstCard;
let secondCard;
let score = 0;
const defaultSettings = () => {
    hasFlipedCard = false;
    boardLocked = false;
    firstCard = null;
    secondCard = null;
};
function createCards(myCards) {
    GAME_FIELD.innerHTML = ``;
    const doubleCards = [...myCards, ...myCards];
    const cards = doubleCards
        .sort(() => 0.5 - Math.random())
        .map((card) => `<div class="card" data-card="${card.number}">
        <img src="${card.src}" alt="" class="front">
        <img src="./assets/img/background.png" alt="" class="back">
      </div>`)
        .join("");
    GAME_FIELD.innerHTML = cards;
}
function openCards() {
    boardLocked = true;
    const MY_CARDS = document.querySelectorAll(".card");
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
OVERLAY.addEventListener("click", (e) => {
    const clickedElement = e.target;
    if (clickedElement === OVERLAY) {
        closeModal();
    }
});
MODAL_CLOSE.addEventListener("click", closeModal);
const restartTurn = () => {
    score += 1;
    boardLocked = true;
    setTimeout(() => {
        firstCard === null || firstCard === void 0 ? void 0 : firstCard.classList.remove("flip");
        secondCard === null || secondCard === void 0 ? void 0 : secondCard.classList.remove("flip");
        defaultSettings();
    }, TIMEOUT);
};
const checkedPairs = () => {
    score += 1;
    firstCard === null || firstCard === void 0 ? void 0 : firstCard.removeEventListener("click", flipCards);
    secondCard === null || secondCard === void 0 ? void 0 : secondCard.removeEventListener("click", flipCards);
    boardLocked = true;
    setTimeout(() => {
        firstCard === null || firstCard === void 0 ? void 0 : firstCard.classList.remove("flip");
        secondCard === null || secondCard === void 0 ? void 0 : secondCard.classList.remove("flip");
        firstCard === null || firstCard === void 0 ? void 0 : firstCard.classList.add("hide");
        secondCard === null || secondCard === void 0 ? void 0 : secondCard.classList.add("hide");
        if (firstCard !== null && secondCard !== null) {
            firstCard.style.pointerEvents = "none";
            secondCard.style.pointerEvents = "none";
        }
        defaultSettings();
        congratsWinner();
    }, TIMEOUT);
};
const congratsWinner = () => {
    const HIDE_CARDS = document.querySelectorAll("div.card.hide");
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
function flipCards(e) {
    const target = e.target;
    if (!(target === null || target === void 0 ? void 0 : target.closest(".card")) || boardLocked)
        return;
    const selectedCard = target.parentNode;
    selectedCard.classList.add("flip");
    if (selectedCard === firstCard)
        return;
    if (!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = selectedCard;
    }
    else {
        hasFlipedCard = false;
        secondCard = selectedCard;
        checkedWinner();
    }
}
createCards(CARDS);
openCards();
GAME_FIELD.addEventListener("click", flipCards);
//# sourceMappingURL=index.js.map