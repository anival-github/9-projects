import initStartGameBtn from './initStartGameBtn';

export default function changeCardsPageRegime(isRegimePlay) {
  const cardsContentElements = document.querySelectorAll('.card__content');
  const cardsImageElements = document.querySelectorAll('.card__picture');
  const gameStatusElement = document.querySelector('.game-status');
  const cardsCategoriesContainer = document.querySelector('.cards-container_categories');
  const isCateboriesVisible = !cardsCategoriesContainer.hasAttribute('hidden');

  if (isRegimePlay) {
    if (isCateboriesVisible) {
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

    cardsImageElements.forEach((element) => {
      element.classList.remove('card__picture_big');
      element.classList.add('card__picture_small');
    });

    gameStatusElement.classList.add('game-status_hidden');
  }
}
