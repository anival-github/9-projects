/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("const gemPuzzle = {\n  elements: {\n    main: null,\n    info: null,\n    field: null,\n    puzzlesContainer: null,\n    puzzles: null,\n    time: null,\n    moves: null,\n    menu: null,\n    menuButtons: [\n      'Scores',\n      'New game',\n      'Field type',\n      'Sound',\n      'Pause',\n      'Change Image',\n    ],\n    scoresInfo: null,\n    empty: null,\n    cells: [],\n    soundsContainer: null,\n    messageContent: null,\n    canvas: null,\n  },\n\n  properties: {\n    layout: '4*4',\n    puzzlesNumber: 0,\n    rowLength: null,\n    cellSize: null,\n\n    paused: false,\n    soundOn: true,\n    isCompleted: false,\n    scoreShown: false,\n\n    scores: [],\n\n    timer: null,\n    seconds: 1,\n    minutes: 0,\n    hours: 0,\n    moves: 0,\n  },\n\n  layoutTypes: ['3*3', '4*4', '5*5', '6*6', '7*7', '8*8'],\n\n  imagesPath: 'src/images',\n\n  sounds: ['tink.wav', 'default-sound-2.mp3'],\n\n  init() {\n    // Create main elements, classes and DOM structure\n    this.elements.main = document.createElement('main');\n    this.elements.main.classList.add('puzzle-game');\n\n    // Create block Canvas\n    this.elements.canvas = document.createElement('canvas');\n    this.elements.canvas.setAttribute('id', 'canvas');\n    this.elements.canvas.innerText = 'Canvas not supproted';\n    this.elements.main.appendChild(this.elements.canvas);\n\n    // Create block Info\n    this.elements.info = document.createElement('section');\n    this.elements.info.classList.add('info');\n\n    const infoWrapper = document.createElement('div');\n    infoWrapper.classList.add('wrapper');\n\n    const infoContent = document.createElement('div');\n    infoContent.classList.add('info-content');\n\n    this.elements.time = document.createElement('time');\n    this.elements.time.classList.add('info-content__time');\n\n    if (localStorage.getItem('seconds') === null) {\n      this.elements.time.innerText = '00:00:00';\n    } else {\n      const seconds = gemPuzzle.addZero(localStorage.getItem('seconds'));\n      const minutes = gemPuzzle.addZero(localStorage.getItem('minutes'));\n      const hours = gemPuzzle.addZero(localStorage.getItem('hours'));\n      this.elements.time.innerText = `${hours}:${minutes}:${seconds}`;\n    }\n\n    this.elements.moves = document.createElement('div');\n    this.elements.moves.classList.add('info-content__moves');\n\n    if (localStorage.getItem('moves') === null) {\n      this.elements.moves.innerText = 'Moves: 0';\n    } else {\n      this.elements.moves.innerText = `Moves: ${localStorage.getItem('moves')}`;\n    }\n\n    document.body.appendChild(this.elements.main);\n    this.elements.main.appendChild(this.elements.info);\n    this.elements.info.appendChild(infoWrapper);\n    infoWrapper.appendChild(infoContent);\n    infoContent.appendChild(this.elements.time);\n    infoContent.appendChild(this.elements.moves);\n\n    // Create block Game\n    const game = document.createElement('section');\n    game.classList.add('game');\n\n    const gameWrapper = document.createElement('div');\n    gameWrapper.classList.add('wrapper');\n\n    this.elements.field = document.createElement('section');\n    this.elements.field.classList.add('play-field');\n\n    this.elements.puzzlesContainer = document.createElement('div');\n    this.elements.puzzlesContainer.classList.add('puzzles');\n    this.elements.main.appendChild(game);\n    game.appendChild(gameWrapper);\n    gameWrapper.appendChild(this.elements.field);\n    this.elements.field.appendChild(this.elements.puzzlesContainer);\n\n    // Вставить новую функцию на случай перезагрузки приложения\n\n    // this.elements.puzzlesContainer.appendChild(this.createPuzzles());\n\n    this.elements.puzzlesContainer.appendChild(\n      localStorage.getItem('cells') === null\n        ? this.createPuzzles() // For the first start\n        : this.downloadPuzzles(), // For the page reload\n    );\n\n    this.elements.puzzlesContainer.addEventListener('dragover', this.dragOver);\n    this.elements.puzzlesContainer.addEventListener('dragenter', this.dragEnter);\n    this.elements.puzzlesContainer.addEventListener('dragleave', this.dragLeave);\n    this.elements.puzzlesContainer.addEventListener('drop', this.dragDrop);\n\n    this.elements.puzzles = this.elements.puzzlesContainer.querySelectorAll(\n      '.puzzles__item',\n    );\n\n    // Create block Show-scores\n    this.elements.scoresInfo = document.createElement('section');\n    this.elements.scoresInfo.classList.add('scores-info');\n\n    const scoresWrapper = document.createElement('div');\n    scoresWrapper.classList.add('wrapper');\n\n    const scoresInfoContent = document.createElement('div');\n    scoresInfoContent.classList.add('scores-info__content');\n    scoresInfoContent.innerHTML = '<p>Best games</p>';\n\n    gameWrapper.appendChild(this.elements.scoresInfo);\n    this.elements.scoresInfo.appendChild(scoresWrapper);\n    scoresWrapper.appendChild(scoresInfoContent);\n\n    // Create block Menu\n    this.elements.menu = document.createElement('section');\n    this.elements.menu.classList.add('menu');\n\n    const menuWrapper = document.createElement('div');\n    menuWrapper.classList.add('wrapper');\n\n    const navigation = document.createElement('nav');\n    navigation.classList.add('navigation');\n\n    this.elements.main.appendChild(this.elements.menu);\n    this.elements.menu.appendChild(menuWrapper);\n    menuWrapper.appendChild(navigation);\n    navigation.appendChild(this.createButtons()); // ФУНКЦИЯ ПО ДОБАВЛЕНИЮ КНОПОК\n\n    // Create block Message\n    const message = document.createElement('section');\n    message.classList.add('message', 'message--active');\n\n    const messageWrapper = document.createElement('div');\n    messageWrapper.classList.add('wrapper');\n\n    this.elements.messageContent = document.createElement('div');\n    this.elements.messageContent.classList.add('message__content');\n    // const messageContent = document.createElement('div')\n    // messageContent.classList.add('message__content')\n\n    this.elements.main.appendChild(message);\n    message.appendChild(messageWrapper);\n    messageWrapper.appendChild(this.elements.messageContent);\n\n    // Start new timer\n    clearInterval(this.properties.timer);\n    this.properties.timer = setInterval(this.showTime, 1000);\n\n    // Create block Sounds\n    this.elements.soundsContainer = document.createElement('div');\n    this.elements.soundsContainer.classList.add('sounds');\n    this.elements.soundsContainer.appendChild(this.createSounds());\n    document.body.appendChild(this.elements.soundsContainer);\n  },\n\n  downloadPuzzles() {\n    const fragment = document.createDocumentFragment();\n\n    this.properties.layout = localStorage.getItem('layout');\n    this.properties.puzzlesNumber = localStorage.getItem('puzzlesCount');\n    this.properties.rowLength = Math.sqrt(this.properties.puzzlesNumber);\n    this.elements.cells = JSON.parse(localStorage.getItem('cells'));\n    this.elements.empty = JSON.parse(localStorage.getItem('empty'));\n\n    // Rebuild saved puzzle set\n\n    for (let i = 0; i < this.elements.cells.length; i += 1) {\n      const puzzleElement = document.createElement('div');\n      this.properties.cellSize = 100 / this.properties.rowLength;\n\n      const { left } = this.elements.cells[i];\n      const { top } = this.elements.cells[i];\n      const { value } = this.elements.cells[i];\n      const { image } = this.elements.cells[i];\n\n      if (value !== 0) {\n        puzzleElement.classList.add('puzzles__item', 'puzzles__item--filled');\n        puzzleElement.setAttribute('draggable', 'true');\n        // puzzleElement.innerText = value;\n\n        puzzleElement.style = `\n          top: ${top * this.properties.cellSize}%;\n          left: ${left * this.properties.cellSize}%;\n          width: ${this.properties.cellSize}%;\n          height: ${this.properties.cellSize}%;`;\n\n        this.elements.cells[i].element = puzzleElement;\n\n        const img = document.createElement('img');\n        img.setAttribute('src', image);\n        img.style = 'width: 100%; height: 100%;';\n        puzzleElement.appendChild(img);\n\n        puzzleElement.addEventListener('dragstart', (e) => {\n          this.dragStart(e);\n        });\n        puzzleElement.addEventListener('dragend', (e) => {\n          this.dragEnd(e, left, top, i);\n        });\n        puzzleElement.addEventListener('click', (e) => {\n          this.shiftPuzzle(e, left, top, i);\n        });\n      }\n\n      fragment.appendChild(puzzleElement);\n    }\n\n    return fragment;\n  },\n\n  createPuzzles() {\n    const fragment = document.createDocumentFragment();\n\n    if (localStorage.getItem('layout') !== null) {\n      this.properties.layout = localStorage.getItem('layout');\n    }\n\n    switch (this.properties.layout) {\n      case '4*4':\n        this.properties.puzzlesNumber = 4 * 4;\n        break;\n      case '5*5':\n        this.properties.puzzlesNumber = 5 * 5;\n        break;\n      case '6*6':\n        this.properties.puzzlesNumber = 6 * 6;\n        break;\n      case '7*7':\n        this.properties.puzzlesNumber = 7 * 7;\n        break;\n      case '8*8':\n        this.properties.puzzlesNumber = 8 * 8;\n        break;\n      default:\n        this.properties.puzzlesNumber = 3 * 3;\n        break;\n    }\n\n    this.properties.rowLength = Math.sqrt(this.properties.puzzlesNumber);\n\n    const imgNumber = Math.floor(1 + Math.random() * (150 + 1 - 1));\n\n    const numbers = [...Array(this.properties.puzzlesNumber).keys()].sort(\n      () => Math.random() - 0.5,\n    );\n\n    // Create new puzzle set\n    for (let i = 0; i < this.properties.puzzlesNumber; i += 1) {\n      const puzzleElement = document.createElement('div');\n      this.properties.cellSize = 100 / this.properties.rowLength;\n\n      if (numbers[i] === 0) {\n        const left = i % this.properties.rowLength;\n        const top = (i - left) / this.properties.rowLength;\n\n        this.elements.empty = {\n          value: numbers[i],\n          left,\n          top,\n        };\n\n        this.elements.cells.push(this.elements.empty);\n      } else {\n        puzzleElement.classList.add('puzzles__item', 'puzzles__item--filled');\n        puzzleElement.setAttribute('draggable', 'true');\n        const value = numbers[i];\n        // puzzleElement.innerText = value;\n        puzzleElement.setAttribute('id', value);\n\n        const left = i % this.properties.rowLength;\n        const top = (i - left) / this.properties.rowLength;\n\n        this\n          .createImageSet(i, this.properties.cellSize, imgNumber, puzzleElement, value);\n\n        puzzleElement.style = `\n          top: ${top * this.properties.cellSize}%;\n          left: ${left * this.properties.cellSize}%;\n          width: ${this.properties.cellSize}%;\n          height: ${this.properties.cellSize}%;`;\n\n        this.elements.cells.push({\n          value,\n          left,\n          top,\n          element: puzzleElement,\n        });\n\n        puzzleElement.addEventListener('dragstart', (e) => {\n          this.dragStart(e);\n        });\n        puzzleElement.addEventListener('dragend', (e) => {\n          this.dragEnd(e, left, top, i);\n        });\n        puzzleElement.addEventListener('click', (e) => {\n          this.shiftPuzzle(e, left, top, i);\n        });\n      }\n\n      fragment.appendChild(puzzleElement);\n    }\n\n    return fragment;\n  },\n\n  createImageSet(index, cellSize, imgNumber, puzzleElement, value) {\n    const cellSizePx = 900 * (cellSize / 100);\n\n    const left = value % this.properties.rowLength;\n    const top = (value - left) / this.properties.rowLength;\n    const leftPx = left * cellSizePx;\n    const topPx = top * cellSizePx;\n\n    const canvas = document.getElementById('canvas');\n    const ctx = canvas.getContext('2d');\n    canvas.style = `width: ${cellSizePx}px; height: ${cellSizePx}px; display: none`;\n\n    const im = new Image(cellSizePx, cellSizePx);\n    im.src = `/src/images/${imgNumber}.jpg`;\n\n    im.onload = () => {\n      canvas.width = im.naturalWidth;\n      canvas.height = im.naturalHeight;\n      ctx.drawImage(\n        im,\n        leftPx,\n        topPx,\n        cellSizePx,\n        cellSizePx,\n        0,\n        0,\n        100 * 9,\n        100 * 9,\n      );\n      const imageURL = canvas.toDataURL('image/jpeg').replace('image/png', 'image/octet-stream');\n      const img = document.createElement('img');\n      img.setAttribute('src', imageURL);\n      img.style = 'width: 100%; height: 100%;';\n      puzzleElement.appendChild(img);\n      this.elements.cells[index].image = imageURL;\n    };\n  },\n\n  createButtons() {\n    const fragment = document.createDocumentFragment();\n\n    const createIconHtml = (iconName) => `<i class='material-icons'>${iconName}</i>`;\n\n    this.elements.menuButtons.forEach((button) => {\n      const buttonElement = document.createElement('button');\n      buttonElement.classList.add('navigation__button');\n\n      switch (button) {\n        case 'Scores':\n          buttonElement.setAttribute('id', 'scores');\n          buttonElement.innerText = 'Scores';\n          buttonElement.addEventListener('click', () => {\n            this.toggleScore();\n            this.playSound('button');\n          });\n          break;\n        case 'New game':\n          buttonElement.setAttribute('id', 'new-game');\n          buttonElement.innerText = 'New game';\n          buttonElement.addEventListener('click', () => {\n            this.pressNewGame();\n            this.playSound('button');\n          });\n          break;\n        case 'Field type':\n          buttonElement.setAttribute('id', 'layout');\n          buttonElement.innerText = this.properties.layout;\n          buttonElement.addEventListener('click', (e) => {\n            this.changeLayOut(e);\n            this.pressNewGame();\n            this.playSound('button');\n          });\n          break;\n        case 'Sound':\n          buttonElement.setAttribute('id', 'sound');\n          buttonElement.innerHTML = createIconHtml('volume_up');\n          buttonElement.addEventListener('click', (e) => {\n            this.toggleSound(e);\n            this.playSound('button');\n          });\n          break;\n        case 'Pause':\n          buttonElement.setAttribute('id', 'pause');\n          buttonElement.innerHTML = createIconHtml('pause');\n          buttonElement.addEventListener('click', () => {\n            this.togglePause();\n            this.playSound('button');\n          });\n          break;\n        case 'Change Image':\n          buttonElement.setAttribute('id', 'change-image');\n          buttonElement.innerText = 'Change image';\n          buttonElement.addEventListener('click', () => {\n            this.changeImage();\n            this.pressNewGame();\n            this.playSound('button');\n          });\n          break;\n        default:\n          throw new Error('Ошибка');\n      }\n\n      fragment.appendChild(buttonElement);\n    });\n\n    return fragment;\n  },\n\n  startSavedGame() {},\n\n  shiftPuzzle(e, left, top, index) {\n    this.properties.paused = false;\n    const cell = this.elements.cells[index];\n\n    const leftDiff = Math.abs(this.elements.empty.left - cell.left);\n    const topDiff = Math.abs(this.elements.empty.top - cell.top);\n\n    if (leftDiff + topDiff > 1) {\n      return;\n    }\n    if (gemPuzzle.properties.isCompleted) {\n      return;\n    }\n\n    cell.element.style = `\n      top: ${this.elements.empty.top * this.properties.cellSize}%;\n      left: ${this.elements.empty.left * this.properties.cellSize}%;\n      width: ${this.properties.cellSize}%;\n      height: ${this.properties.cellSize}%;\n      background: url(${cell.image}) 0 0/100% auto no-repeat;\n      `;\n\n    const emptyLeft = this.elements.empty.left;\n    const emptyTop = this.elements.empty.top;\n    this.elements.empty.left = cell.left;\n    this.elements.empty.top = cell.top;\n    cell.left = emptyLeft;\n    cell.top = emptyTop;\n\n    this.showMoves();\n    this.playSound('puzzle');\n\n    const isFinished = this\n      .elements\n      .cells\n      .every(\n        (currentCell) => currentCell.value\n        === currentCell.top * this.properties.rowLength + currentCell.left,\n      );\n\n    if (isFinished) {\n      gemPuzzle.properties.isCompleted = true;\n      setTimeout(this.showCongrats, 600);\n    }\n\n    this.setItemLocalStorage();\n  },\n\n  showTime() {\n    if (gemPuzzle.properties.isCompleted) {\n      return;\n    }\n\n    if (localStorage.getItem('seconds') !== null) {\n      gemPuzzle.properties.seconds = Number(localStorage.getItem('seconds'));\n    }\n    if (localStorage.getItem('minutes') !== null) {\n      gemPuzzle.properties.minutes = Number(localStorage.getItem('minutes'));\n    }\n    if (localStorage.getItem('hours') !== null) {\n      gemPuzzle.properties.hours = Number(localStorage.getItem('hours'));\n    }\n\n    if (gemPuzzle.properties.seconds === 60) {\n      gemPuzzle.properties.seconds = 0;\n      gemPuzzle.properties.minutes += 1;\n    }\n    if (gemPuzzle.properties.minutes === 60) {\n      gemPuzzle.properties.minutes = 0;\n      gemPuzzle.properties.hours += 1;\n    }\n\n    const time = document.querySelector('.info-content__time');\n    const hours = gemPuzzle.addZero(gemPuzzle.properties.hours);\n    const minutes = gemPuzzle.addZero(gemPuzzle.properties.minutes);\n    const seconds = gemPuzzle.addZero(gemPuzzle.properties.seconds);\n\n    time.innerText = `${hours}:${minutes}:${seconds}`;\n    gemPuzzle.properties.seconds += 1;\n\n    localStorage.setItem('hours', gemPuzzle.properties.hours);\n    localStorage.setItem('minutes', gemPuzzle.properties.minutes);\n    localStorage.setItem('seconds', gemPuzzle.properties.seconds);\n  },\n\n  addZero(n) {\n    return Number(n) < 10 ? `0${n}` : n;\n  },\n\n  setItemLocalStorage() {\n    // console.log(this.elements.cells);\n\n    localStorage.setItem('layout', this.properties.layout);\n    localStorage.setItem('puzzlesCount', this.properties.puzzlesNumber);\n    localStorage.setItem('cells', JSON.stringify(this.elements.cells));\n    localStorage.setItem('empty', JSON.stringify(this.elements.empty));\n    localStorage.setItem('soundOn', JSON.stringify(this.properties.soundOn));\n    localStorage.setItem('isCompleted', JSON.stringify(this.properties.isCompleted));\n    localStorage.setItem('paused', JSON.stringify(this.properties.paused));\n    localStorage.setItem('message', JSON.stringify(this.elements.messageContent.innerText));\n  },\n\n  showMoves() {\n    if (localStorage.getItem('moves') !== null) {\n      this.properties.moves = Number(localStorage.getItem('moves'));\n    }\n\n    this.properties.moves += 1;\n    this.elements.moves.innerText = `Moves: ${this.properties.moves}`;\n    localStorage.setItem('moves', this.properties.moves);\n  },\n\n  toggleScore() {},\n\n  pressNewGame() {\n    this.properties.isCompleted = false;\n\n    // Clear current puzzle set\n    this.elements.cells = [];\n    this.elements.puzzlesContainer.innerHTML = '';\n    this.elements.puzzlesContainer.appendChild(this.createPuzzles());\n    document.querySelector('.message__content').innerText = ' ';\n\n    // New timer\n    this.properties.hours = 0;\n    this.properties.minutes = 0;\n    this.properties.seconds = 1;\n    document.querySelector('.info-content__time').innerHTML = '00:00:00';\n    clearInterval(this.properties.timer);\n    this.properties.timer = setInterval(this.showTime, 1000);\n\n    // New moves counter\n    this.properties.moves = 0;\n    this.elements.moves.innerText = `Moves: ${this.properties.moves}`;\n\n    this.clearLocalStorage();\n  },\n\n  clearLocalStorage() {\n    // Only soundOn remains in local storage\n    localStorage.removeItem('moves');\n    localStorage.removeItem('hours');\n    localStorage.removeItem('minutes');\n    localStorage.removeItem('seconds');\n    localStorage.removeItem('layout');\n    localStorage.removeItem('puzzlesCount');\n    localStorage.removeItem('cells');\n    localStorage.removeItem('empty');\n    localStorage.removeItem('isCompleted');\n    localStorage.removeItem('paused');\n    localStorage.removeItem('message');\n  },\n\n  changeLayOut(e) {\n    this.properties.isCompleted = false;\n    document.querySelector('.message__content').innerText = ' ';\n\n    // Change the button\n    let layoutIndex = this.layoutTypes.indexOf(this.properties.layout);\n\n    if (layoutIndex === this.layoutTypes.length - 1) {\n      layoutIndex = 0;\n    } else {\n      layoutIndex += 1;\n    }\n\n    this.properties.layout = this.layoutTypes[layoutIndex];\n    this.setItemLocalStorage(); // СОХРАНЯТЬ В ЛОКАЛ СТОР ТЕКУЩИЙ ЛЭЙАУТ\n    e.target.innerText = this.properties.layout;\n\n    // Change the layout\n    this.elements.puzzlesContainer.innerHTML = '';\n    this.elements.puzzlesContainer.appendChild(this.createPuzzles());\n  },\n\n  changeImage() {\n    this.properties.isCompleted = false;\n    document.querySelector('.message__content').innerText = ' ';\n  },\n\n  toggleSound(e) {\n    this.properties.soundOn = !this.properties.soundOn;\n\n    const buttonStatus = e.target.textContent;\n\n    switch (buttonStatus) {\n      case 'volume_off':\n        e.currentTarget.innerHTML = '<i class=\"material-icons\">volume_up</i>';\n        break;\n      default:\n        // 'volume_up'\n        e.currentTarget.innerHTML = '<i class=\"material-icons\">volume_off</i>';\n        break;\n    }\n  },\n\n  playSound(input) {\n    if (this.properties.soundOn === false) {\n      return;\n    }\n\n    switch (input) {\n      case 'puzzle': {\n        const audioPuzzle = document.querySelector('.sound-0');\n        audioPuzzle.currentTime = 0;\n        audioPuzzle.play();\n        break;\n      }\n      default: {\n        // case 'button':\n        const audioButton = document.querySelector('.sound-1');\n        audioButton.currentTime = 0;\n        audioButton.play();\n        break;\n      }\n    }\n  },\n\n  togglePause() {\n    this.properties.paused = !this.properties.paused;\n  },\n\n  showCongrats() {\n    const message = document.querySelector('.message__content');\n    const time = document.querySelector('.info-content__time').innerHTML;\n    const { moves } = gemPuzzle.properties;\n    message.innerText = `Congratulations! You solved the puzzle in ${time} and ${moves} moves`;\n  },\n\n  dragStart(e) {\n    setTimeout(() => {\n      e.target.classList.add('puzzles__item--hide');\n    }, 0);\n  },\n\n  dragEnd(e, left, top, index) {\n    e.target.classList.remove('puzzles__item--hide');\n\n    const cell = this.elements.cells[index];\n\n    const leftDiff = Math.abs(this.elements.empty.left - cell.left);\n    const topDiff = Math.abs(this.elements.empty.top - cell.top);\n\n    if (leftDiff + topDiff > 1) {\n      return;\n    }\n    if (gemPuzzle.properties.isCompleted) {\n      return;\n    }\n\n    cell.element.style = `\n      top: ${this.elements.empty.top * this.properties.cellSize}%;\n      left: ${this.elements.empty.left * this.properties.cellSize}%;\n      width: ${this.properties.cellSize}%;\n      height: ${this.properties.cellSize}%`;\n\n    const emptyLeft = this.elements.empty.left;\n    const emptyTop = this.elements.empty.top;\n    this.elements.empty.left = cell.left;\n    this.elements.empty.top = cell.top;\n    cell.left = emptyLeft;\n    cell.top = emptyTop;\n\n    this.playSound('puzzle');\n    this.showMoves();\n\n    const isFinished = this\n      .elements\n      .cells\n      .every((currentCell) => currentCell.value\n       === currentCell.top * this.properties.rowLength + currentCell.left);\n\n    if (isFinished) {\n      gemPuzzle.properties.isCompleted = true;\n      setTimeout(this.showCongrats, 600);\n    }\n\n    this.setItemLocalStorage();\n  },\n\n  dragOver(e) {\n    e.preventDefault();\n  },\n\n  dragEnter(e) {\n    e.preventDefault();\n    this.classList.add('puzzles--hovered');\n  },\n\n  dragLeave() {\n    this.classList.remove('puzzles--hovered');\n  },\n\n  dragDrop() {\n    this.classList.remove('puzzles--hovered');\n  },\n\n  createSounds() {\n    const fragment = document.createDocumentFragment();\n\n    for (let i = 0; i < this.sounds.length; i += 1) {\n      const sound = document.createElement('audio');\n      sound.classList.add(`sound-${i}`);\n      sound.setAttribute('src', `src/sounds/${this.sounds[i]}`);\n      fragment.appendChild(sound);\n    }\n\n    return fragment;\n  },\n};\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  gemPuzzle.init();\n});\n\n\n//# sourceURL=webpack://gem-puzzle/./src/js/index.js?");
/******/ })()
;