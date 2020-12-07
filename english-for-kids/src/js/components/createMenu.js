import createElement from '../utils/createElement';
import renderCardsPage from './renderCardsPage';
import renderCategoryPage from './createCategoryPage';
import hideMenu from './hideMenu';

export default function createMenu(cardsData) {
  const cardCategoties = cardsData[0];

  for (let i = 0; i < cardCategoties.length; i += 1) {
    const category = cardCategoties[i];
    const cardSet = cardsData[i + 1];

    const menuListElement = document.querySelector('.menu__list');
    const menuItemElement = createElement('li', 'menu__item', undefined, menuListElement);
    createElement('a', 'menu__link', category, menuItemElement);

    menuItemElement.addEventListener('click', () => {
      renderCardsPage(cardSet);
      hideMenu();
    });
  }

  const menuItemMainPageElement = document.querySelector('.menu__link_main-page');
  menuItemMainPageElement.addEventListener('click', () => {
    renderCategoryPage(cardsData);
    hideMenu();
  });
}
