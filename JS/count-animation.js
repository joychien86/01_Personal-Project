document.addEventListener("DOMContentLoaded", function () {
    const statNumbers = document.querySelectorAll(".stat-number");

    const animateCount = (el) => {
        const target = parseInt(el.getAttribute("data-count")); // 目標數字
        const duration = 2000; // 動畫持續時間
        const startValue = 0;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // 進度（0~1）
            const currentValue = Math.floor(progress * (target - startValue) + startValue);
            el.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target; // 確保最後顯示目標值
            }
        };

        requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    observer.unobserve(entry.target); // 確保只執行一次
                }
            });
        },
        { threshold: 0.5 } // 當元素進入視窗 50% 時觸發
    );

    statNumbers.forEach((stat) => observer.observe(stat));
});