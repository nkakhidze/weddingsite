
// const countdown = document.querySelector('.countdown');
// const targetDate = new Date('2025-07-12T15:20:00');
// // const targetDate = new Date(Date.now() + 5000);

 
// function updateCountdown() {
//   // console.log("🔄 updateCountdown вызвано, текущее время:", new Date().toLocaleTimeString());
//   const now = new Date();
//   const remainingTime = targetDate - now;
 
//   const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//   let flag = false;
 
//   document.getElementById('days').innerText = days.toString().padStart(2, '0');
//   document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
//   document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
//   document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
// /*   if ( seconds % 10 === 0) {
//     flag = true
//   } */
// /*   if (flag === true) {
//     document.querySelector(.calendar div:nth-child(2)) = 5

//   } */
    
// } 

// // Обновляем счетчик каждую секунду
// setInterval(updateCountdown, 1000);

window.targetDate = new Date('2025-07-12T15:20:00');

// Единственный updateCountdown, он вызывает хуки:
function updateCountdown() {
  const now = new Date();
  const rem = window.targetDate - now;

  const days    = Math.floor(rem / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((rem % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((rem % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((rem % (1000 * 60)) / 1000);

  document.getElementById('days').innerText    = String(days).padStart(2,'0');
  document.getElementById('hours').innerText   = String(hours).padStart(2,'0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2,'0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2,'0');

  // Минуты меняются?
  if (window.prevMinutes != null && minutes !== window.prevMinutes) {
    if (typeof window.onMinuteChange === 'function') {
      window.onMinuteChange(minutes);
    }
  }

  // Часы меняются?
  if (window.prevHours !== null && hours !== window.prevHours) {
    if (typeof window.onHourChange === 'function') {
      window.onHourChange(hours);
    }
  }

  // Дни меняются?
  if (window.prevDays !== null && days !== window.prevDays) {
    if (typeof window.onDayChange === 'function') {
      window.onDayChange(days);
    }
  }

  // Каждые 10 секунд:
  if (typeof window.onTenSecTick === 'function') {
    window.onTenSecTick(seconds);
  }
  window.prevMinutes = minutes;
  window.prevHours   = hours;
  window.prevDays    = days;
}

// Запуск
window.prevMinutes = null;
window.prevHours   = null;
window.prevDays    = null;
setInterval(updateCountdown, 1000);
updateCountdown();