document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".guest-grid");
  if (!grid) return;

  // Получаем массив элементов .guest
  const guests = Array.from(grid.querySelectorAll(".guest"));

  // Функция тасования Фишера–Йейтса
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Перемешиваем
  shuffle(guests);

  // Очищаем контейнер и добавляем в новом порядке
  grid.innerHTML = "";
  guests.forEach(guest => grid.appendChild(guest));
});


// 1) Функция, которая скрывает все .enlarged
function hideAllEnlarged() {
  document.querySelectorAll('.guest .enlarged').forEach(overlay => {
    // инлайн-стили перекрывают CSS hover
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  });
}

// 2) При клике в документе (не важно куда) — прячем все оверлеи,
//    но только если клик не внутри .enlargedContent (чтобы, например,
//    клик по тексту не сразу закрывал)
document.addEventListener('click', e => {
  if (!e.target.closest('.guest .enlargedContent')) {
    hideAllEnlarged();
  }
});

// 3) А при заходе мыши на любой гостевой блок
//    «сбросим» инлайн-стили, чтобы CSS hover мог показать оверлей
document.querySelectorAll('.guest').forEach(guest => {
  const overlay = guest.querySelector('.enlarged');
  guest.addEventListener('mouseenter', () => {
    overlay.style.removeProperty('opacity');
    overlay.style.removeProperty('pointer-events');
  });
});