'use strict';

const CARDS = [
  {
    number: 'cat1',
    src: './assets/img/cat1.png'
  },
  {
    number: 'cat2',
    src: './assets/img/cat2.png',
  },
  {
    number: 'cat3',
    src: './assets/img/cat3.png',
  },
  {
    number: 'cat4',
    src: './assets/img/cat4.png',
  },
  {
    number: 'cat5',
    src: './assets/img/cat5.png',
  },
  {
    number: 'cat6',
    src: './assets/img/cat6.png'
  }
];

const GAME_FIELD = document.querySelector('.game');
let hasFlipedCard = false;
let boardLocked = false;
let firstCard = null;
let secondCard = null;
let userCount = 0;

function createCards (myCards) {  
  const doubleCards = [...myCards, ...myCards];
  const cards = doubleCards
  .sort(() => 0.5 - Math.random())
  .map((card) => 
    `<div class="card" data-card="${card.number}">
        <img src="${card.src}" alt="" class="front">
        <img src="./assets/img/background.png" alt="" class="back">
      </div>`
  )
  .join('');

  GAME_FIELD.innerHTML = cards;
}

createCards(CARDS);

const GAME_CARDS = document.querySelectorAll('.card');

GAME_CARDS.forEach(card => {
  card.addEventListener("click", flipCard);  
});

function flipCard (e) {
  if (boardLocked) return

  const target = e.target.parentElement;
  target.classList.add('flip');  
  console.log('cat is', target.dataset.card);

  userCount++;  

  if (target === firstCard) return

  if (!hasFlipedCard) {
    hasFlipedCard = true;
    firstCard = target;
  } else {
    hasFlipedCard = false;
    secondCard = target;

    compareCardsDataset();
  }  
}

const compareCardsDataset = () => {
  if(firstCard.dataset.card === secondCard.dataset.card) {
    removeEvent(); 
    hideCards();    
  } else {
    resetCards();    
  }
};

const removeEvent = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

const hideCards = () => {  
  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.classList.add('hide');
    secondCard.classList.add('hide');
  }, 500);
  
};

const resetCards = () => {
  boardLocked = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      boardLocked = false;
    }, 500);
};
