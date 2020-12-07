// import renderCategoryPage from './createCategoryPage';
// import cardsData from '../../data/cards.data';

const cardsContainer = document.querySelector('.cards-container_words');
const categoriesContainer = document.querySelector('.cards-container_categories');
const placeForSmiles = document.querySelector('.score');
const resultsElement = document.querySelector('.results');
const resultsHappySmileElement = document.querySelector('.results__happy-smile');
const resultsSadSmileElement = document.querySelector('.results__sad-smile');
const finalScoreElement = document.querySelector('.results__final-score');
const categoriesCards = categoriesContainer.children;

function hideResults() {
  resultsElement.classList.add('hidden');
  finalScoreElement.classList.add('hidden');

  if (!resultsSadSmileElement.classList.contains('hidden')) {
    resultsSadSmileElement.classList.add('hidden');
  }
  if (!resultsHappySmileElement.classList.contains('hidden')) {
    resultsHappySmileElement.classList.add('hidden');
  }

  categoriesContainer.removeAttribute('hidden');

  Array.from(categoriesCards).forEach((element) => {
    const childPictureElement = element.firstChild;
    childPictureElement.classList.remove('card__picture_big');
    childPictureElement.classList.add('card__picture_small');

    const childContentElement = element.lastChild;
    childContentElement.classList.remove('card__content_invisible');
  });
}

export default function showResults(sadSmilesCounter) {
  resultsElement.classList.remove('hidden');
  finalScoreElement.classList.remove('hidden');
  cardsContainer.classList.add('hidden');
  placeForSmiles.innerHTML = '';

  if (sadSmilesCounter > 0) {
    resultsSadSmileElement.classList.remove('hidden');
    finalScoreElement.innerHTML = `Sorry, there were ${sadSmilesCounter} mistakes. Try harder!`;
  } else {
    resultsHappySmileElement.classList.remove('hidden');
    finalScoreElement.innerHTML = 'Exelent! There were no mistakes!';
  }

  setTimeout(() => {
    hideResults();
  }, 2000);
}
