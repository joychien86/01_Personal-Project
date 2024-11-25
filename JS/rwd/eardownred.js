
$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        items: 1,               // 每次顯示一張圖片
        loop: true,             // 循環播放
        autoplay: true,         // 自動播放
        autoplayTimeout: 3000,  // 自動播放時間間隔（毫秒）
        autoplayHoverPause: true, // 滑鼠懸停暫停
        dots: true,             // 啟用點導航
        nav: false              // 禁用左右箭頭
    });
});

