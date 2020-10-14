// 1. Забрать все кнопки в переменые

let numbers = document.querySelectorAll('.number'),
squareRootBtn = document.querySelector('.square-root'),
operations = document.querySelectorAll('.operator'),
decimal = document.querySelector('#decimal'),
clearButtons = document.querySelectorAll('.clear-btn'),
display = document.getElementById('display'),
plusMinus = document.querySelector('.plus-minus'),

MemoryCurrentNumber = 0,
MemoryIsNewNumber = false,
MemoryPendingOperation = '';

// 2. Добавить обработчик событий (c сылками на функции)

for (let i = 0; i <= numbers.length - 1; i += 1) {   // обработчик событий на все цифры
  let number = numbers[i];
  number.addEventListener('click', function(e) {
    console.log(`Клик по кнопке ${e.target.textContent}`);
    pressNumber(e.target.textContent);
  });
};

for (let i = 0; i <= operations.length - 1; i += 1) {    // обработчик событий на все операции
  let operation = operations[i];
  operation.addEventListener('click',function(e) {
    console.log(`Клик по кнопке ${e.target.textContent}`);
    pressOperation(e.target.textContent);
  });
}

for (let i = 0; i <= clearButtons.length - 1; i += 1) {
  let clearButton = clearButtons[i];
  clearButton.addEventListener('click', function(e) {
    console.log(`Клик по кнопке ${e.target.textContent}`);
    clear(e.srcElement.id);
  });
}

squareRootBtn.addEventListener('click', function(e){
  console.log(`Клик по кнопке ${e.target.textContent}`);
  squareRoot(e.target.textContent);
});

plusMinus.addEventListener('click', function(e){
  console.log(`Клик по кнопке ${e.target.textContent}`);
  makeNegative();
});

decimal.addEventListener('click', function(e){
  console.log(`Клик по кнопке ${e.target.textContent}`);
  pressDecimal();
});

// 3. Определяем все функции которые делает калькулятор

function pressNumber(buttonNumber){
  if (MemoryIsNewNumber === true) {
    display.value = buttonNumber;
    MemoryIsNewNumber = false;
  } else {
    if ((display.value === '0') || (display.value === 'Error')) {
      display.value = buttonNumber;
    } else {
      display.value += buttonNumber;
    };
  };
};


function pressDecimal(){
  if (MemoryIsNewNumber === true){
    display.value = '0.';
    MemoryIsNewNumber = false;
  } else {
    if (display.value === 'Error') {
      display.value = '0.';
    } else {
      if (display.value.indexOf('.') === -1) {
        display.value += ".";
      };
    };
  };
};

function makeNegative(){
  if (display.value !== 'Error'){
    display.value = -(+display.value);
  }
}

function clear(id){
  if (id === "ce") {
    display.value = '0';
    MemoryIsNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    MemoryIsNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
}

function pressOperation(buttonOperation){
  if (display.value !== 'Error'){
    let localOperationMemory = display.value;
    if ((MemoryIsNewNumber === true) && (MemoryPendingOperation !== '=')){
      display.value = MemoryCurrentNumber;
    } else {
      let wrapper;
      let symbolsAfterDropInLocal;
      let symbolsAfterDropInMemory;
      MemoryIsNewNumber = true;
      if (MemoryPendingOperation === '+'){
        symbolsAfterDropInMemory = (MemoryCurrentNumber.toString().includes('.')) ? (MemoryCurrentNumber.toString().split('.').pop().length) : (0);
        symbolsAfterDropInLocal = (localOperationMemory.includes('.')) ? (localOperationMemory.split('.').pop().length) : (0);
        wrapper = Math.max(symbolsAfterDropInMemory, symbolsAfterDropInLocal);
        MemoryCurrentNumber += parseFloat(localOperationMemory);
        MemoryCurrentNumber = +MemoryCurrentNumber.toFixed(wrapper)
      } else if (MemoryPendingOperation === '-'){
        symbolsAfterDropInMemory = (MemoryCurrentNumber.toString().includes('.')) ? (MemoryCurrentNumber.toString().split('.').pop().length) : (0);
        symbolsAfterDropInLocal = (localOperationMemory.includes('.')) ? (localOperationMemory.split('.').pop().length) : (0);
        wrapper = Math.max(symbolsAfterDropInMemory, symbolsAfterDropInLocal);
        MemoryCurrentNumber -= parseFloat(localOperationMemory);
        MemoryCurrentNumber = +MemoryCurrentNumber.toFixed(wrapper)
      } else if (MemoryPendingOperation === '*'){
        symbolsAfterDropInMemory = (MemoryCurrentNumber.toString().includes('.')) ? (MemoryCurrentNumber.toString().split('.').pop().length) : (0);
        symbolsAfterDropInLocal = (localOperationMemory.includes('.')) ? (localOperationMemory.split('.').pop().length) : (0);
        wrapper = symbolsAfterDropInMemory + symbolsAfterDropInLocal;
        MemoryCurrentNumber *= parseFloat(localOperationMemory);
        MemoryCurrentNumber = +MemoryCurrentNumber.toFixed(wrapper)
      } else if (MemoryPendingOperation === '/'){
        MemoryCurrentNumber /= parseFloat(localOperationMemory);
      } else if (MemoryPendingOperation === '+/-'){
        MemoryCurrentNumber =  -parseFloat(localOperationMemory);
      } else if (MemoryPendingOperation === '^'){
        MemoryCurrentNumber **= parseFloat(localOperationMemory);
      } else {
        MemoryCurrentNumber = parseFloat(localOperationMemory);
      }
       display.value = MemoryCurrentNumber;
      MemoryPendingOperation = buttonOperation;
    };
  };
};

function squareRoot(sqrt){
  if (display.value !== 'Error'){
    let localMemorySQRT = display.value;
    if (+localMemorySQRT < 0) {
      display.value = "Error";
    } else {
      localMemorySQRT = Math.sqrt(localMemorySQRT);
      display.value = localMemorySQRT;
    };
  };
};

