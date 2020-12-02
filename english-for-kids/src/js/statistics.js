export default class Card {
  constructor(word) {
    this.word = word;
    this.counter = 1;
    this.showCounterState = function () {
      console.log(this.counter);
    };
  }
}

console.log('script has been created here from statistics.js');
