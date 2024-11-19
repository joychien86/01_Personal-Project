let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const textSlides = document.querySelectorAll(".text-slide");

function showSlide(index) {
    // 移除所有圖片和文字的 active 狀態
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        textSlides[i].classList.toggle("active", i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}