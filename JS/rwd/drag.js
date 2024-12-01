// 確保 GSAP 插件載入成功
gsap.registerPlugin(Draggable);

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

// 初始化 Draggable
Draggable.create(".flair--4b img", {
    type: "x,y", // 允許水平與垂直方向拖動
    bounds: document.body, // 限制拖曳範圍為 body
    onDragEnd: function () {
        simulateInertia(this); // 模擬慣性效果
        console.log("停止拖曳，慣性模擬完成");
    },
    edgeResistance: 0.5, // 增加邊界阻力
});

// 當視窗大小或內容大小改變時動態更新邊界
window.addEventListener("resize", () => {
    Draggable.get(".flair--4b img").forEach((instance) => {
        instance.applyBounds(document.body);
    });
    console.log("邊界已更新，覆蓋整個 body");
});

// 初始化成功提示
console.log("Draggable 功能已初始化，慣性效果模擬完成");