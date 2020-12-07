import renderCard from './renderCard';
import changeCardsPageRegime from './changeCardsPageRegime';

const categoriesContainer = document.querySelector('.cards-container_categories');
const cardsContainerElement = document.querySelector('.cards-container_words');
const regimeBtnElement = document.querySelector('.regime-toggler');

export default function renderCardsPage(cardSet) {
  categoriesContainer.setAttribute('hidden', 'hidden');
  cardsContainerElement.removeAttribute('hidden', 'hidden');
  cardsContainerElement.innerHTML = '';

  for (let i = 0; i < cardSet.length; i += 1) {
    const cardItemData = cardSet[i];

    renderCard(cardsContainerElement, cardItemData);
  }

  const isRegimePlay = !regimeBtnElement.checked;
  if (isRegimePlay) {
    changeCardsPageRegime(isRegimePlay);
  }
}
