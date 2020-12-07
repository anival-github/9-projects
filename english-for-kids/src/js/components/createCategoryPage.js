import createElement from '../utils/createElement';
import renderCardsPage from './renderCardsPage';

export default function createCategoryPage(cardsData) {
  const cardCategoties = cardsData[0];

  const categoriesContainer = document.querySelector('.cards-container_categories');
  categoriesContainer.removeAttribute('hidden');

  const cardsContainerElement = document.querySelector('.cards-container_words');
  cardsContainerElement.setAttribute('hidden', 'hidden');

  const wasCategoriesPageCreated = categoriesContainer.hasChildNodes();

  if (wasCategoriesPageCreated) {
    return;
  }

  for (let i = 0; i < cardCategoties.length; i += 1) {
    const cardCategory = cardCategoties[i];
    const cardSet = cardsData[i + 1];

    const cardElement = createElement('div', 'card card_descriptioned', null, categoriesContainer);
    const cardPictureElement = createElement('div', 'card__picture card__picture_small', null, cardElement);
    cardPictureElement.style = `background-image: url(./data/${cardSet[1].image});`;
    const cardContentElement = createElement('div', 'card__content', null, cardElement);
    createElement('div', 'card__title', cardCategory, cardContentElement);
    createElement('div', 'card__insides', `${cardSet.length} cards`, cardContentElement);

    cardElement.addEventListener('click', () => {
      renderCardsPage(cardSet);
    });
  }
}
