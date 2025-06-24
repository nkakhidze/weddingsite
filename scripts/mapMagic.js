document.addEventListener('DOMContentLoaded', function(){
  // 1) здесь перечисляем все пути к вашим картинкам
  const images = [
    'img/dekor/map/1.png',
    'img/dekor/map/5.5.jpg',
    'img/dekor/map/10.jpg',
    'img/dekor/map/18.jpg'
  ];

  // 2) здесь ваши описания — можно форматировать переносами строк
  const descriptions = [
  `<strong>Архипелаг Стихий</strong>
Надеемся, вы готовы отправиться в грандиозное путшествие! Коротко объясним правила. Перед вами общая карта: Расколотый Архипелаг Стихий – четыре острова под властью льда, леса, песка и лавы. Наша общая задача — восстановить древний баланс.`,
  
  `<strong>Локация 1. Парящий Небесный Оазис</strong>
Парящий Небесный Оазис купается в облаках, а его водопады уносят кристальную воду в недра древних лесов. Спрыгните с края острова, поймайте чашу с эссенцией Жизни и доставьте её в Храм Ветра, пока поток не закрыл проход навсегда.`,
  
  `<strong>Локация 2. Континент Четырёх Стихий</strong>
Здесь на одной земле соседят пепельные пустоши, ледяные пики, знойные дюны и тёмные болота у подножия водоворота. Вам нужно пройти четыре испытания Духа Стихий, собрать их эмблемы и зажечь Алтарь Вечных Вод в центре сверкающего озера, прежде чем вихрь поглотит остров.`,
  
`Но всё это в другой раз :) В июле 12 числа мы все дружно заряжаемся в автобус и мчим на праздник в ресторан "Кедр" 🎉`
];

  let current = 0;
  const mapMagic = document.getElementById('mapMagic');
  const mapHint  = document.getElementById('mapHint');

  // Открываем оверлей
  function openSlider(){
    current = 0;
    // создаём обёртку
    const overlay = document.createElement('div');
    overlay.id = 'sliderOverlay';

    // картинка
    const img = document.createElement('img');
    img.id = 'sliderImage';
    img.src = images[current];
    overlay.appendChild(img);

    // подпись
    const caption = document.createElement('div');
    caption.id = 'sliderCaption';
    caption.innerHTML = descriptions[current];
    overlay.appendChild(caption);

    document.body.appendChild(overlay);

    // как минимум первый раз убираем подсказку
    mapHint.classList.add('hidden');

    // клики по оверлею → далее
    overlay.addEventListener('click', nextSlide);

    // ESC → закрыть
    document.addEventListener('keydown', escHandler);

    // свайп вниз/вверх на мобильных — тоже закрыть
    let sx = 0, sy = 0;
    overlay.addEventListener('touchstart', e=>{
      sx = e.changedTouches[0].screenX;
      sy = e.changedTouches[0].screenY;
    });
    overlay.addEventListener('touchend', e=>{
      const dx = e.changedTouches[0].screenX - sx;
      const dy = e.changedTouches[0].screenY - sy;
      if (Math.abs(dy) > 50 || Math.abs(dx) > 50) {
        closeSlider();
      }
    });
  }

  // показать следующий слайд или закрыть
  function nextSlide(){
    current++;
    if (current < images.length){
      document.getElementById('sliderImage').src = images[current];
      document.getElementById('sliderCaption').innerHTML = descriptions[current];
    } else {
      closeSlider();
    }
  }

  // ESC-handler
  function escHandler(e){
    if (e.key === 'Escape') closeSlider();
  }

  // закрываем и убираем слушатели
  function closeSlider(){
    const ov = document.getElementById('sliderOverlay');
    if (ov) ov.remove();
    document.removeEventListener('keydown', escHandler);
  }

  // по клику на мини-карту открываем
  mapMagic.addEventListener('click', openSlider);
});