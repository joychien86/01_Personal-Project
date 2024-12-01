// 確保 GSAP 插件載入成功
gsap.registerPlugin(Draggable);

// 取得視窗寬度
const isMobile = window.innerWidth <= 1200;

// 新功能：禁用小螢幕上的 Draggable 和拖曳相關功能
function disableDraggableOnMobile() {
    if (isMobile) {
        const draggableInstances = Draggable.get(".flair--4b img");
        if (draggableInstances) {
            draggableInstances.forEach((instance) => instance.disable());
        }
        // 徹底移除與拖曳相關的元素
        document.querySelectorAll('.follow, .follow2, .follow3, .flair--4b').forEach(el => el.remove());
        console.log("拖曳功能已在行動裝置禁用");
    }
}

// 舊功能：模擬慣性效果的函數
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

// 初始化 Draggable 功能（僅在桌面模式啟用）
function initializeDraggable() {
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

// 更新 Draggable 邊界（當視窗大小或內容變化時）
function updateDraggableBounds() {
    if (!isMobile) {
        Draggable.get(".flair--4b img").forEach((instance) => {
            instance.applyBounds(document.body);
        });
        console.log("邊界已更新，覆蓋整個 body");
    }
}

// 解決彈性滾動震動問題
function fixScrollBounce() {
    document.body.style.overscrollBehavior = "none";
    document.body.style.touchAction = "pan-y";
    console.log("彈性滾動效果已禁用");
}

// 初始化功能
function initialize() {
    disableDraggableOnMobile(); // 行動裝置禁用功能
    initializeDraggable(); // 初始化 Draggable 功能
    fixScrollBounce(); // 禁用彈性滾動
}

// 綁定事件
window.addEventListener("resize", updateDraggableBounds);
window.addEventListener("DOMContentLoaded", initialize);

// 初始化成功提示
console.log("功能初始化完成，拖曳與滾動問題解決");