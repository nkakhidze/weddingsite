
// const calendarHourEl = document.getElementById('hours');
// const calendarDayEl = document.getElementById('days');
// const refregeratorSound = new Audio("scripts/sounds/refregerator.mp3");
// const papperSound = new Audio("scripts/sounds/tearOff.mp3");

// function tearOffClndrPage(element) {
//   console.log("➡️ tearOffClndrPage вызвана с элементом:", element);

//   if (!element) {
//     console.warn("❌ tearOffClndrPage: аргумент element === null/undefined");
//     return;
//   }

//   // 2) Ищем ближайший родительский контейнер с классом .reveal-container
//   const container = element.closest(".reveal-container");
//   console.log("   → найден контейнер:", container);
//   if (!container) {
//     console.warn("❌ tearOffClndrPage: не найден parent с классом .reveal-container");
//     return;
//   }

//   // 3) Ищем внутри контейнера уже существующий элемент <div class="reveal-mask">
//   //    Если его нет, создаём один раз (заранее, без класса active, просто width=0).
//   let mask = container.querySelector(".reveal-mask");
//   console.log("   → найден mask до создания:", mask);

//   if (!mask) {
//     mask = document.createElement("div");
//     mask.className = "reveal-mask";   // CSS: width=0, transition: width 2s
//     container.appendChild(mask);
//     console.log("   → создали новый <div class='reveal-mask'> и добавили в контейнер");
//   } else {
//     // Если mask уже есть и в данный момент у него лежит класс .active,
//     // значит предыдущая анимация ещё не закончилась, поэтому не запускаем заново.
//     if (mask.classList.contains("active")) {
//       console.log("   → mask уже в .active, анимация не завершилась — пропускаем повторный запуск");
//       return;
//     }
//   }

//   papperSound.currentTime = 0;
//   papperSound.play().catch(err => {
//     console.warn("⚠ Не удалось воспроизвести звук холодильник сразу:", err);
//   });

//   // 4) Теперь запускаем CSS-переход: «в следующем кадре» добавляем .active
//   //    (requestAnimationFrame гарантирует, что браузер сначала «заметит» элемент с width=0,
//   //     а только после этого мы переключим его на width=100%).
//   requestAnimationFrame(() => {
//     console.log("   → mask.classList.add('active'), начался transition width: 0 → 100%");
//     mask.classList.add("active");
//   });

//   // 5) Когда CSS-транзишн ширины (2 секунды) завершится, мы снимаем .active
//   //    — тем самым возвращаем width обратно к 0 без задержек (CSS: .reveal-mask { width:0 }).
//   const onTransitionEnd = () => {
//     console.log("   → transitionend: анимация width завершилась, убираем класс .active");
//     mask.classList.remove("active");
//     // **Никаких больше display:none** — после снятия active ширина автоматически становится 0.
//   };

//   mask.addEventListener("transitionend", onTransitionEnd, { once: true });
// }


// function openRefrigerator() {
//   const daysSpan = document.getElementById('days');
//   if (!daysSpan) return;

//   const daysContainer = daysSpan.closest('.reveal-container');
//   if (!daysContainer) return;

//   let maskGif = daysContainer.querySelector('.reveal-mask-gif-proba');
//   if (!maskGif) {
//     maskGif = document.createElement('div');
//     maskGif.className = 'reveal-mask-gif';
//     daysContainer.appendChild(maskGif);
//   } else {
//     if (maskGif.classList.contains('active')) {
//       // Если гифка уже показывается, выходим, чтобы не запускать повторно
//       return;
//     }
//   }

//   const timestamp = Date.now();
//   maskGif.style.backgroundImage = `url("img/calendar/open-fridge.gif?v=${timestamp}")`;

//   // В следующем кадре добавляем класс .active → opacity: 0 → opacity: 1 (CSS transition)
//   refregeratorSound.currentTime = 0;
//   refregeratorSound.play().catch(err => {
//     console.warn("⚠ Не удалось воспроизвести звук холодильник сразу:", err);
//   });

//   requestAnimationFrame(() => {
//     maskGif.classList.add('active');
//   });

//   // Через 10 секунд снимем .active (CSS вернёт opacity обратно в 0, и гифка скроется)
//   setTimeout(() => {
//     if (!maskGif.parentElement) return;
//     maskGif.classList.remove('active');
//   }, 9000);
// };



// window.onMinuteChange = () => {
//   tearOffClndrPage(calendarHourEl);
// };

// window.onTenSecTick = (sec) => {
//   if (sec % 30 === 0) {
//     tearOffClndrPage(calendarHourEl);
//   }
//   if (sec % 45 === 0) {
//     openRefrigerator();
//   }
// };



// Звуки и элементы
const papperSound = new Audio("scripts/sounds/tearOff.mp3");
const fridgeSound = new Audio("scripts/sounds/refregerator.mp3");
const hoursEl = document.getElementById('hours');
const daysEl  = document.getElementById('days');

// Функции-обработчики
function tearOffClndrPage() {
  const container = hoursEl.closest('.reveal-container');
  if (!container) return;
  let mask = container.querySelector('.reveal-mask');
  if (mask?.classList.contains('active')) return;
  if (!mask) {
    mask = document.createElement('div');
    mask.className = 'reveal-mask';
    container.appendChild(mask);
  }
  papperSound.play().catch(() => {});
  requestAnimationFrame(() => mask.classList.add('active'));
  mask.addEventListener('transitionend', () => mask.classList.remove('active'), { once: true });
}

function openRefrigerator() {
  // найдём контейнер вокруг дней
  const container = daysEl.closest('.reveal-container');
  if (!container) return;

  // попробуем получить уже созданную маску
  let maskGif = container.querySelector('.reveal-mask-gif');
  if (!maskGif) {
    maskGif = document.createElement('div');
    maskGif.className = 'reveal-mask-gif';
    container.appendChild(maskGif);
  } else {
    // если уже активна — ничего не делаем
    if (maskGif.classList.contains('active')) return;
  }

  // сбросим позицию звука и проиграем
  fridgeSound.currentTime = 0;
  fridgeSound.play().catch(() => {});

  // подставим картинку-гифку с cache-busting
  const timestamp = Date.now();
  maskGif.style.backgroundImage = 
    `url("/img/calendar/open-fridge.gif?v=${timestamp}")`;

  // в следующем кадре добавляем класс, чтобы сработал CSS-переход opacity
  requestAnimationFrame(() => maskGif.classList.add('active'));

  // через 9 с (или сколько вам нужно) убираем класс
  setTimeout(() => {
    if (maskGif.parentElement) {
      maskGif.classList.remove('active');
    }
  }, 12500);
}


// Например, при смене часа — порвать страницу календаря
window.onHourChange = newHour => {
  console.log('Час изменился на', newHour);
  tearOffClndrPage();
};

// При смене дня — открывать холодильник
window.onDayChange = newDay => {
  console.log('День изменился на', newDay);
  openRefrigerator();
};