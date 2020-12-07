import createIconHtml from '../utils/createIcon';
import createElement from '../utils/createElement';

const bodyElement = document.querySelector('body');

const soundCorrectElement = createElement('audio', 'audio_correct', null, bodyElement);
soundCorrectElement.setAttribute('src', './assets/audioComments/correct.mp3');

const soundErrorElement = createElement('audio', 'audio_error', null, bodyElement);
soundErrorElement.setAttribute('src', './assets/audioComments/error.mp3');

function startGame(audioSetMixed, audioElementIndex, cardElements) {
  console.log(cardElements);
  const audioCardElement = audioSetMixed[audioElementIndex].parentNode;

  const audioElement = audioSetMixed[audioElementIndex];
  audioElement.play();

  // eslint-disable-next-line consistent-return
  function listenerFunction(element) {
    const clickedElement = element.currentTarget;

    if (clickedElement === audioCardElement) {
      console.log('correct!');
      soundCorrectElement.play();
      clickedElement.classList.add('card_choosen');

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
    } else {
      console.log('try harder!');
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

  const cardsContainer = document.querySelector('.cards-container_words');
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
