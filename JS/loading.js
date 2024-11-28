document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const body = document.body;

    // 判断是否首次访问
    const hasVisited = sessionStorage.getItem("hasVisited");

    // 判断屏幕宽度是否小于等于 820px
    const isSmallScreen = window.innerWidth <= 820;

    if (isSmallScreen) {
        // 小屏设备直接跳过加载动画
        loader.style.display = "none";
        body.classList.add("loaded");
    } else if (!hasVisited) {
        // 首次访问显示加载动画
        setTimeout(() => {
            loader.style.opacity = "0"; // 淡出效果
            loader.style.transition = "opacity 0.5s ease-in-out";
            setTimeout(() => {
                loader.style.display = "none"; // 完全隐藏
                body.classList.add("loaded"); // 启用主页面动画
            }, 500); // 等待淡出完成
        }, 2000); // 动画持续 2 秒

        // 保存首次访问状态
        sessionStorage.setItem("hasVisited", "true");
    } else {
        // 非首次访问直接进入首页
        loader.style.display = "none";
        body.classList.add("loaded");
    }
});
