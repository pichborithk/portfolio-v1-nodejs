const displayDay = document.querySelector('#day');
const displayDate = document.querySelector('#date');
const displayMonth = document.querySelector('#month');
const displayYear = document.querySelector('#year');
const displayClock = document.querySelector('#clock');
const switchButtons = document.querySelectorAll('.calendar .fa-rotate');
const displays = document.querySelectorAll('.calendar .calendar-display');

function updateCalendar() {
  const now = new Date();
  const dayNumber = now.getDay();
  const date = now.getDate();
  const monthNumber = now.getMonth();
  const year = now.getFullYear();
  let day;
  let month;
  switch (dayNumber) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
      break;
  }
  switch (monthNumber) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
  }
  displayDay.textContent = day;
  displayDate.textContent = date;
  displayMonth.textContent = month;
  displayYear.textContent = year;
}

function updateClock() {
  const now = new Date();
  const minute = now.getMinutes();
  const hour = now.getHours();
  const displayMinute = minute >= 10 ? minute : `0${minute}`;
  const displayHour = hour >= 10 ? hour : `0${hour}`;
  displayClock.querySelector('#minute').textContent = displayMinute;
  displayClock.querySelector('#hour').textContent = displayHour;
}

function switchFace() {
  displays.forEach((display) => display.classList.toggle('active'));
}

switchButtons.forEach((button) => button.addEventListener('click', switchFace));

updateClock();
updateCalendar();
setInterval(updateCalendar, 60000);
setInterval(updateClock, 1000);
