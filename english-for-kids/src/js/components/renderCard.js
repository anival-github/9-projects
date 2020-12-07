import createElement from '../utils/createElement';
import flipCard from './flipCard';

function renderFrontSide(cardElement, data) {
  const cardWrapper = cardElement.children[0];

  const frontSide = createElement('div', 'card__side is-active', null, cardWrapper);

  const picture = createElement('div', 'card__picture card__picture_small', null, frontSide);
  picture.style = `background-image: url(../../data/${data.image});`;

  const contentWrapper = createElement('div', 'card__content', null, frontSide);
  createElement('div', 'card__title card__title_eng', data.word, contentWrapper);

  const buttonsContainer = createElement('div', 'card__buttons', null, contentWrapper);

  const rotateButton = createElement('div', 'card__turn-over-button', null, buttonsContainer);
  createElement('img', null, null, rotateButton, [['src', './assets/images/arrow.svg'], ['alt', 'turn-over']]);

  rotateButton.addEventListener('click', () => {
    const isRegimeTrain = document.querySelector('.regime-toggler').checked;
    if (isRegimeTrain) {
      flipCard(cardElement);
    }
  });

  const voiceButton = createElement('div', 'card__voice-button', null, buttonsContainer);
  createElement('i', 'material-icons', 'record_voice_over', voiceButton);
}

function renderBackSide(cardElement, data) {
  const cardWrapper = cardElement.children[0];

  const backSide = createElement('div', 'card__side card__side--back', null, cardWrapper);

  const picture = createElement('div', 'card__picture card__picture_small', null, backSide);
  picture.style = `background-image: url(../../data/${data.image});`;

  const contentWrapper = createElement('div', 'card__content', null, backSide);
  createElement('div', 'card__title card__title_rus', data.translation, contentWrapper);

  return backSide;
}

export default function renderCard(container, data) {
  const cardElement = createElement('div', 'card card_descriptioned', null, container);

  createElement('div', 'card__wrapper', null, cardElement);

  renderFrontSide(cardElement, data);
  const backSide = renderBackSide(cardElement, data);

  cardElement.addEventListener('mouseleave', () => {
    const isRegimeTrain = document.querySelector('.regime-toggler').checked;
    if (backSide.classList.contains('is-active') && isRegimeTrain) {
      flipCard(cardElement);
    }
  });

  const soundElement = createElement('audio', 'card__audio', null, cardElement);
  soundElement.setAttribute('src', `../../data/${data.audioSrc}`);

  cardElement.addEventListener('click', () => {
    const isRegimeTrain = document.querySelector('.regime-toggler').checked;
    if (isRegimeTrain) {
      soundElement.currentTime = 0;
      soundElement.play();
    }
  });
}
