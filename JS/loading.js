document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const body = document.body;

    // 模擬資源加載，延遲 2 秒後移除 loader
    setTimeout(() => {
        loader.style.opacity = "0"; // 淡出效果
        loader.style.transition = "opacity 0.5s ease-in-out";
        setTimeout(() => {
            loader.style.display = "none"; // 完全隱藏
            body.classList.add("loaded"); // 觸發主頁內容的動畫
        }, 500); // 等待淡出完成
    }, 4000); // 設定 Loading 停留時間 (2 秒)
});