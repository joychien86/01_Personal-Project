// 禁用緩存與修正滾動行為
function fixScrollAndCacheIssues() {
    // 禁用彈性滾動
    document.body.style.overscrollBehavior = "none";
    document.body.style.touchAction = "pan-y";
    document.body.style.margin = "0";

    // 強制觸發 resize 事件
    window.dispatchEvent(new Event('resize'));

    // 修正高度
    adjustBodyHeight();
    console.log("緩存與滾動行為修正完成");
}

// 校正高度
function adjustBodyHeight() {
    const viewportHeight = window.innerHeight;
    const contentHeight = document.body.scrollHeight;

    if (contentHeight < viewportHeight) {
        document.body.style.minHeight = `${viewportHeight}px`;
    } else {
        document.body.style.minHeight = '';
    }
    console.log("頁面高度校正完成");
}

// 禁用小螢幕的 Draggable 功能
function disableDraggableOnMobile() {
    const isMobile = window.innerWidth <= 1200;
    if (isMobile) {
        const draggableInstances = Draggable.get(".flair--4b img");
        if (draggableInstances) {
            draggableInstances.forEach((instance) => instance.disable());
        }
        document.querySelectorAll('.follow, .follow2, .follow3, .flair--4b').forEach(el => el.remove());
        console.log("拖曳功能已在行動裝置禁用");
    }
}

// 初始化 Draggable 功能
function initializeDraggable() {
    const isMobile = window.innerWidth <= 1200;
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
    const velocity = draggable.getVelocity();
    const target = draggable.target;
    const bounds = target.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalX = parseFloat(target._gsTransform.x || 0) + velocity.x * 0.5;
    let finalY = parseFloat(target._gsTransform.y || 0) + velocity.y * 0.5;

    if (bounds.left + velocity.x * 0.5 < 0) {
        finalX = -bounds.left;
    }
    if (bounds.top + velocity.y * 0.5 < 0) {
        finalY = -bounds.top;
    }
    if (bounds.right + velocity.x * 0.5 > viewportWidth) {
        finalX -= (bounds.right + velocity.x * 0.5 - viewportWidth);
    }
    if (bounds.bottom + velocity.y * 0.5 > viewportHeight) {
        finalY -= (bounds.bottom + velocity.y * 0.5 - viewportHeight);
    }

    gsap.to(target, {
        x: finalX,
        y: finalY,
        duration: 0.5,
        ease: "power2.out",
    });
}

// 禁用緩存
function disableCache() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => registration.unregister());
        });
        caches.keys().then((names) => {
            for (let name of names) {
                caches.delete(name);
            }
        });
        console.log("已清除 Service Worker 和緩存");
    }
}

// 初始化功能
function initialize() {
    fixScrollAndCacheIssues(); // 修正滾動與緩存問題
    disableDraggableOnMobile(); // 行動裝置禁用拖曳
    initializeDraggable(); // 初始化拖曳功能
    disableCache(); // 禁用緩存
}

// 更新 Draggable 邊界
function updateDraggableBounds() {
    const isMobile = window.innerWidth <= 1200;
    if (!isMobile) {
        Draggable.get(".flair--4b img").forEach((instance) => {
            instance.applyBounds(document.body);
        });
        console.log("邊界已更新，覆蓋整個 body");
    }
}

// 綁定事件
window.addEventListener('DOMContentLoaded', initialize);
window.addEventListener('resize', () => {
    adjustBodyHeight();
    updateDraggableBounds();
});

// 初始化成功提示
console.log("功能初始化完成，拖曳與滾動問題解決");
