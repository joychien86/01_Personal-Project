document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const body = document.body;

    // 檢查 Local Storage 中是否有訪問過的標記
    const hasVisited = sessionStorage.getItem("hasVisited"); // 使用 sessionStorage 代替 localStorage

    if (!hasVisited) {
        // 如果沒有訪問過，顯示 Loading 動畫
        setTimeout(() => {
            loader.style.opacity = "0"; // 淡出效果
            loader.style.transition = "opacity 0.5s ease-in-out";
            setTimeout(() => {
                loader.style.display = "none"; // 完全隱藏
                body.classList.add("loaded"); // 啟用主頁動畫
            }, 500); // 等待淡出完成
        }, 2000); // Loading 動畫持續時間 (2 秒)

        // 設置標記，表示用戶已訪問過當前 Session
        sessionStorage.setItem("hasVisited", "true");
    } else {
        // 如果已訪問過，直接隱藏 Loader 並顯示主頁
        loader.style.display = "none";
        body.classList.add("loaded");
    }
});
