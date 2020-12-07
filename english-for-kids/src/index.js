// import Card from './js/components/statistics';
import './sass/style.scss';
// import createElement from './js/utils/createElement';
import cardsData from './data/cards.data';
import createMenu from './js/components/createMenu';
import createCategoryPage from './js/components/createCategoryPage';
// import changeRegimeFunction from './js/components/changeRegime';
import changeCardsPageRegime from './js/components/changeCardsPageRegime';
// import createIconHtml from './js/utils/createIcon';
// import startGame from './js/components/startGame';

// const card1 = new Card('bird');

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
    // this.initStartGameBtn();
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

  // initStartGameBtn() {
  //   this.elements.startBtnElement = document.querySelector('.start-game-btn');

  //   this.elements.startBtnElement.addEventListener('click', () => {
  //     if (!this.properties.isGameStarted) {
  //       this.properties.isGameStarted = true;
  //       this.elements.startBtnElement.innerHTML = createIconHtml('replay');
  //       startGame();
  //     }
  //   });
  // },
};

document.addEventListener('DOMContentLoaded', () => {
  application.init();
});
