function initRecognition() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

  let recognition = new SpeechRecognition()

  recognition.interimResults = false;



  recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;

    keyboard.properties.value += transcript;
    keyboard._triggerEvent("oninput");
  };

  return recognition
}


const keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    musicContainer: null,
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    soundOn: true,
    voiceRecording: false,
    language: "en",
    recognition: window.initRecognition(),
    caretPositionStart: 0,
    caretPositionEnd: 0,
  },

  layoutsStandard: {
    english: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "voice",
      "done", "lang", "space", "keyboard_arrow_left", "keyboard_arrow_right", "sound"
    ],
    russian: [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "x", "ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "voice",
      "done", "lang", "space", "keyboard_arrow_left", "keyboard_arrow_right", "sound"
    ],
  },

  layoutsShift: {
    english: [
      "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "\'", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "voice",
      "done", "lang", "space", "keyboard_arrow_left", "keyboard_arrow_right", "sound"
    ],
    russian: [
      "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "x", "ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "voice",
      "done", "lang", "space", "keyboard_arrow_left", "keyboard_arrow_right", "sound"
    ],
  },

  sounds: ["tom.wav", "snare.wav", "boom.wav", "ride.wav", "openhat.wav", "clap.wav", "hihat.wav", "kick.wav", "default-sound-1.mp3", "default-sound-2.mp3"],

  init() {
    // Create main elements
    this.elements.main = document.createElement('div')
    this.elements.keysContainer = document.createElement('div')
    this.elements.musicContainer = document.createElement('div')

    //SetUp classes
    this.elements.main.classList.add("keyboard", "keyboard--hidden")
    this.elements.keysContainer.classList.add("keyboard__keys")
    this.elements.keysContainer.appendChild(this._createKeys())
    this.elements.musicContainer.classList.add("music")
    this.elements.musicContainer.appendChild(this._createMusic())

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key')

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer)
    document.body.appendChild(this.elements.main)
    document.body.appendChild(this.elements.musicContainer)

    // Use keyboard for all elements with the class use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        })
      })


    })
  },

  _createMusic() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i <= 9; i += 1) {
      let song = document.createElement('audio')
      song.classList.add(`song-${i}`)
      song.setAttribute('src', `sounds/${this.sounds[i]}`)
      fragment.appendChild(song)
    }

    return fragment
  },


  _createKeys() {
    const fragment = document.createDocumentFragment();

    let keyLayout = this.properties.language === "ru" ? this.layoutsStandard.russian : this.layoutsStandard.english;

    // Create HTML for an icon
    const createIconHtml = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`
    }

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button")
      let lineBreak

      if (this.properties.language === "en") {
        lineBreak = ["backspace", "]", "enter", "voice"].indexOf(key) !== -1
      } else {
        lineBreak = ["backspace", "ъ", "enter", "voice"].indexOf(key) !== -1
      }

      //Add atributes/classes
      keyElement.setAttribute("type", "button")
      keyElement.classList.add("keyboard__key")

      switch (key) {
        case "sound":
          keyElement.classList.add("keyboard__key--wide")
          keyElement.innerHTML = createIconHtml("volume_up");
          keyElement.addEventListener("click", (e) => {
            this._toggleSound(e)
            this._playSound("default")
          })
          break;

        case "backspace":
          keyElement.classList.add("keyboard__key--wide")
          keyElement.innerHTML = createIconHtml("backspace");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.caretPositionStart - 1)
              + this.properties.value.substring(this.properties.caretPositionStart)
            this._triggerEvent("oninput", "backspace")
            this._playSound(key)
            this.properties.caretPositionEnd -= 1
            this.properties.caretPositionStart -= 1
          })
          break;


        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable")
          keyElement.innerHTML = createIconHtml("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            if (this.properties.language === "en") {
              this._toggleCapsLock("english");
            } else {
              this._toggleCapsLock("russian");
            }
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock)
            this._playSound(key)
          })
          break;


        case "enter":
          keyElement.classList.add("keyboard__key--wide")
          keyElement.innerHTML = createIconHtml("keyboard_return");
          keyElement.addEventListener("click", () => {
            let elem = document.querySelector('.use-keyboard-input')
            this.properties.value = this.properties.value.substring(0, elem.selectionStart) + "\n" + this.properties.value.substring(elem.selectionEnd)
            this.properties.caretPositionStart = elem.selectionStart
            this.propertiescaretPositionEnd = elem.selectionEnd

            // this.properties.value += "\n";
            this._triggerEvent("oninput")
            this._playSound(key)
            this.properties.caretPositionEnd += 1
            this.properties.caretPositionStart += 1
          })
          break;


        case "space":
          keyElement.classList.add("keyboard__key--extra-wide")
          keyElement.innerHTML = createIconHtml("space_bar");
          keyElement.addEventListener("click", () => {
            let elem = document.querySelector('.use-keyboard-input')
            this.properties.value = this.properties.value.substring(0, elem.selectionStart) + " " + this.properties.value.substring(elem.selectionEnd)
            this.properties.caretPositionStart = elem.selectionStart
            this.propertiescaretPositionEnd = elem.selectionEnd



            // this.properties.value += " ";
            this._triggerEvent("oninput")
            this._playSound("default")
            this.properties.caretPositionEnd += 1
            this.properties.caretPositionStart += 1
          })
          break;


        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark")
          keyElement.innerHTML = createIconHtml("check_circle");
          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose")
            this._playSound("default")
          })
          break;


        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable")
          keyElement.innerText = "Shift";
          keyElement.addEventListener("click", () => {
            if (this.properties.language === "en") {
              this._toggleShift("english");
            } else {
              this._toggleShift("russian");
            }
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift)
            this._playSound(key)
          })
          break;

        case "lang":
          keyElement.classList.add("keyboard__key--wide")
          keyElement.innerText = this.properties.language
          keyElement.addEventListener("click", (e) => {
            this._toggleLanguage()
            e.currentTarget.innerText = e.currentTarget.innerText === "en" ? "ru" : "en";
            this._playSound("default")
          })
          break;

        case "voice":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable")
          keyElement.innerHTML = createIconHtml("record_voice_over");
          keyElement.addEventListener("click", (e) => {
            this._toggleVoice(e)
            this._playSound("default")
            keyElement.classList.toggle("keyboard__key--active")
          })
          break;

        case "keyboard_arrow_left":
          keyElement.innerHTML = createIconHtml("keyboard_arrow_left");
          keyElement.addEventListener("click", () => {
            this._setCaretPosition("left");
            this._playSound("default")
          })
          break;


        case "keyboard_arrow_right":
          keyElement.innerHTML = createIconHtml("keyboard_arrow_right");
          keyElement.addEventListener("click", () => {
            this._setCaretPosition("right");
            this._playSound("default")
          })
          break;


        default:
          keyElement.textContent = key.toLowerCase();

          let elem = document.querySelector('.use-keyboard-input')

          keyElement.addEventListener("click", (e) => {
            let elem = document.querySelector('.use-keyboard-input');
            console.log(elem.selectionStart);
            console.log(elem.selectionEnd);

            this.properties.value = this.properties.value.substring(0, elem.selectionStart) + e.target.innerText + this.properties.value.substring(elem.selectionEnd)
            this.properties.caretPositionStart = elem.selectionStart
            this.propertiescaretPositionEnd = elem.selectionEnd


            this._triggerEvent("oninput")
            this._playSound("default")
            this.properties.caretPositionEnd += 1
            this.properties.caretPositionStart += 1



            console.log(this.properties.value);


          });
          break;
      }
      fragment.appendChild(keyElement);

      if (lineBreak) {
        fragment.appendChild(document.createElement("br"))
      }

    });
    return fragment;
  },

  _triggerEvent(handlerName, button) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value)
      let elem = document.querySelector('.use-keyboard-input');
      elem.focus()
      if (button === "backspace") {
        elem.setSelectionRange(this.properties.caretPositionStart - 1, this.properties.caretPositionEnd - 1)
      } else {
        elem.setSelectionRange(this.properties.caretPositionStart + 1, this.properties.caretPositionEnd + 1);
      }
    }
  },

  _toggleShift(currentLanguage) {
    this.properties.shift = !this.properties.shift

    this._changeLayout(currentLanguage)


  },

  _changeLayout(currentLanguage) {
    for (const key of this.elements.keys) {
      if (key.innerText === "Shift") continue
      if (key.innerText === "en") continue
      if (key.innerText === "ru") continue
      if (key.childElementCount === 0) {

        if (this.properties.shift && this.properties.capsLock) {

          let standardIndex = this.layoutsStandard[currentLanguage].indexOf(key.textContent.toLowerCase())
          key.textContent = this.layoutsShift[currentLanguage][standardIndex].toLowerCase()

        } else if (this.properties.shift && !this.properties.capsLock) {

          let standardIndex = this.layoutsStandard[currentLanguage].indexOf(key.textContent.toLowerCase())
          key.textContent = this.layoutsShift[currentLanguage][standardIndex].toUpperCase()

        } else if (!this.properties.shift && this.properties.capsLock) {

          let shiftIndex = this.layoutsShift[currentLanguage].indexOf(key.textContent.toLowerCase())
          key.textContent = this.layoutsStandard[currentLanguage][shiftIndex].toUpperCase()

        } else {

          let shiftIndex = this.layoutsShift[currentLanguage].indexOf(key.textContent.toLowerCase())
          key.textContent = this.layoutsStandard[currentLanguage][shiftIndex].toLowerCase()

        }
      }
    }
  },

  _toggleVoice(e) {
    this.properties.voiceRecording = !this.properties.voiceRecording

    switch (e.target.textContent) {
      case "record_voice_over":
        e.currentTarget.innerHTML = `<i class="material-icons">voice_over_off</i>`
        this._startRecording()
        break;
      default:
        e.currentTarget.innerHTML = `<i class="material-icons">record_voice_over</i>`
        this._stopRecording()
        break;
    }
  },

  _toggleLanguage() {
    this.properties.language === "en" ? this.properties.language = "ru" : this.properties.language = "en"

    switch (this.properties.language) {
      case "en":
        for (const key of this.elements.keys) {
          if (key.innerText === "Shift") continue
          if (key.innerText === "en") continue
          if (key.innerText === "ru") continue
          if (key.childElementCount === 0) {

            if (this.properties.shift && this.properties.capsLock) {
              let ruIndex = this.layoutsShift.russian.indexOf(key.textContent.toLowerCase())
              key.textContent = this.layoutsShift.english[ruIndex].toLowerCase()

            } else if (this.properties.shift && !this.properties.capsLock) {
              let ruIndex = this.layoutsShift.russian.indexOf(key.textContent.toLowerCase())
              key.textContent = this.layoutsShift.english[ruIndex].toUpperCase()

            } else if (!this.properties.shift && this.properties.capsLock) {
              let ruIndex = this.layoutsStandard.russian.indexOf(key.textContent.toLowerCase())
              key.textContent = this.layoutsStandard.english[ruIndex].toUpperCase()
            } else {
              let ruIndex = this.layoutsStandard.russian.indexOf(key.textContent.toLowerCase())
              key.textContent = this.layoutsStandard.english[ruIndex].toLowerCase()
            }

          }
        }
        break;

      default:
        for (const key of this.elements.keys) {
          if (key.innerText === "Shift") continue
          if (key.innerText === "en") continue
          if (key.innerText === "ru") continue
          if (key.childElementCount === 0) {

            if (this.properties.shift && this.properties.capsLock) {
              let engIndex = this.layoutsShift.english.indexOf(key.textContent.toLowerCase())
              key.textContent = this.layoutsShift.russian[engIndex].toLowerCase()

            } else if (this.properties.shift && !this.properties.capsLock) {
              let engIndex = this.layoutsShift.english.indexOf(key.textContent.toLowerCase())
              key.textContent = this.layoutsShift.russian[engIndex].toUpperCase()

            } else if (!this.properties.shift && this.properties.capsLock) {
              let engIndex = this.layoutsStandard.english.indexOf(key.textContent.toLowerCase())
              key.textContent = this.layoutsStandard.russian[engIndex].toUpperCase()
            } else {
              let engIndex = this.layoutsStandard.english.indexOf(key.textContent.toLowerCase())
              key.textContent = this.layoutsStandard.russian[engIndex].toLowerCase()
            }

          }
        }
        break;
    }

  },

  _playSound(button) {

    switch (button) {
      case "enter":
        if (this.properties.soundOn && this.properties.language === "en") {
          let audio = document.querySelector('.song-0')
          audio.currentTime = 0
          audio.play()
        } else if (this.properties.soundOn && this.properties.language === "ru") {
          let audio = document.querySelector('.song-1')
          audio.currentTime = 0
          audio.play()
        }
        break;

      case "backspace":
        if (this.properties.soundOn && this.properties.language === "en") {
          let audio = document.querySelector('.song-2')
          audio.currentTime = 0
          audio.play()
        } else if (this.properties.soundOn && this.properties.language === "ru") {
          let audio = document.querySelector('.song-3')
          audio.currentTime = 0
          audio.play()
        }
        break;

      case "shift":
        if (this.properties.soundOn && this.properties.language === "en") {
          let audio = document.querySelector('.song-4')
          audio.currentTime = 0
          audio.play()
        } else if (this.properties.soundOn && this.properties.language === "ru") {
          let audio = document.querySelector('.song-5')
          audio.currentTime = 0
          audio.play()
        }
        break;

      case "shift":
        if (this.properties.soundOn && this.properties.language === "en") {
          let audio = document.querySelector('.song-4')
          audio.currentTime = 0
          audio.play()
        } else if (this.properties.soundOn && this.properties.language === "ru") {
          let audio = document.querySelector('.song-5')
          audio.currentTime = 0
          audio.play()
        }
        break;

      case "caps":
        if (this.properties.soundOn && this.properties.language === "en") {
          let audio = document.querySelector('.song-6')
          audio.currentTime = 0
          audio.play()
        } else if (this.properties.soundOn && this.properties.language === "ru") {
          let audio = document.querySelector('.song-7')
          audio.currentTime = 0
          audio.play()
        }
        break;

      case "default":
        if (this.properties.soundOn && this.properties.language === "en") {
          let audio = document.querySelector('.song-9')
          audio.currentTime = 0.1
          audio.play()
        } else if (this.properties.soundOn && this.properties.language === "ru") {
          let audio = document.querySelector('.song-8')
          audio.currentTime = 0.1
          audio.play()
        }
        break;
    }

  },

  _toggleSound(e) {
    this.properties.soundOn = !this.properties.soundOn

    switch (e.target.textContent) {
      case "volume_up":
        e.currentTarget.innerHTML = `<i class="material-icons">volume_off</i>`
        break;
      default:
        e.currentTarget.innerHTML = `<i class="material-icons">volume_up</i>`
        break;
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock

    for (const key of this.elements.keys) {
      if (key.innerText === "Shift") continue
      if (key.innerText === "en") continue
      if (key.innerText === "ru") continue
      if (key.childElementCount === 0) {

        if (this.properties.shift && this.properties.capsLock) {
          key.textContent = key.textContent.toLowerCase()
        } else if (this.properties.shift && !this.properties.capsLock) {
          key.textContent = key.textContent.toUpperCase()
        } else if (!this.properties.shift && this.properties.capsLock) {
          key.textContent = key.textContent.toUpperCase()
        } else {
          key.textContent = key.textContent.toLowerCase()
        }

      }
    }
  },



  _setCaretPosition(shiftDirection) {

    var elem = document.querySelector('.use-keyboard-input');
    if (elem != null) {
      elem.focus();



      if (elem.selectionStart === elem.selectionEnd) {
        if (shiftDirection === "right") {
          elem.setSelectionRange(elem.selectionStart + 1, elem.selectionEnd + 1);
        } else {
          elem.setSelectionRange(elem.selectionStart - 1, elem.selectionEnd - 1);
        }
      } else {
        if (shiftDirection === "right") {
          elem.setSelectionRange(elem.selectionStart, elem.selectionEnd + 1);
        } else {
          elem.setSelectionRange(elem.selectionStart - 1, elem.selectionEnd);
        }
      }
    }
    this.properties.caretPositionStart = elem.selectionStart
    this.properties.caretPositionEnd = elem.selectionEnd
  },



  _startRecording() {
    this.properties.recognition.lang = this.properties.language === "ru" ? "ru-RU" : "en-US";
    this.properties.recognition.start();
  },

  _stopRecording() {
    this.properties.recognition.stop()
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");

    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(e.defaultPrevented);
      })
    })



  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden")
  },


  highlightButton(event) {
    let currentButtonsArray = Array.from(document.querySelectorAll(".keyboard__keys")[0].children)
    let fisicalButtonValue = event.key
    currentButtonsArray.forEach(element => {
      let virtualButtonValue = element.innerText
      if (virtualButtonValue === "backspace" && fisicalButtonValue === "Backspace") {
        element.classList.add("keyboard__key--active")
      } else if (virtualButtonValue === "keyboard_capslock" && fisicalButtonValue === "CapsLock") {
        element.classList.toggle("keyboard__key--active")
      } else if (virtualButtonValue === "Shift" && fisicalButtonValue === "Shift") {
        element.classList.toggle("keyboard__key--active")
      } else if (virtualButtonValue === "keyboard_return" && fisicalButtonValue === "Enter") {
        element.classList.add("keyboard__key--active")
      } else if (virtualButtonValue === "space_bar" && fisicalButtonValue === " ") {
        element.classList.add("keyboard__key--active")
      } else if (virtualButtonValue === "keyboard_arrow_left" && fisicalButtonValue === "ArrowLeft") {
        element.classList.add("keyboard__key--active")
      } else if (virtualButtonValue === "keyboard_arrow_right" && fisicalButtonValue === "ArrowRight") {
        element.classList.add("keyboard__key--active")
      } else if (virtualButtonValue === fisicalButtonValue) {
        element.classList.add("keyboard__key--active")
      }
    });
  },


  canselHighlighting(event) {
    let currentButtonsArray = Array.from(document.querySelectorAll(".keyboard__keys")[0].children)
    let fisicalButtonValue = event.key
    currentButtonsArray.forEach(element => {
      let virtualButtonValue = element.innerText
      if (virtualButtonValue === "backspace" && fisicalButtonValue === "Backspace") {
        element.classList.remove("keyboard__key--active")
      } else if (virtualButtonValue === "keyboard_return" && fisicalButtonValue === "Enter") {
        element.classList.remove("keyboard__key--active")
      } else if (virtualButtonValue === "space_bar" && fisicalButtonValue === " ") {
        element.classList.remove("keyboard__key--active")
      } else if (virtualButtonValue === "keyboard_arrow_left" && fisicalButtonValue === "ArrowLeft") {
        element.classList.remove("keyboard__key--active")
      } else if (virtualButtonValue === "keyboard_arrow_right" && fisicalButtonValue === "ArrowRight") {
        element.classList.remove("keyboard__key--active")
      } else if (virtualButtonValue === fisicalButtonValue && fisicalButtonValue !== "Shift") {
        element.classList.remove("keyboard__key--active")
      }
    });
  }

}



window.addEventListener('DOMContentLoaded', () => {
  keyboard.init()
});



document.addEventListener('keydown', function (event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Отменить!')
  }
});


document.addEventListener('keydown', (event) => {
  keyboard.highlightButton(event)
});

document.addEventListener('keyup', (event) => {
  keyboard.canselHighlighting(event)
});

