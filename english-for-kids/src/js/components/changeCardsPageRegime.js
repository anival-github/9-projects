import initStartGameBtn from './initStartGameBtn';

export default function changeCardsPageRegime(isRegimePlay) {
  const cardElements = document.querySelectorAll('.card');
  const cardsContentElements = document.querySelectorAll('.card__content');
  const cardsImageElements = document.querySelectorAll('.card__picture');
  const gameStatusElement = document.querySelector('.game-status');
  const cardsCategoriesContainer = document.querySelector('.cards-container_categories');
  const startGameBtn = document.querySelector('.start-game-btn');
  const scoreField = document.querySelector('.score');

  const isCategoriesVisible = !cardsCategoriesContainer.hasAttribute('hidden');

  if (isRegimePlay) {
    if (isCategoriesVisible) {
      return;
    }

    cardsContentElements.forEach((element) => {
      element.classList.add('card__content_invisible');
    });

    cardsImageElements.forEach((element) => {
      element.classList.add('card__picture_big');
      element.classList.remove('card__picture_small');
    });

    gameStatusElement.classList.remove('game-status_hidden');

    initStartGameBtn();
  } else {
    cardsContentElements.forEach((element) => {
      element.classList.remove('card__content_invisible');
    });

    cardElements.forEach((element) => {
      element.classList.remove('card_choosen');
    });

    startGameBtn.innerHTML = 'Start game';
    scoreField.innerHTML = '';

    cardsImageElements.forEach((element) => {
      element.classList.remove('card__picture_big');
      element.classList.add('card__picture_small');
    });

    gameStatusElement.classList.add('game-status_hidden');
  }
}
