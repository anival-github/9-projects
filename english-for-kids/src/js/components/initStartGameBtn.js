import createIconHtml from '../utils/createIcon';
import createElement from '../utils/createElement';
import showResults from './showResults';

const bodyElement = document.querySelector('body');
const cardsContainer = document.querySelector('.cards-container_words');
const placeForSmiles = document.querySelector('.score');

const soundCorrectElement = createElement('audio', 'audio_correct', null, bodyElement);
soundCorrectElement.setAttribute('src', './assets/audioComments/correct.mp3');

const soundErrorElement = createElement('audio', 'audio_error', null, bodyElement);
soundErrorElement.setAttribute('src', './assets/audioComments/error.mp3');

let happySmilesCounter = 0;
let sadSmilesCounter = 0;

function startGame(audioSetMixed, audioElementIndex, cardElements) {
  const audioCardElement = audioSetMixed[audioElementIndex].parentNode;

  const audioElement = audioSetMixed[audioElementIndex];
  audioElement.play();

  // eslint-disable-next-line consistent-return
  function listenerFunction(element) {
    const clickedElement = element.currentTarget;

    if (clickedElement === audioCardElement) {
      console.log('correct!');
      // eslint-disable-next-line no-unused-vars
      happySmilesCounter += 1;
      soundCorrectElement.play();
      clickedElement.classList.add('card_choosen');
      createElement('img', 'smile_mini', null, placeForSmiles, [['src', './assets/images/happy-smile.png']]);
      cardElements.forEach((element1) => {
        element1.removeEventListener('click', listenerFunction);
      });

      if (audioElementIndex > 0) {
        return setTimeout(() => {
          startGame(
            audioSetMixed,
            audioElementIndex - 1,
            cardElements.filter((item) => item !== clickedElement),
          );
        }, 1500);
      }
      if (audioElementIndex === 0) {
        showResults(sadSmilesCounter);
      }
    } else {
      console.log('try harder!');
      sadSmilesCounter += 1;
      createElement('img', 'smile_mini', null, placeForSmiles, [['src', './assets/images/sad-smile.png']]);
      soundErrorElement.play();
    }
  }

  cardElements.forEach((element) => {
    element.addEventListener('click', listenerFunction);
  });
}

export default function initStartGameBtn() {
  const startBtnElement = document.querySelector('.start-game-btn');

  const wordsAudioElements = document.querySelectorAll('.card__audio');
  const audioSetMixed = Array.from(wordsAudioElements).sort(() => Math.random() - 0.5);

  const cardElements = Array.from(cardsContainer.children);
  let isGameStarted = false;

  startBtnElement.addEventListener('click', () => {
    if (!isGameStarted) {
      isGameStarted = true;
      startBtnElement.innerHTML = createIconHtml('replay');

      startGame(audioSetMixed, audioSetMixed.length - 1, cardElements);
    }
  });
}
