import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const clockDaysFace = document.querySelector('span[data-days]');
const clockHoursFace = document.querySelector('span[data-hours]');
const clockMinutesFace = document.querySelector('span[data-minutes]');
const clockSecondsFace = document.querySelector('span[data-seconds]');

startBtn.disabled = true;
let deltaTime = 0;
let timeComponents = {};
let startTime = 0;
let timerId = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = selectedDates[0].getTime();
    toCheckFutureDate();
  },

};

const fp = flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", timerStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function timerStart () {
    timerId = setInterval(() => {
    const currentTime = Date.now();
    deltaTime = startTime - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      return;}
    
    timeComponents = convertMs(deltaTime);
    updateClockFace(timeComponents);
    startBtn.disabled = true;
    }, 1000);
}

function toCheckFutureDate() {
  const currentTimeforCheck = Date.now();
  if (startTime < currentTimeforCheck) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;}
   startBtn.disabled = false; 
  }


function updateClockFace({ days, hours, minutes, seconds }) {
  clockDaysFace.textContent = days;
  clockHoursFace.textContent = hours;
  clockMinutesFace.textContent = minutes;
  clockSecondsFace.textContent = seconds;
}