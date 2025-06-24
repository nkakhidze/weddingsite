const clockEl = document.querySelector('.clock');
console.log("✅ clockEl =", clockEl);
if (!clockEl) {
  console.warn("⚠️ clockEl не найден!");
}

const explousionSound = new Audio("scripts/sounds/piu.mp3");


function fireAt(element) {
  explousionSound.currentTime = 0;
  explousionSound.play().catch(() => {});
  const rect = element.getBoundingClientRect();
  console.log("fireAt 📐 fireAt → rect:", rect);
  // считаем точку в пикселях, например, чуть над цифрами
  const px = rect.left + rect.width * 0.5;
  const py = rect.top  + rect.height * 0.8;
  // конвертим в долю от экрана:
  const origin = {
    x: px / window.innerWidth,
    y: py / window.innerHeight
  };
  confetti({
    particleCount: 200,
    spread: 80,
    drift: 1.5,
    shapes: ['circle', 'square'],
    scalar: 0.6,
    origin
  });
  
}

function fireAtMikro(element) {
  const rect = element.getBoundingClientRect();
  console.log("fireAtMikro 📐 fireAt → rect:", rect);
  // считаем точку в пикселях, например, чуть над цифрами
  const px = rect.left + rect.width * 0.7;
  const py = rect.top  + rect.height * 0.3;
  // конвертим в долю от экрана:
  const origin = {
    x: px / window.innerWidth,
    y: py / window.innerHeight
  };
  confetti({
    particleCount: 3,
    spread: 4,
    startVelocity: 20,
    shapes: ['circle', 'square'],
    drift: 1,
    colors: ['#90A993'],
    origin
  });
}

window.fireConfetti = function() {
  // простой взрыв из центра часов
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
  // можно добавить ещё всплесков:
  confetti({
    particleCount: 50,
    spread: 120,
    origin: { x: 0.3, y: 0.7 }
  });
  confetti({
    particleCount: 50,
    spread: 120,
    origin: { x: 0.7, y: 0.7 }
  });
};


const oldMinuteHandler = window.onMinuteChange;
window.onMinuteChange = minutes => {
  console.log("🔥 [confetti] onMinuteChange wrapper, minutes =", minutes);
  if (typeof oldMinuteHandler === 'function') oldMinuteHandler(minutes);
  if (minutes % 1 === 0 && clockEl) {
    console.log("🔥 fireAt будет вызван!");
    fireAt(clockEl);
  }
};

const oldTenSecHandler = window.onTenSecTick;
window.onTenSecTick = seconds => {
  if (typeof oldTenSecHandler === 'function') oldTenSecHandler(seconds);
  // и ещё мини-выстрелы конфетти
  if (seconds % 10 === 0 && clockEl) {
    fireAtMikro(clockEl);
  }
};

// const clockEl = document.querySelector('.clock');
// if (!clockEl) {
//   console.warn("⚠️ clockEl не найден!");
// } else {
//   console.log("✅ clockEl найден:", clockEl);
// }
// const explousionSound = new Audio("scripts/sounds/piu.mp3");




// function fireAt(element) {
//   const rect = element.getBoundingClientRect();
//   console.log("fireAt 📐 fireAt → rect:", rect);
//   // считаем точку в пикселях, например, чуть над цифрами
//   const px = rect.left + rect.width * 0.5;
//   const py = rect.top  + rect.height * 0.8;
//   // конвертим в долю от экрана:
//   const origin = {
//     x: px / window.innerWidth,
//     y: py / window.innerHeight
//   };
//   confetti({
//     particleCount: 200,
//     spread: 80,
//     drift: 1.5,
//     shapes: ['circle', 'square'],
//     scalar: 0.6,
//     origin
//   });
// }

// function fireAtMikro(element) {
//   const rect = element.getBoundingClientRect();
//   console.log("fireAtMikro 📐 fireAt → rect:", rect);
//   // считаем точку в пикселях, например, чуть над цифрами
//   const px = rect.left + rect.width * 0.7;
//   const py = rect.top  + rect.height * 0.3;
//   // конвертим в долю от экрана:
//   const origin = {
//     x: px / window.innerWidth,
//     y: py / window.innerHeight
//   };
//   confetti({
//     particleCount: 3,
//     spread: 4,
//     startVelocity: 20,
//     shapes: ['circle', 'square'],
//     drift: 1,
//     colors: ['#90A993'],
//     origin
//   });
// }

// // скрипт конфетти
// // console.log("scriptConfetti 1");
// // (() => {
// //   // предыдущие значения
// //   console.log("scriptConfetti 2");
// //   window.prevMinutes = window.prevMinutes ?? null;

// //   // точка входа — вызывать эту функцию из updateCountdown
// //   window.fireConfetti = function() {
// //     // простой взрыв из центра часов
// //     confetti({
// //       particleCount: 100,
// //       spread: 70,
// //       origin: { y: 0.6 }
// //     });
// //     // можно добавить ещё всплесков:
// //     confetti({
// //       particleCount: 50,
// //       spread: 120,
// //       origin: { x: 0.3, y: 0.7 }
// //     });
// //     confetti({
// //       particleCount: 50,
// //       spread: 120,
// //       origin: { x: 0.7, y: 0.7 }
// //     });
// //   };

//   // «обёртка» для updateCountdown: запоминаем минуты и при изменении — фейерверк
//   // const originalUpdate = window.updateCountdown;
//   // window.updateCountdown = function() {
//   //   // до обновления читаем, какие были минуты
//   //   const currentMin = document.getElementById('minutes').innerText;
//   //   originalUpdate(); // обновляем цифры
//   //   const newMin = document.getElementById('minutes').innerText;

//   //   if (prevMinutes !== null && newMin !== prevMinutes) {
//   //       console.log("🎉 Минуты поменялись:", prevMinutes, "→", newMin);
//   //     // минуты изменились!
//   //     window.fireConfetti();
//   //   }
//   //   prevMinutes = newMin;
//   //   if (oldSec !== newSec && parseInt(newSec,10) % 5 === 0) {
//   //       console.log("🔔 5-секундный тест:", oldSec, "→", newSec);
//   //        window.fireConfetti();
//   //   }
//   // };
// // })();

// window.prevMinutes = window.prevMinutes ?? null;

// // делаем её доступной как глобальную функцию
// // window.fireConfetti = function() {
// // console.log("💥 fireConfetti()");
// // confetti({ particleCount:100, spread:70, origin:{ y:0.6 } });
// // };

// window.fireConfetti = function() {
// console.log("💥 fireConfetti()");
// // простой взрыв из центра часов
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { y: 0.6 }
//     });
//     // можно добавить ещё всплесков:
//     confetti({
//       particleCount: 50,
//       spread: 120,
//       origin: { x: 0.3, y: 0.7 }
//     });
//     confetti({
//       particleCount: 50,
//       spread: 120,
//       origin: { x: 0.7, y: 0.7 }
//     });
// };


// // function updateCountdown() {
// // const now = new Date();
// // const remainingTime = targetDate - now;

// // const days    = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
// // const hours   = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// // const minutes = Math.floor((remainingTime % (1000 * 60 * 60))      / (1000 * 60));
// // const seconds = Math.floor((remainingTime % (1000 * 60))           / 1000);

// // document.getElementById('days').   innerText = String(days).padStart(2, '0');
// // document.getElementById('hours').  innerText = String(hours).padStart(2, '0');
// // document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
// // document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

// // // Проверка смены минут
// // console.log("⏱ prevMinutes:", prevMinutes, "minutes:", minutes);
// // if (prevMinutes !== null && minutes !== prevMinutes) {
// //   console.log("🎉 Минуты поменялись:", prevMinutes, "→", minutes);

// //   fireAt(clockEl);
// //   console.log("🔥 fireAt вызван");

// //   setTimeout(() => {
// //     explousionSound.currentTime = 0;
// //     explousionSound.play().catch(e => console.warn("⚠️ Ошибка воспроизведения звука:", e));
// //   }, 1000);
// // }

// // prevMinutes = minutes;

// // // Тест каждые 10 секунд
// // if (seconds % 10 === 0) {
// //   console.log("🔔 Тест 10-секунд:", seconds);
// //   fireAtMikro(clockEl);
// // }
// // }

// // // 4) Запускаем обновление каждую секунду
// // setInterval(updateCountdown, 1000);

// function updateCountdown() {
//   const now = new Date();
//   const remainingTime = window.targetDate - now;

//   const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//   document.getElementById('days').innerText    = String(days).padStart(2, '0');
//   document.getElementById('hours').innerText   = String(hours).padStart(2, '0');
//   document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
//   document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

//   // 🔁 Вызов хуков, если они заданы
//   if (window.prevMinutes !== null && minutes !== window.prevMinutes) {
//     console.log("🕓 Смена минут:", window.prevMinutes, "→", minutes);
//     if (typeof window.onMinuteChange === 'function') {
//       window.onMinuteChange(minutes);
//     }
//   }

//   if (typeof window.onTenSecTick === 'function') {
//     window.onTenSecTick(seconds);
//   }

//   window.prevMinutes = minutes;
// }

// setInterval(updateCountdown, 1000);
// updateCountdown();