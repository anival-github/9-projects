const cardTransitionTime = 500;

let switching = false;

export default function flipCard(cardElement) {
  if (switching) return false;

  switching = true;

  cardElement.classList.toggle('is-switched');

  window.setTimeout(() => {
    cardElement.children[0].children[0].classList.toggle('is-active');
    cardElement.children[0].children[1].classList.toggle('is-active');
    switching = false;
  }, cardTransitionTime / 2);

  return true;
}
