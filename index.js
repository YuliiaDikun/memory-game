'use strict';

const CARDS = [
  {
    id: 'branch',
    src: './assets/img/code-branch-solid.svg'
  },
  {
    id: 'commit',
    src: './assets/img/code-commit-solid.svg',
  },
  {
    id: 'compare',
    src: './assets/img/code-compare-solid.svg',
  },
  {
    id: 'fork',
    src: './assets/img/code-fork-solid.svg',
  },
  {
    id: 'merge',
    src: './assets/img/code-merge-solid.svg',
  },
  {
    id: 'request',
    src: './assets/img/code-pull-request-solid.svg'}
];

const GAME_FIELD = document.querySelector('.game');

function createCards (myCards) {
  const cards = myCards
  .sort(() => 0.5 - Math.random())
  .map((card) => 
    `<div class="card">
        <img src="${card.src}" id ="${card.id}" alt="" class="front">
        <img src="./assets/img/background.png" alt="" class="back">
      </div>`
  )
  .join('');
  GAME_FIELD.innerHTML = cards;
}
createCards(CARDS);



