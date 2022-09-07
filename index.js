'use strict';

const CARDS = [
  {
    id: 'branch',
    src: './assets/img/cat1.png'
  },
  {
    id: 'commit',
    src: './assets/img/cat2.png',
  },
  {
    id: 'compare',
    src: './assets/img/cat3.png',
  },
  {
    id: 'fork',
    src: './assets/img/cat4.png',
  },
  {
    id: 'merge',
    src: './assets/img/cat5.png',
  },
  {
    id: 'request',
    src: './assets/img/cat6.png'
  },
  {
    id: 'branch',
    src: './assets/img/cat1.png'
  },
  {
    id: 'commit',
    src: './assets/img/cat2.png',
  },
  {
    id: 'compare',
    src: './assets/img/cat3.png',
  },
  {
    id: 'fork',
    src: './assets/img/cat4.png',
  },
  {
    id: 'merge',
    src: './assets/img/cat5.png',
  },
  {
    id: 'request',
    src: './assets/img/cat6.png'
  }  
];

const GAME_FIELD = document.querySelector('.game');
let hasFlipedCard = false;
let boardLocked = false;
let firstCard = null;
let secondCard = null;

function createCards (myCards) {  
  const cards = myCards
  .sort(() => 0.5 - Math.random())
  .map((card) => 
    `<div class="card" data-card="${card.id}">
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
  console.log('git is', target.dataset.card);

  if (target === firstCard) return

  if (!hasFlipedCard) {
    hasFlipedCard = true;
    firstCard = target;
  } else {
    hasFlipedCard = false;
    secondCard = target;

    compareDataset();
  }
}

const compareDataset = () => {
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
