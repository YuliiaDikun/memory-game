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

function flipCard ({target}) {

  const selectedCard = target.parentNode;
  console.log('selected card', selectedCard);
    
    if (boardLocked || selectedCard === firstCard) return

    
    selectedCard.classList.add('flip');  
    console.log('cat is', selectedCard.dataset.card);
    
    userCount++;  

    // const allHideCards = document.querySelectorAll('.hide');
    //     console.log(allHideCards);      
    // if (allHideCards.length === 12) {
    //   setTimeout( () => {
    //     createCards(CARDS);
    //   }, 500);
    // } 

    if (!hasFlipedCard) {
      hasFlipedCard = true;
      firstCard = selectedCard;
    } else {
      hasFlipedCard = false;
      secondCard = selectedCard;

      if (firstCard.dataset.card === secondCard.dataset.card) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        setTimeout( () => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          firstCard.classList.add('hide');
          secondCard.classList.add('hide');
        }, 500);    
      } else {
        boardLocked = true;

        setTimeout(() => {
          firstCard.removeEventListener("click", flipCard);
          secondCard.removeEventListener("click", flipCard);
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          boardLocked = false;
        }, 500);        
      }    
    }  
  }  


GAME_FIELD.addEventListener("click", flipCard);  

