console.log('Hello Valentin!')


const gemPuzzle = {

    elements: {
        main: null,
        info: null,

        field: null,

        puzzlesContainer: null,
        puzzles: null,
        time: null,
        moves: 0,
        congratulations: null,
        menu: null,
        menuButtons: ['Scores', 'New game', `Field type`, 'Sound', 'Pause', 'Change Image'],
        scoresInfo: null,
    },

    properties: {
        layout: "4*4",
        puzzlesNumber: 0,
        currentField: null,
        gridTemplateArea: null,

        paused: false,
        soundOn: true,
        completed: false,
        scoreShown: false,
        scores: [],
    },

    layoutTypes: [
        "3*3",
        "4*4",
        "5*5",
        "6*6",
        "7*7",
        "8*8"
    ],

    imagesPath: "src/images",

    init() {

        // Create main elements, classes and DOM structure
        this.elements.main = document.createElement('main')
        this.elements.main.classList.add('puzzle-game')

        // Create block Info
        this.elements.info = document.createElement('section')
        this.elements.info.classList.add('info')

        const infoWrapper = document.createElement('div')
        infoWrapper.classList.add('wrapper')

        const infoContent = document.createElement('div')
        infoContent.classList.add('info-content')

        this.elements.time = document.createElement('time')
        this.elements.time.classList.add('info-content__time')
        this.elements.time.innerText = 'Time 00:02'

        this.elements.moves = document.createElement('div')
        this.elements.moves.classList.add('info-content__moves')
        this.elements.moves.innerText = 'Moves 0'

        document.body.appendChild(this.elements.main)
        this.elements.main.appendChild(this.elements.info)
        this.elements.info.appendChild(infoWrapper)
        infoWrapper.appendChild(infoContent)
        infoContent.appendChild(this.elements.time)
        infoContent.appendChild(this.elements.moves)


        // Create block Game
        const game = document.createElement('section')
        game.classList.add('game')

        const gameWrapper = document.createElement('div')
        gameWrapper.classList.add('wrapper')

        this.elements.field = document.createElement('section')
        this.elements.field.classList.add('play-field')

        this.elements.puzzlesContainer = document.createElement('div')
        this.elements.puzzlesContainer.classList.add('puzzles')

        this.elements.main.appendChild(game)
        game.appendChild(gameWrapper)
        gameWrapper.appendChild(this.elements.field)
        this.elements.field.appendChild(this.elements.puzzlesContainer)
        this.elements.puzzlesContainer.appendChild(this._createPuzzles())  // ФУНКЦИЯ ПО ДОБАВЛЕНИЮ ПАЗЛОВ

        this.elements.puzzles = this.elements.puzzlesContainer.querySelectorAll('.puzzles__item')

        // Create block Show-scores
        this.elements.scoresInfo = document.createElement('section')
        this.elements.scoresInfo.classList.add('scores-info')

        const scoresWrapper = document.createElement('div')
        scoresWrapper.classList.add('wrapper')

        const scoresInfoContent = document.createElement('div')
        scoresInfoContent.classList.add('scores-info__content')
        scoresInfoContent.innerHTML = '<p>Best games</p>'

        gameWrapper.appendChild(this.elements.scoresInfo)
        this.elements.scoresInfo.appendChild(scoresWrapper)
        scoresWrapper.appendChild(scoresInfoContent)

        // Create block Menu
        this.elements.menu = document.createElement('section')
        this.elements.menu.classList.add('menu')

        const menuWrapper = document.createElement('div')
        menuWrapper.classList.add('wrapper')

        const navigation = document.createElement('nav')
        navigation.classList.add('navigation')

        this.elements.main.appendChild(this.elements.menu)
        this.elements.menu.appendChild(menuWrapper)
        menuWrapper.appendChild(navigation)
        navigation.appendChild(this._createButtons())  // ФУНКЦИЯ ПО ДОБАВЛЕНИЮ КНОПОК

        // Create block Message
        const message = document.createElement('section')
        message.classList.add('message', 'message--active')

        const messageWrapper = document.createElement('div')
        messageWrapper.classList.add('wrapper')

        const messageContent = document.createElement('div')
        messageContent.classList.add('message__content')
        messageContent.innerText = 'Congratulations! You solved it for 01:01 and 10 moves'

        this.elements.main.appendChild(message)
        message.appendChild(messageWrapper)
        messageWrapper.appendChild(messageContent)
    },

    _createPuzzles() {
        const fragment = document.createDocumentFragment();

        switch (this.properties.layout) {
            case "4*4":
                this.properties.puzzlesNumber = 4 * 4
                break;
            case "5*5":
                this.properties.puzzlesNumber = 5 * 5
                break;
            case "6*6":
                this.properties.puzzlesNumber = 6 * 6
                break;
            case "7*7":
                this.properties.puzzlesNumber = 7 * 7
                break;
            case "8*8":
                this.properties.puzzlesNumber = 8 * 8
                break;
            default: //case 3*3
                this.properties.puzzlesNumber = 3 * 3
                break;
        }

        for (let i = 0; i < this.properties.puzzlesNumber; i += 1) {
            let puzzleElement = document.createElement('div')
            puzzleElement.classList.add(`puzzle-${i}`)
            puzzleElement.setAttribute('id', `${i}`)

            if (i === 0) {
                puzzleElement.classList.add('puzzles__item', 'puzzles__item--empty')
            } else {
                puzzleElement.classList.add('puzzles__item', 'puzzles__item--filled', 'puzzles__item--inactive')
                puzzleElement.innerText = i
                puzzleElement.style = `grid-area: p${i};`
                puzzleElement.addEventListener('click', (e) => {
                    this._shiftPuzzle(e)
                    this._playSound()
                })
            }
            fragment.appendChild(puzzleElement)
        }

        // Create grid styles
        function createMatrix(rows) {
            let arr = [];
            let counter = 0;
            for (var i = 0; i < rows; i++) {
                arr[i] = [];
                for (let j = 0; j < rows; j++) {
                    arr[i][j] = `p${counter}`
                    counter += 1
                }
            }
            return arr;
        }

        this.properties.currentField = createMatrix(Math.sqrt(this.properties.puzzlesNumber))
        this._mixPuzzles()
        this._createGridArea()
        this._addGridToPuzzleContainer()
        return fragment
    },

    _mixPuzzles(){
        console.log(this.properties.currentField);
        console.log(Math.random() * 16);

    },

    // Create GRID AREA TO BE INCLUDED IN CSS STYLES
    _createGridArea() {
        let arrayForGrid = this.properties.currentField.map(element => element.join(' ')).join('" "')
        this.properties.gridTemplateArea = `"${arrayForGrid}"`
    },

    // CHANGE PUZZLE CONTAINER STYLE by including grid area
    _addGridToPuzzleContainer() {
        this.elements.puzzlesContainer.style =
            `grid-template-columns: repeat(${Math.sqrt(this.properties.puzzlesNumber)}, 1fr);
            grid-template-areas: ${this.properties.gridTemplateArea};`
    },

    _createButtons() {
        const fragment = document.createDocumentFragment()

        const createIconHtml = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        }

        this.elements.menuButtons.forEach(button => {

            const buttonElement = document.createElement('button')
            buttonElement.classList.add('navigation__button')

            switch (button) {
                case 'Scores':
                    buttonElement.setAttribute('id', 'scores')
                    buttonElement.innerText = 'Scores'
                    buttonElement.addEventListener('click', (e) => {
                        this._toggleScore()
                        this._playSound()
                    })
                    break;
                case 'New game':
                    buttonElement.setAttribute('id', 'new-game')
                    buttonElement.innerText = 'New game'
                    buttonElement.addEventListener('click', (e) => {
                        this._pressNewGame()
                        this._playSound()
                    })
                    break;
                case 'Field type':
                    buttonElement.setAttribute('id', 'layout')
                    buttonElement.innerText = this.properties.layout
                    buttonElement.addEventListener('click', (e) => {
                        this._changeLayOut(e)
                        this._pressNewGame()
                        this._playSound()
                    })
                    break;
                case 'Sound':
                    buttonElement.setAttribute('id', 'sound')
                    buttonElement.innerHTML = createIconHtml('volume_off')
                    buttonElement.addEventListener('click', (e) => {
                        this._toggleSound()
                        this._playSound()
                    })
                    break;
                case 'Pause':
                    buttonElement.setAttribute('id', 'pause')
                    buttonElement.innerHTML = createIconHtml('pause')
                    buttonElement.addEventListener('click', (e) => {
                        this._togglePause()
                        this._playSound()
                    })
                    break;
                case 'Change Image':
                    buttonElement.setAttribute('id', 'change-image')
                    buttonElement.innerHTML = createIconHtml('loop')
                    buttonElement.addEventListener('click', (e) => {
                        this._changeImage()
                        this._pressNewGame()
                        this._playSound()
                    })
                    break;
            }

            fragment.appendChild(buttonElement)

        })

        return fragment

    },

    _startNewGame() {

    },

    _startSavedGame() {

    },

    _shiftPuzzle(e) {
        // Reciece the current puzzle coordinates within the grid field
        const puzzleCoordinates = this._getPuzzleCoordinates(e.target.id, this.properties.currentField)
        const x = puzzleCoordinates[1]
        const y = puzzleCoordinates[0]

        // Identify coordinates of Up, Dowm, Left and Right puzzles in the currentField (grid)
        // If so - identify the grid index of Up, Dowm, Left and Right puzzles
        const puzzleUpCoordinates = [y - 1, x]
        let puzzleUpGridIndex
        if (y - 1 >= 0) {
            puzzleUpGridIndex = this.properties.currentField[y - 1][x];
        }

        const puzzleDownCoordinates = [y + 1, x]
        let puzzleDownGridIndex
        if (y + 1 <= this.properties.currentField.length - 1) {
            puzzleDownGridIndex = this.properties.currentField[y + 1][x]
        }

        const puzzleRightCoordinates = [y, x + 1]
        let puzzleRightGridIndex
        if (x + 1 <= this.properties.currentField[y].length - 1) {
            puzzleRightGridIndex = this.properties.currentField[y][x + 1]
        }

        const puzzleLeftCoordinates = [y, x - 1]
        let puzzleLeftGridIndex
        if (x - 1 >= 0) {
            puzzleLeftGridIndex = this.properties.currentField[y][x - 1]
        }

        // If Up, Dowm, Left or Right puzzles have grid index p0 - change it with current puzzle
        if (puzzleUpGridIndex === 'p0') {
            this.properties.currentField[y - 1][x] = `p${e.target.id}`
            this.properties.currentField[y][x] = `p0`
        }
        if (puzzleDownGridIndex === 'p0') {
            this.properties.currentField[y + 1][x] = `p${e.target.id}`
            this.properties.currentField[y][x] = `p0`
        }
        if (puzzleRightGridIndex === 'p0') {
            this.properties.currentField[y][x + 1] = `p${e.target.id}`
            this.properties.currentField[y][x] = `p0`
        }
        if (puzzleLeftGridIndex === 'p0') {
            this.properties.currentField[y][x - 1] = `p${e.target.id}`
            this.properties.currentField[y][x] = `p0`
        }


        console.log(e.target);

        this._createGridArea()
        this._addGridToPuzzleContainer()
    },

    _endGame() {

    },

    _showTime() {

    },

    _showMoves() {

    },

    _toggleScore() {

    },

    _pressNewGame() {

    },

    _changeLayOut(e) {
        //Change the button
        let layoutIndex = this.layoutTypes.indexOf(this.properties.layout)
        if (layoutIndex === this.layoutTypes.length - 1) {
            layoutIndex = 0
        } else {
            layoutIndex += 1
        }
        this.properties.layout = this.layoutTypes[layoutIndex]
        e.target.innerText = this.properties.layout

        //Change the layout
        this.elements.puzzlesContainer.innerHTML = ''
        this.elements.puzzlesContainer.appendChild(this._createPuzzles())
    },

    _changeImage() {

    },

    _toggleSound() {

    },

    _playSound() {

    },

    _togglePause() {

    },

    _showCongrats() {

    },


    _getPuzzleCoordinates(puzzleId, field) {
        let coordinates = []
        let x, y

        for (let i = 0; i < field.length; i++) {
            // console.log(field[i]);

            for (let j = 0; j < field[i].length; j++) {
                // console.log(field[i][j]);

                if (field[i][j] === `p${puzzleId}`) {

                    x = j
                    y = i

                }
            }

        }
        coordinates.push(y)
        coordinates.push(x)
        return coordinates
    },
}

window.addEventListener('DOMContentLoaded', () => {
    gemPuzzle.init()
})
