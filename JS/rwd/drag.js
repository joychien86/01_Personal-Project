// 修復頁面高度不足問題
function fixBodyHeight() {
    const viewportHeight = window.innerHeight; // 獲取視窗高度
    const bodyHeight = document.body.scrollHeight; // 獲取內容總高度

    // 如果內容高度小於視窗高度，則設置最小高度
    if (bodyHeight <= viewportHeight) {
        document.body.style.minHeight = `${viewportHeight}px`;
    } else {
        document.body.style.minHeight = ""; // 清除先前設置的最小高度
    }
}

// 禁用邊界反彈滾動效果
function fixScrollBounce() {
    document.body.style.overscrollBehavior = "contain"; // 禁止滾動彈性效果
    document.documentElement.style.overscrollBehavior = "contain"; // 禁用根元素的彈性
    document.body.style.touchAction = "manipulation"; // 限制手勢操作
}

// 禁用小螢幕的拖曳功能
function disableDraggableOnMobile() {
    const isMobile = window.innerWidth <= 1200; // 定義行動裝置條件

    if (isMobile) {
        // 禁用 Draggable 功能
        const draggableInstances = Draggable.get(".flair--4b img");
        if (draggableInstances) {
            draggableInstances.forEach((instance) => instance.disable());
        }
        // 徹底移除與拖曳相關的元素
        document.querySelectorAll('.follow, .follow2, .follow3, .flair--4b').forEach(el => el.remove());
        console.log("拖曳功能已在行動裝置禁用");
    }
}

// 初始化 Draggable 功能（僅在桌面模式啟用）
function initializeDraggable() {
    const isMobile = window.innerWidth <= 1200; // 定義行動裝置條件

    if (!isMobile) {
        Draggable.create(".flair--4b img", {
            type: "x,y", // 允許水平與垂直方向拖動
            bounds: document.body, // 限制拖曳範圍為 body
            onDragEnd: function () {
                simulateInertia(this); // 模擬慣性效果
                console.log("停止拖曳，慣性模擬完成");
            },
            edgeResistance: 0.5, // 增加邊界阻力
        });
        console.log("拖曳功能已啟用");
    }
}

// 模擬慣性效果的函數
function simulateInertia(draggable) {
    const velocity = draggable.getVelocity(); // 獲取當前速度
    const target = draggable.target;
    const bounds = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalX = parseFloat(target._gsTransform.x || 0) + velocity.x * 0.5; // 根據速度計算最終位置
    let finalY = parseFloat(target._gsTransform.y || 0) + velocity.y * 0.5;

    // 檢查邊界，防止超出螢幕
    if (bounds.left + velocity.x * 0.5 < 0) {
        finalX = -bounds.left;
    }
    if (bounds.top + velocity.y * 0.5 < 0) {
        finalY = -bounds.top;
    }
    if (bounds.right + velocity.x * 0.5 > viewportWidth) {
        finalX = finalX - (bounds.right + velocity.x * 0.5 - viewportWidth);
    }
    if (bounds.bottom + velocity.y * 0.5 > viewportHeight) {
        finalY = finalY - (bounds.bottom + velocity.y * 0.5 - viewportHeight);
    }

    // 執行動畫模擬慣性
    gsap.to(target, {
        x: finalX,
        y: finalY,
        duration: 0.5,
        ease: "power2.out",
    });
}

// 綁定事件以修正滾動和高度問題
function initialize() {
    fixBodyHeight(); // 修復高度
    fixScrollBounce(); // 禁用滾動彈性
    disableDraggableOnMobile(); // 禁用小螢幕的拖曳功能
    initializeDraggable(); // 初始化拖曳功能
}

// 更新 Draggable 的邊界（當視窗大小改變時）
function updateDraggableBounds() {
    const draggableInstances = Draggable.get(".flair--4b img");
    if (draggableInstances) {
        draggableInstances.forEach((instance) => instance.applyBounds(document.body));
        console.log("邊界已更新，覆蓋整個 body");
    }
}

// 監聽視窗事件
window.addEventListener("resize", () => {
    fixBodyHeight(); // 更新頁面高度
    updateDraggableBounds(); // 更新 Draggable 邊界
});
window.addEventListener("DOMContentLoaded", initialize); // 頁面加載完成後初始化

// 初始化完成提示
console.log("功能初始化完成，滾動與拖曳問題解決");