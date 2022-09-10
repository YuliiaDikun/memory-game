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
const OVERLAY = document.querySelector('.overlay');
const MODAL = document.querySelector('#win');
const MODAL_CLOSE = document.querySelector('.modal__close');

let hasFlipedCard = false;
let boardLocked = true;
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
  GAME_FIELD.innerHTML = ``;
  GAME_FIELD.innerHTML = cards;
}

createCards(CARDS);

function openCards () {   
  const MY_CARDS = document.querySelectorAll('.card');
  MY_CARDS.forEach(card => {
    card.classList.add('flip');    
  });

  MY_CARDS.forEach((card, i) => {
    setTimeout(() => {    
    card.classList.remove('flip');    
    }, 500 * (i+1));

    setTimeout(() => {
      boardLocked = false;
    }, 6500);
  }); 
}

openCards();

function showModal () {
  OVERLAY.style.display = 'block';
  MODAL.style.display = 'block';
}

function closeModal () {
  OVERLAY.style.display = 'none';
  MODAL.style.display = 'none';
  setTimeout(() => {
    createCards(CARDS);
    openCards();        
  }, 300);
}

OVERLAY.addEventListener('click', closeModal);
MODAL_CLOSE.addEventListener('click', closeModal);

function flipCards ({target}) {  
  if (!target.closest('.card')) return 
  
  const selectedCard = target.parentNode;
  
  if (boardLocked) return
  
  selectedCard.classList.add('flip');    
  
  if (selectedCard === firstCard) return

  if (!hasFlipedCard) {
    hasFlipedCard = true;
    firstCard = selectedCard;
  } else {
    hasFlipedCard = false;
    secondCard = selectedCard;

    if (firstCard.dataset.card === secondCard.dataset.card) {
      checkedPairs();
    } else {
      restartTurn();                
    }    
  }  
  
}  

const checkedPairs = () => {
  firstCard.removeEventListener('click', flipCards);
  secondCard.removeEventListener('click', flipCards);
  
  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.classList.add('hide');
    secondCard.classList.add('hide');
    firstCard.style.pointerEvents = 'none';
    secondCard.style.pointerEvents = 'none';
    congratsWinner();    
  }, 500);         
};

const congratsWinner = () => {
  const HIDE_CARDS = document.querySelectorAll('div.card.hide');
    
  if (HIDE_CARDS.length === 12) {
    showModal ();                
  }
};

const restartTurn = () => {
  boardLocked = true;
  firstCard.removeEventListener('click', flipCards);
  secondCard.removeEventListener('click', flipCards);
  setTimeout(() => {
    
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    boardLocked = false;
  }, 500);
};

GAME_FIELD.addEventListener('click', flipCards); 
