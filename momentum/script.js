const time = document.querySelector('.time'),
  day = document.querySelector('.day'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focusOnDay = document.querySelector('.focus'),
  pathToBackgr = 'assets/images/',
  images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg',
    '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg',
    '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg',
    '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'],
  button = document.querySelector('#btn__background'),
  city = document.querySelector('.city'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  humidity = document.querySelector('.humidity'),
  wind = document.querySelector('.wind');





let currentName = name.innerText,
  currentFocus = focusOnDay.innerText,
  currentCity = city.innerText,
  noMistakes,
  i = 0,
  j = 0,
  k = 0,
  l = 0,
  m = 0;

function showTime() {
  let today = new Date(),
    hours = today.getHours(),
    minutes = today.getMinutes(),
    seconds = today.getSeconds();

  time.innerHTML = `${addZero(hours)}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return Number(n) < 10 ? "0" + n : n;
}

// Output Day
function showDay() {
  let today = new Date(),
    date = today.getDate(),
    dayIndex = today.getDay(),
    allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayOfTheWeek = allDays[dayIndex],
    monthIndex = today.getMonth(),
    allMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    month = allMonth[monthIndex];
  day.innerHTML = `${dayOfTheWeek}<span>, </span>${month}<span> </span>${date}`;
  setTimeout(showDay, 1000);
}

// Set Background and Greeting
function showNight() {
  let src = `${pathToBackgr}night/${images[j]}`,
    img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    document.body.style.background = `url(${src}) 0 0/cover no-repeat`;
  }
  greeting.textContent = 'Good Night,'
  document.body.style.color = 'white';
  j === 19 ? j = 0 : j += 1;
}

function showAfternoon() {
  let src = `${pathToBackgr}day/${images[i]}`,
    img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    document.body.style.background = `url(${src}) 0 0/cover no-repeat`;
  }
  greeting.textContent = 'Good Afternoon,'
  document.body.style.color = 'white';
  i === 19 ? i = 0 : i += 1;
}

function showEvening() {
  let src = `${pathToBackgr}evening/${images[l]}`,
    img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    document.body.style.background = `url(${src}) 0 0/cover no-repeat`;
  }
  greeting.textContent = 'Good Evening,'
  document.body.style.color = 'white';
  l === 19 ? l = 0 : l += 1;
}

function showMorning() {
  let src = `${pathToBackgr}morning/${images[k]}`,
    img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    document.body.style.background = `url(${src}) 0 0/cover no-repeat`;
  }
  greeting.textContent = 'Good Morning,'
  document.body.style.color = 'black';
  k === 19 ? k = 0 : k += 1;
}

function showBackgrGreet() {
  let today = new Date(),
    hours = today.getHours();
  if (hours < 6) { showNight() }
  else if (hours < 12) { showMorning() }
  else if (hours < 18) { showAfternoon() }
  else { showEvening() }
}

function changeBackgrManually() {
  showBackgrGreet();
  button.disabled = true;
  setTimeout(function () { button.disabled = false }, 1000)
};

function autoBackgrChange() {
  setInterval(showBackgrGreet, 3600000);
}

function wasTextWritten(e) {
  let text = e.target.innerText;
  let textTrimmed = text.trim();
  return text.length > 0 && textTrimmed.length > 0 ? true : false;
}


// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (wasTextWritten(e)) {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      } else {
        e.target.innerText = currentName;
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  } else {
    if (wasTextWritten(e)) {
      localStorage.setItem('name', e.target.innerText);
    } else {
      e.target.innerText = currentName;
      localStorage.setItem('name', e.target.innerText);
    }
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (wasTextWritten(e)) {
        localStorage.setItem('focus', e.target.innerText);
        focusOnDay.blur();
      } else {
        e.target.innerText = currentFocus;
        localStorage.setItem('focus', e.target.innerText);
        focusOnDay.blur();
      }
    }
  } else {
    if (wasTextWritten(e)) {
      localStorage.setItem('focus', e.target.innerText);
    } else {
      e.target.innerText = currentFocus;
      localStorage.setItem('focus', e.target.innerText);
    }
  }
}

// Set City
function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (wasTextWritten(e)) {
        localStorage.setItem('city', e.target.innerText);
        getWeather();
        city.blur();
      } else {
        e.target.innerText = currentCity;
        localStorage.setItem('city', e.target.innerText);
        getWeather();
        city.blur();
      }
    }
  } else {
    if (wasTextWritten(e)) {
      localStorage.setItem('city', e.target.innerText);
      getWeather();
    } else {
      e.target.innerText = currentCity;
      localStorage.setItem('city', e.target.innerText);
      getWeather();
    }
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Your Name]';
  } else {
    name.textContent = localStorage.getItem('name')
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focusOnDay.textContent = '[Enter Focus]';
  } else {
    focusOnDay.textContent = localStorage.getItem('focus')
  }
}

// Get City
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter Your City]';
  } else {
    city.textContent = localStorage.getItem('city')
  }
}


name.addEventListener('blur', setName);
name.addEventListener('keypress', setName);
focusOnDay.addEventListener('blur', setFocus);
focusOnDay.addEventListener('keypress', setFocus);
button.addEventListener('click', changeBackgrManually);
city.addEventListener('blur', setCity);
city.addEventListener('keypress', setCity);

// Run
showTime();
showDay();
autoBackgrChange();
getName();
getFocus();
getCity();
showBackgrGreet();


// Hide By Clicking
name.addEventListener('click', hideName);
focusOnDay.addEventListener('click', hideFocus);
city.addEventListener('click', hideCity);


function hideName(event) {
  currentName = event.target.innerText;
  event.target.innerText = '';
}

function hideFocus(event) {
  currentFocus = event.target.innerText;
  event.target.innerText = ''
}

function hideCity(event) {
  currentCity = event.target.innerText;
  event.target.innerText = ''
}

// Weather
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerText}&lang=en&appid=f1fe9aa9627ddefce0cda42a7d10e141&units=metric`;
  const res = await fetch(url);
  noMistakes = res.ok;
  if (noMistakes === false && city.innerText !== '[Enter Your City]') {
    alert('There is no such a city')
  }
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `Humidity: ${data.main.humidity}%`
  wind.textContent = `Wind: ${data.wind.speed}m/s`
}

getWeather()

// Get Quote
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('#btn__quote');

async function getQuote() {
  const url = `https://type.fit/api/quotes`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data[m].text;
  figcaption.textContent = data[m].author;
  m === 1642 ? m = 0 : m++;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);







