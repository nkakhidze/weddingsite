document.addEventListener("DOMContentLoaded", () => {
  const jsonPath = "../db/wishes.json";

  fetch(jsonPath)
    .then(res => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(wishesData => {
      document.querySelectorAll(".guest").forEach(guest => {
        // 1) забираем строку "id1,id2,..." и делаем массив ['id1','id2',...]
        const ids = guest.dataset.ids
          .split(",")
          .map(s => s.trim())
          .filter(Boolean);

        // 2) для каждого id достаём пожелание или undefined
        const found = ids
          .map(id => wishesData[id])
          .filter(text => text && text.trim());  // оставляем только непустые

        let html;
        if (found.length > 0) {
          // если хоть одно есть — выводим только их
          html = found.map(t => `<p>${t}</p>`).join("");
        } else {
          // если ничего не нашлось — один дефолт
          html = `<p>Не стали напрягать бота :)</p>`;
        }

        guest.querySelector(".wish").innerHTML = html;
      });
    })
    .catch(err => console.error("Ошибка при загрузке JSON:", err));
});
