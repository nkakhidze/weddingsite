let prevBtn =document.querySelector(".prev");
let nextBtn =document.querySelector(".next");

nextBtn.addEventListener("click", () => {
    let cards = document.querySelectorAll(".card")

    document.querySelector(".slide").appendChild(cards[0]);

})

prevBtn.addEventListener("click", () => {
    let cards = document.querySelectorAll(".card")

    document.querySelector(".slide").prepend(cards[cards.length - 1]);
    
})