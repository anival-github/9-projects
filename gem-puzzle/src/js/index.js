function addLeadZero(n) {
  return Number(n) < 10 ? `0${n}` : n;
}

function createIconHtml(iconName) {
  return `<i class='material-icons'>${iconName}</i>`;
}

function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const gemPuzzle = {
  // DOM elements with different selectors
  elements: {
    main: null, // <main>
    info: null, // .info
    field: null, // .play-field
    puzzlesContainer: null, // .puzzles
    puzzles: null, // .puzzles__item
    time: null, // .info-content__time
    moves: null, // .info-content__moves
    menu: null, // .menu
    scoresInfo: null, // .scores-info
    soundsContainer: null, // .sounds
    messageContent: null, // .message__content
    canvas: null, // #canvas
  },

  properties: {
    cells: [], // Properties of all the puzzles, including value, top, left, DOM element
    empty: { // Properties of the empty cell within the field
      value: 0, // 0 for empty (other puzzles have it from 1 to 63)
      left: 0, // Position in a row -> 0, 1, 2 ... 7
      top: 0, // Position in a column -> 0, 1, 2 ... 7
    },
    cellSizeInPercent: null, // For CSS properties
    paused: false,
    soundOn: true,
    isCompleted: false,
    scoreShown: false,
    scores: [],
    timer: null, // Interval ID for the timer
    seconds: 1,
    minutes: 0,
    hours: 0,
    moves: 0,
  },

  layouts: {
    typesCount: 6,
    minValue: 3,
    maxValue: 8,
    currentValue: 4,
    properties: { // Generated each time for the particular currentValue
      puzzlesInRow: 4,
      puzzlesInColumn: 4,
      puzzlesCount: 16,
      visualInfo: '4*4',
    },
  },

  menuButtons: [ // All names of the buttons to be created
    'Scores',
    'New game',
    'Field type',
    'Sound',
    'Pause',
    'Change Image',
  ],

  images: {
    path: './src/images/',
    count: 150, // Number of images in application
  },

  sounds: ['tink.wav', 'default-sound-2.mp3'],

  // Create main elements, classes and DOM structure
  init() {
    this.elements.main = document.createElement('main');
    this.elements.main.classList.add('puzzle-game');
    document.body.appendChild(this.elements.main);

    this.createBlockCanvas();
    this.createBlockInfo();

    // Create block Game
    const game = document.createElement('section');
    game.classList.add('game');
    this.elements.main.appendChild(game);

    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('wrapper');
    game.appendChild(gameWrapper);

    this.elements.field = document.createElement('section');
    this.elements.field.classList.add('play-field');
    gameWrapper.appendChild(this.elements.field);

    this.createPuzzleContainer();
    this.createBlockScores(gameWrapper);
    this.createBlockMenu();
    this.createBlockMessage();

    // Start new timer
    clearInterval(this.properties.timer);
    this.properties.timer = setInterval(this.showTime, 1000);

    this.createBlockSounds();
  },

  createBlockCanvas() {
    this.elements.canvas = document.createElement('canvas');
    this.elements.canvas.setAttribute('id', 'canvas');
    this.elements.canvas.innerText = 'Canvas not supproted';
    this.elements.main.appendChild(this.elements.canvas);
  },

  createBlockInfo() {
    this.elements.info = document.createElement('section');
    this.elements.info.classList.add('info');
    this.elements.main.appendChild(this.elements.info);

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('wrapper');
    this.elements.info.appendChild(infoWrapper);

    const infoContent = document.createElement('div');
    infoContent.classList.add('info-content');
    infoWrapper.appendChild(infoContent);

    this.elements.time = document.createElement('time');
    this.elements.time.classList.add('info-content__time');
    infoContent.appendChild(this.elements.time);

    if (localStorage.getItem('seconds') === null) {
      this.elements.time.innerText = '00:00:00';
    } else {
      const seconds = addLeadZero(localStorage.getItem('seconds'));
      const minutes = addLeadZero(localStorage.getItem('minutes'));
      const hours = addLeadZero(localStorage.getItem('hours'));
      this.elements.time.innerText = `${hours}:${minutes}:${seconds}`;
    }

    this.elements.moves = document.createElement('div');
    this.elements.moves.classList.add('info-content__moves');
    infoContent.appendChild(this.elements.moves);

    if (localStorage.getItem('moves') === null) {
      this.elements.moves.innerText = 'Moves: 0';
    } else {
      this.elements.moves.innerText = `Moves: ${localStorage.getItem('moves')}`;
    }
  },

  createPuzzleContainer() {
    this.elements.puzzlesContainer = document.createElement('div');
    this.elements.puzzlesContainer.classList.add('puzzles');
    this.elements.field.appendChild(this.elements.puzzlesContainer);

    // Выражение для теста
    // this.elements.puzzlesContainer.appendChild(this.createPuzzles());

    this.elements.puzzlesContainer.appendChild(
      localStorage.getItem('cells') === null
        ? this.createPuzzles() // For the first start
        : this.loadStateFromLocalStorage(), // For the page reload
    );

    this.elements.puzzlesContainer
      .addEventListener('dragover', this.dragOver);
    this.elements.puzzlesContainer
      .addEventListener('dragenter', this.dragEnter);
    this.elements.puzzlesContainer
      .addEventListener('dragleave', this.dragLeave);
    this.elements.puzzlesContainer
      .addEventListener('drop', this.dragDrop);

    this.elements.puzzles = this.elements.puzzlesContainer
      .querySelectorAll('.puzzles__item');
  },

  createBlockScores(gameWrapper) {
    this.elements.scoresInfo = document.createElement('section');
    this.elements.scoresInfo.classList.add('scores-info');
    gameWrapper.appendChild(this.elements.scoresInfo);

    const scoresWrapper = document.createElement('div');
    scoresWrapper.classList.add('wrapper');
    this.elements.scoresInfo.appendChild(scoresWrapper);

    const scoresInfoContent = document.createElement('div');
    scoresInfoContent.classList.add('scores-info__content');
    scoresInfoContent.innerHTML = '<p>Best games</p>';
    scoresWrapper.appendChild(scoresInfoContent);
  },

  createBlockMenu() {
    this.elements.menu = document.createElement('section');
    this.elements.menu.classList.add('menu');
    this.elements.main.appendChild(this.elements.menu);

    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('wrapper');
    this.elements.menu.appendChild(menuWrapper);

    const navigation = document.createElement('nav');
    navigation.classList.add('navigation');
    menuWrapper.appendChild(navigation);
    navigation.appendChild(this.createButtons());
  },

  createButtons() {
    const fragment = document.createDocumentFragment();

    this.menuButtons.forEach((button) => {
      const buttonElement = document.createElement('button');
      buttonElement.classList.add('navigation__button');

      switch (button) {
        case 'Scores':
          buttonElement.innerText = 'Scores';
          this.createScoresBtn(buttonElement);
          break;
        case 'New game':
          buttonElement.innerText = 'New game';
          this.createNewGameBtn(buttonElement);
          break;
        case 'Field type':
          buttonElement.innerText = this.layouts.properties.visualInfo;
          this.createLayoutBtn(buttonElement);
          break;
        case 'Sound':
          buttonElement.innerHTML = createIconHtml('volume_up');
          this.createSoundBtn(buttonElement);
          break;
        case 'Pause':
          buttonElement.innerHTML = this.properties.paused
            ? createIconHtml('play_arrow')
            : createIconHtml('pause');
          this.createPauseBtn(buttonElement);
          break;
        case 'Change Image':
          buttonElement.innerText = 'Change image';
          this.createChangeImageBtn(buttonElement);
          break;
        default:
          throw new Error('Ошибка');
      }

      fragment.appendChild(buttonElement);
    });
    return fragment;
  },

  createBlockMessage() {
    const message = document.createElement('section');
    message.classList.add('message', 'message--active');
    this.elements.main.appendChild(message);

    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('wrapper');
    message.appendChild(messageWrapper);

    this.elements.messageContent = document.createElement('div');
    this.elements.messageContent.classList.add('message__content');
    messageWrapper.appendChild(this.elements.messageContent);
  },

  createBlockSounds() {
    this.elements.soundsContainer = document.createElement('div');
    this.elements.soundsContainer.classList.add('sounds');
    this.elements.soundsContainer.appendChild(this.createSounds());
    document.body.appendChild(this.elements.soundsContainer);
  },

  loadStateFromLocalStorage() {
    this.layouts.currentValue = Number(localStorage.getItem('layoutValue'));
    this.generateLayoutProperties();
    this.properties.paused = JSON.parse(localStorage.getItem('paused'));
    this.properties.cells = JSON.parse(localStorage.getItem('cells'));
    this.properties.empty = JSON.parse(localStorage.getItem('empty'));

    const fragment = document.createDocumentFragment();

    // Rebuild saved puzzle set
    for (let i = 0; i < this.properties.cells.length; i += 1) {
      const parentBlockWidthInPercent = 100;
      this.properties.cellSizeInPercent = parentBlockWidthInPercent
        / this.layouts.properties.puzzlesInRow;

      const puzzleElement = document.createElement('div');

      const {
        left, top, value, image,
      } = this.properties.cells[i];

      if (value !== 0) {
        puzzleElement.classList.add('puzzles__item', 'puzzles__item--filled');
        puzzleElement.setAttribute('draggable', 'true');

        puzzleElement.style = `
          top: ${top * this.properties.cellSizeInPercent}%;
          left: ${left * this.properties.cellSizeInPercent}%;
          width: ${this.properties.cellSizeInPercent}%;
          height: ${this.properties.cellSizeInPercent}%;`;

        this.properties.cells[i].element = puzzleElement;

        const img = document.createElement('img');
        img.setAttribute('src', image);
        img.style = 'width: 100%; height: 100%;';
        puzzleElement.appendChild(img);

        puzzleElement.addEventListener('dragstart', (e) => {
          this.dragStart(e);
        });
        puzzleElement.addEventListener('dragend', (e) => {
          this.dragEnd(e, i);
        });
        puzzleElement.addEventListener('click', () => {
          this.movePuzzle(i);
        });
      }

      fragment.appendChild(puzzleElement);
    }

    return fragment;
  },

  generateLayoutProperties() {
    this.layouts.properties.puzzlesInRow = this.layouts.currentValue;
    this.layouts.properties.puzzlesInColumn = this.layouts.currentValue;

    const row = this.layouts.properties.puzzlesInRow;
    const column = this.layouts.properties.puzzlesInColumn;

    this.layouts.properties.puzzlesCount = row * column;
    this.layouts.properties.visualInfo = `${row}*${column}`;
  },

  createPuzzles() {
    if (localStorage.getItem('layoutValue') !== null) {
      this.layouts.currentValue = Number(localStorage.getItem('layoutValue'));
    }

    this.generateLayoutProperties();

    // Create new puzzle set
    const imgNumber = Math.floor(1 + Math.random() * this.images.count);
    const numbers = [...Array(this.layouts.properties.puzzlesCount).keys()];
    // .sort(() => Math.random() - 0.5);

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this.layouts.properties.puzzlesCount; i += 1) {
      const puzzleElement = this.createPuzzleElement(i, numbers, imgNumber);
      fragment.appendChild(puzzleElement);
    }

    console.log(this.layouts.properties.puzzlesCount);
    this.mixPuzzles();

    return fragment;
  },

  mixPuzzles() {
    console.log(this.layouts.properties.puzzlesCount);
    for (let i = 0; i <= this.layouts.properties.puzzlesCount; i += 1) {
      const emptyValue = this.properties.empty.value;
      const rowLength = this.layouts.properties.puzzlesInRow;
      const { puzzlesCount } = this.layouts.properties;

      const vertical = 1;
      const horisontal = 0;
      const coordinateToBeChanged = randomInteger(0, 1) ? vertical : horisontal;

      const minus = -1;
      const plus = 1;
      const directionOfChanging = randomInteger(0, 1) ? plus : minus;

      let movedPuzzleValue;

      if (coordinateToBeChanged) {
        movedPuzzleValue = emptyValue + directionOfChanging * rowLength;

        if (movedPuzzleValue < 0 || movedPuzzleValue > puzzlesCount - 1) {
          movedPuzzleValue = emptyValue - directionOfChanging * rowLength;
        }
      }

      if (!coordinateToBeChanged) {
        movedPuzzleValue = emptyValue + directionOfChanging;

        if (movedPuzzleValue < 0 || movedPuzzleValue > puzzlesCount - 1) {
          movedPuzzleValue = emptyValue - directionOfChanging;
        }
      }

      const cell = this.properties.cells.find((element) => element.value === movedPuzzleValue);

      cell.element.style = `
         top: ${this.properties.empty.top * this.properties.cellSizeInPercent}%;
         left: ${this.properties.empty.left * this.properties.cellSizeInPercent}%;
         width: ${this.properties.cellSizeInPercent}%;
         height: ${this.properties.cellSizeInPercent}%;`;

      const emptyLeft = this.properties.empty.left;
      const emptyTop = this.properties.empty.top;
      this.properties.empty.left = cell.left;
      this.properties.empty.top = cell.top;
      cell.left = emptyLeft;
      cell.top = emptyTop;
    }

    this.setItemLocalStorage();
  },

  createPuzzleElement(i, numbers, imgNumber) {
    const parentBlockWidthInPercent = 100;
    this.properties.cellSizeInPercent = parentBlockWidthInPercent
      / this.layouts.properties.puzzlesInRow;
    const puzzleElement = document.createElement('div');

    if (numbers[i] === 0) {
      const value = numbers[i];
      const left = i % this.layouts.properties.puzzlesInRow;
      const top = (i - left) / this.layouts.properties.puzzlesInRow;

      this.properties.empty = {
        value, // 0 for empty
        left, // Assign horizontal coordinate (i.e. position in a row -> 0, 1, 2 ... 7)
        top, // Assign vertical coordinate (i.e. position in a column -> 0, 1, 2 ... 7)
      };

      this.properties.cells.push(this.properties.empty);
    } else {
      puzzleElement.classList.add('puzzles__item', 'puzzles__item--filled');
      puzzleElement.setAttribute('draggable', 'true');
      const value = numbers[i];
      puzzleElement.setAttribute('id', value);

      const left = i % this.layouts.properties.puzzlesInRow;
      const top = (i - left) / this.layouts.properties.puzzlesInRow;

      this
        .createImageSet(i, this.properties.cellSizeInPercent, imgNumber, puzzleElement, value);

      puzzleElement.style = `
        top: ${top * this.properties.cellSizeInPercent}%;
        left: ${left * this.properties.cellSizeInPercent}%;
        width: ${this.properties.cellSizeInPercent}%;
        height: ${this.properties.cellSizeInPercent}%;`;

      this.properties.cells.push({
        value, // From 1 to numbers.length - 1
        left, // Assign horizontal coordinate to the puzzle
        top, // Assign vertical coordinate to the puzzle
        element: puzzleElement, // Assign DOM element to the puzzle
      });

      puzzleElement.addEventListener('dragstart', (e) => {
        this.dragStart(e);
      });
      puzzleElement.addEventListener('dragend', (e) => {
        this.dragEnd(e, i);
      });
      puzzleElement.addEventListener('click', () => {
        this.movePuzzle(i);
      });
    }
    return puzzleElement;
  },

  createImageSet(index, cellSizeInPercent, imgNumber, puzzleElement, value) {
    const initialImageWidthPx = 900;
    const cellSizeComparingToParent = cellSizeInPercent / 100;
    const cellSizePx = initialImageWidthPx * cellSizeComparingToParent;

    const left = value % this.layouts.properties.puzzlesInRow;
    const top = (value - left) / this.layouts.properties.puzzlesInRow;
    const leftPx = left * cellSizePx;
    const topPx = top * cellSizePx;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style = `width: ${cellSizePx}px; height: ${cellSizePx}px; display: none`;

    const im = new Image(cellSizePx, cellSizePx);
    im.src = `${this.images.path}${imgNumber}.jpg`;

    im.onload = () => {
      canvas.width = im.naturalWidth;
      canvas.height = im.naturalHeight;
      ctx.drawImage(
        im,
        leftPx,
        topPx,
        cellSizePx,
        cellSizePx,
        0,
        0,
        100 * 9,
        100 * 9,
      );
      const imageURL = canvas
        .toDataURL('image/jpeg')
        .replace('image/png', 'image/octet-stream');
      const img = document.createElement('img');
      img.setAttribute('src', imageURL);
      img.style = 'width: 100%; height: 100%;';
      puzzleElement.appendChild(img);
      this.properties.cells[index].image = imageURL;
    };
  },

  createScoresBtn(buttonElement) {
    buttonElement.setAttribute('id', 'scores');
    buttonElement.addEventListener('click', () => {
      this.toggleScore();
      this.playSound('button');
    });
  },

  createNewGameBtn(buttonElement) {
    buttonElement.setAttribute('id', 'new-game');
    buttonElement.addEventListener('click', () => {
      this.pressNewGame();
      this.playSound('button');
    });
  },

  createLayoutBtn(buttonElement) {
    buttonElement.setAttribute('id', 'layout');
    buttonElement.addEventListener('click', (e) => {
      this.changeLayOut(e);
      this.pressNewGame();
      this.playSound('button');
    });
  },

  createSoundBtn(buttonElement) {
    buttonElement.setAttribute('id', 'sound');
    buttonElement.addEventListener('click', (e) => {
      this.toggleSound(e);
      this.playSound('button');
    });
  },

  createPauseBtn(buttonElement) {
    buttonElement.setAttribute('id', 'pause');
    buttonElement.addEventListener('click', (e) => {
      this.togglePause(e);
      this.playSound('button');
    });
  },

  createChangeImageBtn(buttonElement) {
    buttonElement.setAttribute('id', 'change-image');
    buttonElement.addEventListener('click', () => {
      this.changeImage();
      this.pressNewGame();
      this.playSound('button');
    });
  },

  showTime() {
    if (gemPuzzle.properties.isCompleted) return;
    if (gemPuzzle.properties.paused) return;

    if (localStorage.getItem('seconds') !== null) {
      gemPuzzle.properties.seconds = Number(localStorage.getItem('seconds'));
    }
    if (localStorage.getItem('minutes') !== null) {
      gemPuzzle.properties.minutes = Number(localStorage.getItem('minutes'));
    }
    if (localStorage.getItem('hours') !== null) {
      gemPuzzle.properties.hours = Number(localStorage.getItem('hours'));
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
    const hours = addLeadZero(gemPuzzle.properties.hours);
    const minutes = addLeadZero(gemPuzzle.properties.minutes);
    const seconds = addLeadZero(gemPuzzle.properties.seconds);

    time.innerText = `${hours}:${minutes}:${seconds}`;
    gemPuzzle.properties.seconds += 1;

    localStorage.setItem('hours', gemPuzzle.properties.hours);
    localStorage.setItem('minutes', gemPuzzle.properties.minutes);
    localStorage.setItem('seconds', gemPuzzle.properties.seconds);
  },

  setItemLocalStorage() {
    localStorage.setItem('layoutValue', this.layouts.currentValue);
    localStorage.setItem('cells', JSON.stringify(this.properties.cells));
    localStorage.setItem('empty', JSON.stringify(this.properties.empty));
    localStorage.setItem('soundOn', JSON.stringify(this.properties.soundOn));
    localStorage.setItem('isCompleted', JSON.stringify(this.properties.isCompleted));
    localStorage.setItem('paused', JSON.stringify(this.properties.paused));
    localStorage.setItem('message', JSON.stringify(this.elements.messageContent.innerText));
  },

  showMoves() {
    if (localStorage.getItem('moves') !== null) {
      this.properties.moves = Number(localStorage.getItem('moves'));
    }

    this.properties.moves += 1;
    this.elements.moves.innerText = `Moves: ${this.properties.moves}`;
    localStorage.setItem('moves', this.properties.moves);
  },

  toggleScore() {},

  pressNewGame() {
    this.properties.isCompleted = false;
    this.properties.paused = false;

    // Clear current puzzle set
    this.properties.cells = [];
    this.elements.puzzlesContainer.innerHTML = '';
    this.elements.puzzlesContainer.appendChild(this.createPuzzles());
    document.querySelector('.message__content').innerText = ' ';

    // New timer
    this.properties.hours = 0;
    this.properties.minutes = 0;
    this.properties.seconds = 1;
    document.querySelector('.info-content__time').innerHTML = '00:00:00';
    clearInterval(this.properties.timer);
    this.properties.timer = setInterval(this.showTime, 1000);

    // New moves counter
    this.properties.moves = 0;
    this.elements.moves.innerText = `Moves: ${this.properties.moves}`;

    this.clearLocalStorage();
  },

  clearLocalStorage() {
    // Only soundOn remains in local storage
    localStorage.removeItem('moves');
    localStorage.removeItem('hours');
    localStorage.removeItem('minutes');
    localStorage.removeItem('seconds');
    localStorage.removeItem('layoutValue');
    localStorage.removeItem('cells');
    localStorage.removeItem('empty');
    localStorage.removeItem('isCompleted');
    localStorage.removeItem('paused');
    localStorage.removeItem('message');
  },

  changeLayOut(e) {
    this.properties.isCompleted = false;
    document.querySelector('.message__content').innerText = ' ';

    // Change the button
    if (this.layouts.currentValue === this.layouts.maxValue) {
      this.layouts.currentValue = this.layouts.minValue;
    } else {
      this.layouts.currentValue += 1;
    }

    this.generateLayoutProperties();
    this.setItemLocalStorage();
    e.target.innerText = this.layouts.properties.visualInfo;

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

    if (this.properties.soundOn === true) {
      e.currentTarget.innerHTML = createIconHtml('volume_up');
    } else {
      e.currentTarget.innerHTML = createIconHtml('volume_off');
    }
  },

  playSound(input) {
    if (this.properties.soundOn === false) return;

    let soundSelected;

    if (input === 'puzzle') {
      soundSelected = document.querySelector('.sound-0');
    } else { // input === 'button'
      soundSelected = document.querySelector('.sound-1');
    }

    soundSelected.currentTime = 0;
    soundSelected.play();
  },

  togglePause(e) {
    this.properties.paused = !this.properties.paused;

    if (this.properties.paused) {
      e.currentTarget.innerHTML = createIconHtml('play_arrow');
    } else {
      e.currentTarget.innerHTML = createIconHtml('pause');
    }
  },

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

  movePuzzle(index) {
    const cell = this.properties.cells[index];

    // Check whether the puzzle clicked (dragged) is near the empty puzzle
    const leftDiff = Math.abs(this.properties.empty.left - cell.left);
    const topDiff = Math.abs(this.properties.empty.top - cell.top);

    if (leftDiff + topDiff > 1) return; // If puzzle is't near the empty one -> do nothing
    if (gemPuzzle.properties.isCompleted) return; // If the game is completed -> do nothing
    if (this.properties.paused) return;

    cell.element.style = `
      top: ${this.properties.empty.top * this.properties.cellSizeInPercent}%;
      left: ${this.properties.empty.left * this.properties.cellSizeInPercent}%;
      width: ${this.properties.cellSizeInPercent}%;
      height: ${this.properties.cellSizeInPercent}%;`;

    const emptyLeft = this.properties.empty.left;
    const emptyTop = this.properties.empty.top;
    this.properties.empty.left = cell.left;
    this.properties.empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    this.showMoves();
    this.playSound('puzzle');

    const isFinished = this.properties.cells
      .every((currentCell) => currentCell.value
        === currentCell.top
        * this.layouts.properties.puzzlesInRow
        + currentCell.left);

    if (isFinished) {
      gemPuzzle.properties.isCompleted = true;
      setTimeout(this.showCongrats, 600);
    }

    this.setItemLocalStorage();
  },

  dragEnd(e, index) {
    e.target.classList.remove('puzzles__item--hide');
    this.movePuzzle(index);
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
