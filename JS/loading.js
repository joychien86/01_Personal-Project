document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const body = document.body;

    // 初始化 loader 的透明度和可見性
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.transition = "opacity 1s ease-in-out, visibility 1s ease-in-out";

    // 判斷是否首次訪問
    const hasVisited = sessionStorage.getItem("hasVisited");

    // 判斷屏幕寬度是否小於等於 820px
    const isSmallScreen = window.innerWidth <= 820;

    if (isSmallScreen) {
        // 小屏設備直接跳過加載動畫
        loader.style.display = "none";
        body.classList.add("loaded");
    } else if (!hasVisited) {
        // 首次訪問顯示加載動畫（含淡入效果）
        setTimeout(() => {
            loader.style.opacity = "1"; // 淡入效果
            loader.style.visibility = "visible";
        }, 100); // 確保 DOM 加載後觸發

        // 加載動畫持續 2 秒後淡出
        setTimeout(() => {
            loader.style.opacity = "0"; // 淡出效果
            loader.style.visibility = "hidden";
            setTimeout(() => {
                loader.style.display = "none"; // 完全隱藏
                body.classList.add("loaded"); // 啟用主頁面動畫
            }, 1000); // 等待淡出完成
        }, 3000); // 動畫顯示持續 3 秒

        // 保存首次訪問狀態
        sessionStorage.setItem("hasVisited", "true");
    } else {
        // 非首次訪問直接進入首頁
        loader.style.display = "none";
        body.classList.add("loaded");
    }
});
