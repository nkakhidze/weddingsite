// let prevBtn =document.querySelector(".prev");
// let nextBtn =document.querySelector(".next");

// nextBtn.addEventListener("click", () => {
//     let cards = document.querySelectorAll(".card")

//     document.querySelector(".slide").appendChild(cards[0]);

// })

// prevBtn.addEventListener("click", () => {
//     let cards = document.querySelectorAll(".card")

//     document.querySelector(".slide").prepend(cards[cards.length - 1]);
    
// })


// Получаем кнопки и контейнер слайдов
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slide = document.querySelector(".slide");

// Функция для обновления позиций карточек в слайде
function updatePositions() {
  // Получаем актуальный список карточек (NodeList)
  const cards = slide.querySelectorAll(".card");
  const isMobile = window.innerWidth <= 768;
  
  cards.forEach((card, index) => {
    // Сброс базовых стилей для всех карточек
    card.style.backgroundSize = 'cover';
    card.style.top = '50%';
    card.style.transform = 'translateY(-50%)';
    card.style.width = '200px';
    card.style.height = '300px';
    
    card.style.left = `calc(50% + ${220 * (index - 1)}px)`;
    
    if (isMobile) {
      card.style.left = `calc(60% + ${220 * (index - 1)}px)`;
    } else {
      card.style.left = `calc(50% + ${220 * (index - 1)}px)`;
    }

    // Если это первая карточка — делаем её полноэкранной (активной)
    if (index === 0) {
      card.style.top = '0';
      card.style.left = '0';
      card.style.transform = 'translate(0,0)';
      card.style.width = '100%';
      card.style.backgroundSize = 'cover';
      card.style.height = '100%';
      card.style.borderRadius = '0';
      // Показываем содержимое активной карточки
      card.querySelector('.content').style.display = 'block';
    } else {
      // Остальным скрываем содержимое
      card.style.borderRadius = '20px';
      card.querySelector('.content').style.display = 'none';
    }
  });
}

// Первоначальное позиционирование карточек при загрузке
updatePositions();

// При клике "next" переносим первую карточку в конец и обновляем позиции
nextBtn.addEventListener("click", () => {
  const cards = slide.querySelectorAll(".card");
  slide.appendChild(cards[0]);
  updatePositions();
});

// При клике "prev" переносим последнюю карточку в начало и обновляем позиции
prevBtn.addEventListener("click", () => {
  const cards = slide.querySelectorAll(".card");
  slide.prepend(cards[cards.length - 1]);
  updatePositions();
});
