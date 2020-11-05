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
        paused: false,
        layout: "3*3",
        soundOn: true,
        currentField: null,
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
        this.elements.puzzlesContainer.appendChild(this._createPuzzles())

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
        navigation.appendChild(this._createButtons())

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

        let puzzlesNumer

        switch (this.properties.layout) {
            case "4*4":
                puzzlesNumer = 4 * 4
                break;
            case "5*5":
                puzzlesNumer = 5 * 5
                break;
            case "6*6":
                puzzlesNumer = 6 * 6
                break;
            case "7*7":
                puzzlesNumer = 7 * 7
                break;
            case "8*8":
                puzzlesNumer = 8 * 8
                break;
            default: //case 3*3
                puzzlesNumer = 3 * 3
                break;
        }

        for (let i = 0; i < puzzlesNumer; i += 1) {
            let puzzleElement = document.createElement('div')
            puzzleElement.classList.add(`puzzle-${i}`)
            puzzleElement.setAttribute('id', `${i}`)

            if (i === 0) {
                puzzleElement.classList.add('puzzles__item', 'puzzles__item--empty')
            } else {
                puzzleElement.classList.add('puzzles__item', 'puzzles__item--filled',  'puzzles__item--inactive')
                puzzleElement.innerText = i
                puzzleElement.addEventListener('click', (e) => {
                    this._shiftPuzzle()
                    this._playSound()
                })
            }
            fragment.appendChild(puzzleElement)
        }
        return fragment
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
                    } )
                    break;
                case 'Pause':
                    buttonElement.setAttribute('id', 'pause')
                    buttonElement.innerHTML = createIconHtml('pause')
                    buttonElement.addEventListener('click', (e) => {
                        this._togglePause()
                        this._playSound()
                    } )
                    break;
                case 'Change Image':
                    buttonElement.setAttribute('id', 'change-image')
                    buttonElement.innerHTML = createIconHtml('loop')
                    buttonElement.addEventListener('click', (e) => {
                        this._changeImage()
                        this._pressNewGame()
                        this._playSound()
                    } )
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

    _shiftPuzzle() {

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

        document.styleSheets[1].replace()

        console.log(document.styleSheets[1]);



        console.log(`function chenge layout started`)

        // const currentLayout = document.querySelector('.puzzles')

        // console.log(
        //     currentLayout.classList
        //     );


    },

    _changeImage(){

    },

    _toggleSound() {

    },

    _playSound() {

    },

    _togglePause() {

    },

    _showCongrats() {

    },


}

window.addEventListener('DOMContentLoaded', () => {
    gemPuzzle.init()
})