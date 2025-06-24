document.addEventListener('DOMContentLoaded', () => {
const btn  = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    // переключаем открытость
    menu.classList.toggle('open');
    // при желании меняем внешний вид самого бургера:
    btn.classList.toggle('open');
});

// (опционально) — закрывать меню при клике на ссылку внутри него
menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
);
});
