const gemPuzzle = {
  elements: {
    main: null,
    info: null,
    field: null,
    puzzlesContainer: null,
    puzzles: null,
    time: null,
    moves: null,
    menu: null,
    menuButtons: [
      'Scores',
      'New game',
      'Field type',
      'Sound',
      'Pause',
      'Change Image',
    ],
    scoresInfo: null,
    empty: null,
    cells: [],
    soundsContainer: null,
    messageContent: null,
  },

  properties: {
    layout: '4*4',
    puzzlesNumber: 0,
    rowLength: null,
    cellSize: null,

    paused: false,
    soundOn: true,
    isCompleted: false,
    scoreShown: false,

    scores: [],

    timer: null,
    seconds: 1,
    minutes: 0,
    hours: 0,
    moves: 0,
  },

  layoutTypes: ['3*3', '4*4', '5*5', '6*6', '7*7', '8*8'],

  imagesPath: 'src/images',

  sounds: ['tink.wav', 'default-sound-2.mp3'],

  init() {
    // Create main elements, classes and DOM structure
    this.elements.main = document.createElement('main');
    this.elements.main.classList.add('puzzle-game');

    // Create block Info
    this.elements.info = document.createElement('section');
    this.elements.info.classList.add('info');

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('wrapper');

    const infoContent = document.createElement('div');
    infoContent.classList.add('info-content');

    this.elements.time = document.createElement('time');
    this.elements.time.classList.add('info-content__time');

    if (localStorage.getItem('seconds') === null) {
      this.elements.time.innerText = '00:00:00';
    } else {
      const seconds = gemPuzzle.addZero(localStorage.getItem('seconds'));
      const minutes = gemPuzzle.addZero(localStorage.getItem('minutes'));
      const hours = gemPuzzle.addZero(localStorage.getItem('hours'));
      this.elements.time.innerText = `${hours}:${minutes}:${seconds}`;
    }

    this.elements.moves = document.createElement('div');
    this.elements.moves.classList.add('info-content__moves');

    if (localStorage.getItem('moves') === null) {
      this.elements.moves.innerText = 'Moves: 0';
    } else {
      this.elements.moves.innerText = `Moves: ${localStorage.getItem('moves')}`;
    }

    document.body.appendChild(this.elements.main);
    this.elements.main.appendChild(this.elements.info);
    this.elements.info.appendChild(infoWrapper);
    infoWrapper.appendChild(infoContent);
    infoContent.appendChild(this.elements.time);
    infoContent.appendChild(this.elements.moves);

    // Create block Game
    const game = document.createElement('section');
    game.classList.add('game');

    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('wrapper');

    this.elements.field = document.createElement('section');
    this.elements.field.classList.add('play-field');

    this.elements.puzzlesContainer = document.createElement('div');
    this.elements.puzzlesContainer.classList.add('puzzles');
    this.elements.main.appendChild(game);
    game.appendChild(gameWrapper);
    gameWrapper.appendChild(this.elements.field);
    this.elements.field.appendChild(this.elements.puzzlesContainer);

    // Вставить новую функцию на случай перезагрузки приложения

    // localStorage.getItem('cells') === null ?
    this.elements.puzzlesContainer
      .appendChild(this.createPuzzles()); // ФУНКЦИЯ ПО ДОБАВЛЕНИЮ ПАЗЛОВ
    // this.elements.puzzlesContainer.appendChild(this._downloadPuzzles());
    // Загрузка сохранения

    // this.elements.puzzlesContainer.appendChild(
    //     localStorage.getItem('cells') === null ?
    //     this._createPuzzles() :
    //     this._downloadPuzzles()
    // )

    this.elements.puzzlesContainer.addEventListener('dragover', this.dragOver);
    this.elements.puzzlesContainer.addEventListener('dragenter', this.dragEnter);
    this.elements.puzzlesContainer.addEventListener('dragleave', this.dragLeave);
    this.elements.puzzlesContainer.addEventListener('drop', this.dragDrop);

    this.elements.puzzles = this.elements.puzzlesContainer.querySelectorAll(
      '.puzzles__item',
    );

    // Create block Show-scores
    this.elements.scoresInfo = document.createElement('section');
    this.elements.scoresInfo.classList.add('scores-info');

    const scoresWrapper = document.createElement('div');
    scoresWrapper.classList.add('wrapper');

    const scoresInfoContent = document.createElement('div');
    scoresInfoContent.classList.add('scores-info__content');
    scoresInfoContent.innerHTML = '<p>Best games</p>';

    gameWrapper.appendChild(this.elements.scoresInfo);
    this.elements.scoresInfo.appendChild(scoresWrapper);
    scoresWrapper.appendChild(scoresInfoContent);

    // Create block Menu
    this.elements.menu = document.createElement('section');
    this.elements.menu.classList.add('menu');

    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('wrapper');

    const navigation = document.createElement('nav');
    navigation.classList.add('navigation');

    this.elements.main.appendChild(this.elements.menu);
    this.elements.menu.appendChild(menuWrapper);
    menuWrapper.appendChild(navigation);
    navigation.appendChild(this.createButtons()); // ФУНКЦИЯ ПО ДОБАВЛЕНИЮ КНОПОК

    // Create block Message
    const message = document.createElement('section');
    message.classList.add('message', 'message--active');

    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('wrapper');

    this.elements.messageContent = document.createElement('div');
    this.elements.messageContent.classList.add('message__content');
    // const messageContent = document.createElement('div')
    // messageContent.classList.add('message__content')

    this.elements.main.appendChild(message);
    message.appendChild(messageWrapper);
    messageWrapper.appendChild(this.elements.messageContent);

    // Start new timer
    clearInterval(this.properties.timer);
    this.properties.timer = setInterval(this.showTime, 1000);

    // Create block Sounds
    this.elements.soundsContainer = document.createElement('div');
    this.elements.soundsContainer.classList.add('sounds');
    this.elements.soundsContainer.appendChild(this.createSounds());
    document.body.appendChild(this.elements.soundsContainer);
  },

  downloadPuzzles() {
    // console.log(JSON.parse(localStorage.getItem('cells')));
  },

  createPuzzles() {
    const fragment = document.createDocumentFragment();

    if (localStorage.getItem('layout') !== null) {
      this.properties.layout = localStorage.getItem('layout');
    }

    switch (this.properties.layout) {
      case '4*4':
        this.properties.puzzlesNumber = 4 * 4;
        break;
      case '5*5':
        this.properties.puzzlesNumber = 5 * 5;
        break;
      case '6*6':
        this.properties.puzzlesNumber = 6 * 6;
        break;
      case '7*7':
        this.properties.puzzlesNumber = 7 * 7;
        break;
      case '8*8':
        this.properties.puzzlesNumber = 8 * 8;
        break;
      default:
        this.properties.puzzlesNumber = 3 * 3;
        break;
    }

    this.properties.rowLength = Math.sqrt(this.properties.puzzlesNumber);

    const numbers = [...Array(this.properties.puzzlesNumber).keys()].sort(
      () => Math.random() - 0.5,
    );

    // Create new puzzle set
    for (let i = 0; i < this.properties.puzzlesNumber; i += 1) {
      const puzzleElement = document.createElement('div');
      this.properties.cellSize = 100 / this.properties.rowLength;

      if (numbers[i] === 0) {
        const left = i % this.properties.rowLength;
        const top = (i - left) / this.properties.rowLength;

        this.elements.empty = {
          value: numbers[i],
          left,
          top,
        };

        this.elements.cells.push(this.elements.empty);
      } else {
        puzzleElement.classList.add('puzzles__item', 'puzzles__item--filled');
        puzzleElement.setAttribute('draggable', 'true');
        const value = numbers[i];
        puzzleElement.innerText = value;

        const left = i % this.properties.rowLength;
        const top = (i - left) / this.properties.rowLength;

        puzzleElement.style = `top: ${top * this.properties.cellSize}%;
                     left: ${left * this.properties.cellSize}%;
                     width: ${this.properties.cellSize}%;
                     height: ${this.properties.cellSize}%;`;

        this.elements.cells.push({
          value,
          left,
          top,
          element: puzzleElement,
        });

        puzzleElement.addEventListener('dragstart', (e) => {
          this.dragStart(e);
        });
        puzzleElement.addEventListener('dragend', (e) => {
          this.dragEnd(e, left, top, i);
        });
        puzzleElement.addEventListener('click', (e) => {
          this.shiftPuzzle(e, left, top, i);
        });
      }

      fragment.appendChild(puzzleElement);
    }

    return fragment;
  },

  createButtons() {
    const fragment = document.createDocumentFragment();

    const createIconHtml = (iconName) => `<i class='material-icons'>${iconName}</i>`;

    this.elements.menuButtons.forEach((button) => {
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('navigation__button');

      switch (button) {
        case 'Scores':
          buttonElement.setAttribute('id', 'scores');
          buttonElement.innerText = 'Scores';
          buttonElement.addEventListener('click', () => {
            this.toggleScore();
            this.playSound('button');
          });
          break;
        case 'New game':
          buttonElement.setAttribute('id', 'new-game');
          buttonElement.innerText = 'New game';
          buttonElement.addEventListener('click', () => {
            this.pressNewGame();
            this.playSound('button');
          });
          break;
        case 'Field type':
          buttonElement.setAttribute('id', 'layout');
          buttonElement.innerText = this.properties.layout;
          buttonElement.addEventListener('click', (e) => {
            this.changeLayOut(e);
            this.pressNewGame();
            this.playSound('button');
          });
          break;
        case 'Sound':
          buttonElement.setAttribute('id', 'sound');
          buttonElement.innerHTML = createIconHtml('volume_up');
          buttonElement.addEventListener('click', (e) => {
            this.toggleSound(e);
            this.playSound('button');
          });
          break;
        case 'Pause':
          buttonElement.setAttribute('id', 'pause');
          buttonElement.innerHTML = createIconHtml('pause');
          buttonElement.addEventListener('click', () => {
            this.togglePause();
            this.playSound('button');
          });
          break;
        case 'Change Image':
          buttonElement.setAttribute('id', 'change-image');
          buttonElement.innerText = 'Change image';
          buttonElement.addEventListener('click', () => {
            this.changeImage();
            this.pressNewGame();
            this.playSound('button');
          });
          break;
        default:
          throw new Error('Ошибка');
      }

      fragment.appendChild(buttonElement);
    });

    return fragment;
  },

  startSavedGame() {},

  shiftPuzzle(e, left, top, index) {
    const cell = this.elements.cells[index];

    const leftDiff = Math.abs(this.elements.empty.left - cell.left);
    const topDiff = Math.abs(this.elements.empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
      return;
    }
    if (gemPuzzle.properties.isCompleted) {
      return;
    }

    cell.element.style = `
      top: ${this.elements.empty.top * this.properties.cellSize}%;
      left: ${this.elements.empty.left * this.properties.cellSize}%;
      width: ${this.properties.cellSize}%;
      height: ${this.properties.cellSize}%`;

    const emptyLeft = this.elements.empty.left;
    const emptyTop = this.elements.empty.top;
    this.elements.empty.left = cell.left;
    this.elements.empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    this.showMoves();
    this.playSound('puzzle');

    const isFinished = this
      .elements
      .cells
      .every(
        (currentCell) => currentCell.value
        === currentCell.top * this.properties.rowLength + currentCell.left,
      );

    if (isFinished) {
      gemPuzzle.properties.isCompleted = true;
      setTimeout(this.showCongrats, 600);
    }

    this.setItemLocalStorage();
  },

  showTime() {
    gemPuzzle.setItemLocalStorage();

    if (gemPuzzle.properties.isCompleted) {
      return;
    }

    if (gemPuzzle.properties.seconds === 60) {
      gemPuzzle.properties.seconds = 0;
      gemPuzzle.properties.minutes += 1;
    }
    if (gemPuzzle.properties.minutes === 60) {
      gemPuzzle.properties.minutes = 0;
      gemPuzzle.properties.hours += 1;
    }

    const time = document.querySelector('.info-content__time');
    const hours = gemPuzzle.addZero(gemPuzzle.properties.hours);
    const minutes = gemPuzzle.addZero(gemPuzzle.properties.minutes);
    const seconds = gemPuzzle.addZero(gemPuzzle.properties.seconds);

    time.innerText = `${hours}:${minutes}:${seconds}`;
    gemPuzzle.properties.seconds += 1;
  },

  addZero(n) {
    return Number(n) < 10 ? `0${n}` : n;
  },

  setItemLocalStorage() {
    // localStorage.clear()
    localStorage.setItem('hours', this.properties.hours);
    localStorage.setItem('minutes', this.properties.minutes);
    localStorage.setItem('seconds', this.properties.seconds);
    localStorage.setItem('moves', this.properties.moves);
    localStorage.setItem('layout', this.properties.layout);
    localStorage.setItem('cells', JSON.stringify(this.elements.cells));
    localStorage.setItem('soundOn', JSON.stringify(this.properties.soundOn));
    localStorage.setItem('isCompleted', JSON.stringify(this.properties.isCompleted));
    localStorage.setItem('paused', JSON.stringify(this.properties.paused));
    localStorage.setItem('message', JSON.stringify(this.elements.messageContent.innerText));
  },

  showMoves() {
    this.properties.moves += 1;
    this.elements.moves.innerText = `Moves: ${this.properties.moves}`;
    this.setItemLocalStorage();
  },

  toggleScore() {},

  pressNewGame() {
    this.properties.isCompleted = false;

    // Clear current puzzle set
    this.elements.cells = [];
    this.elements.puzzlesContainer.innerHTML = '';
    this.elements.puzzlesContainer.appendChild(this.createPuzzles());
    document.querySelector('.message__content').innerText = ' ';

    // Новый таймер
    this.properties.hours = 0;
    this.properties.minutes = 0;
    this.properties.seconds = 1;
    document.querySelector('.info-content__time').innerHTML = '00:00:00';
    clearInterval(this.properties.timer);
    this.properties.timer = setInterval(this.showTime, 1000);

    // Новый счетчик ходов
    this.properties.moves = 0;
    this.elements.moves.innerText = `Moves: ${this.properties.moves}`;
  },

  changeLayOut(e) {
    this.properties.isCompleted = false;
    document.querySelector('.message__content').innerText = ' ';

    // Change the button
    let layoutIndex = this.layoutTypes.indexOf(this.properties.layout);

    if (layoutIndex === this.layoutTypes.length - 1) {
      layoutIndex = 0;
    } else {
      layoutIndex += 1;
    }

    this.properties.layout = this.layoutTypes[layoutIndex];
    this.setItemLocalStorage(); // СОХРАНЯТЬ В ЛОКАЛ СТОР ТЕКУЩИЙ ЛЭЙАУТ
    e.target.innerText = this.properties.layout;

    // Change the layout
    this.elements.puzzlesContainer.innerHTML = '';
    this.elements.puzzlesContainer.appendChild(this.createPuzzles());
  },

  changeImage() {
    this.properties.isCompleted = false;
    document.querySelector('.message__content').innerText = ' ';
  },

  toggleSound(e) {
    this.properties.soundOn = !this.properties.soundOn;

    const buttonStatus = e.target.textContent;

    switch (buttonStatus) {
      case 'volume_off':
        e.currentTarget.innerHTML = '<i class="material-icons">volume_up</i>';
        break;
      default:
        // 'volume_up'
        e.currentTarget.innerHTML = '<i class="material-icons">volume_off</i>';
        break;
    }
  },

  playSound(input) {
    if (this.properties.soundOn === false) {
      return;
    }

    switch (input) {
      case 'puzzle': {
        const audioPuzzle = document.querySelector('.sound-0');
        audioPuzzle.currentTime = 0;
        audioPuzzle.play();
        break;
      }
      default: {
        // case 'button':
        const audioButton = document.querySelector('.sound-1');
        audioButton.currentTime = 0;
        audioButton.play();
        break;
      }
    }
  },

  togglePause() {},

  showCongrats() {
    const message = document.querySelector('.message__content');
    const time = document.querySelector('.info-content__time').innerHTML;
    const { moves } = gemPuzzle.properties;
    message.innerText = `Congratulations! You solved the puzzle in ${time} and ${moves} moves`;
  },

  dragStart(e) {
    setTimeout(() => {
      e.target.classList.add('puzzles__item--hide');
    }, 0);
  },

  dragEnd(e, left, top, index) {
    e.target.classList.remove('puzzles__item--hide');

    const cell = this.elements.cells[index];

    const leftDiff = Math.abs(this.elements.empty.left - cell.left);
    const topDiff = Math.abs(this.elements.empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
      return;
    }
    if (gemPuzzle.properties.isCompleted) {
      return;
    }

    cell.element.style = `
      top: ${this.elements.empty.top * this.properties.cellSize}%;
      left: ${this.elements.empty.left * this.properties.cellSize}%;
      width: ${this.properties.cellSize}%;
      height: ${this.properties.cellSize}%`;

    const emptyLeft = this.elements.empty.left;
    const emptyTop = this.elements.empty.top;
    this.elements.empty.left = cell.left;
    this.elements.empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    this.playSound('puzzle');
    this.showMoves();

    const isFinished = this
      .elements
      .cells
      .every((currentCell) => currentCell.value
       === currentCell.top * this.properties.rowLength + currentCell.left);

    if (isFinished) {
      gemPuzzle.properties.isCompleted = true;
      setTimeout(this.showCongrats, 600);
    }

    this.setItemLocalStorage();
  },

  dragOver(e) {
    e.preventDefault();
  },

  dragEnter(e) {
    e.preventDefault();
    this.classList.add('puzzles--hovered');
  },

  dragLeave() {
    this.classList.remove('puzzles--hovered');
  },

  dragDrop() {
    this.classList.remove('puzzles--hovered');
  },

  createSounds() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.sounds.length; i += 1) {
      const sound = document.createElement('audio');
      sound.classList.add(`sound-${i}`);
      sound.setAttribute('src', `src/sounds/${this.sounds[i]}`);
      fragment.appendChild(sound);
    }

    return fragment;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  gemPuzzle.init();
});
