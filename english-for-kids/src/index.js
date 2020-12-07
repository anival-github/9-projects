import './sass/style.scss';
import cardsData from './data/cards.data';
import createMenu from './js/components/createMenu';
import createCategoryPage from './js/components/createCategoryPage';
import changeCardsPageRegime from './js/components/changeCardsPageRegime';

const application = {
  pages: {
    cardsPage: null,
    categoryPage: null,
    statisticsPage: null,
  },

  elements: {
    regimeBtnElement: null,

    burgerBtnElement: null,
    menuElement: null,

    cardElement: null,
    voiceBtnElement: null,
    turnAroundBtnElement: null,

    startBtnElement: null,
    soundsContainerElement: null,
  },

  properties: {
    isGameStarted: false,
    isRegimePlay: false,
    isRegimeTrain: true,
  },

  cardCategories: cardsData[0],

  init() {
    createMenu(cardsData);
    createCategoryPage(cardsData);
    this.initRegimeToggler();
  },

  initRegimeToggler() {
    this.elements.regimeBtnElement = document.querySelector('.regime-toggler');
    this.properties.isRegimePlay = !this.elements.regimeBtnElement.checked;
    this.properties.isRegimeTrain = this.elements.regimeBtnElement.checked;

    this.elements.regimeBtnElement.addEventListener('click', () => {
      this.properties.isRegimePlay = !this.properties.isRegimePlay;
      this.properties.isRegimeTrain = !this.properties.isRegimeTrain;

      changeCardsPageRegime(this.properties.isRegimePlay);
    });
  },
};

document.addEventListener('DOMContentLoaded', () => {
  application.init();
});
