// 確保 GSAP 插件載入成功
gsap.registerPlugin(Draggable, InertiaPlugin);

// 定義邊界回彈函數
function enforceBounds(element) {
    const bounds = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 計算需要校正的偏移量
    const corrections = {
        x: 0,
        y: 0,
    };
    if (bounds.left < 0) {
        corrections.x = Math.abs(bounds.left);
    }
    if (bounds.top < 0) {
        corrections.y = Math.abs(bounds.top);
    }
    if (bounds.right > viewportWidth) {
        corrections.x = -(bounds.right - viewportWidth);
    }
    if (bounds.bottom > viewportHeight) {
        corrections.y = -(bounds.bottom - viewportHeight);
    }

    // 回彈到螢幕範圍內
    if (corrections.x || corrections.y) {
        gsap.to(element, {
            x: `+=${corrections.x}`,
            y: `+=${corrections.y}`,
            duration: 0.3,
            ease: "power3.out",
        });
    }
}

// 初始化 Draggable
Draggable.create(".flair--4b img", {
    type: "x,y", // 允許水平與垂直方向拖動
    inertia: true, // 開啟慣性效果
    bounds: document.body, // 限制拖曳範圍為 body
    edgeResistance: 1, // 防止超出邊界
    onDrag: function () {
        enforceBounds(this.target); // 即時回彈防止超出螢幕範圍
    },
    onDragEnd: function () {
        enforceBounds(this.target); // 結束拖動時再檢查
        console.log(".flair--4b img 停止拖動，位置已校正");
    },
});

// 當視窗大小或內容大小改變時動態更新邊界
window.addEventListener("resize", () => {
    Draggable.get(".flair--4b img").forEach((instance) => {
        instance.applyBounds(document.body);
        enforceBounds(instance.target); // 更新邊界後重新校正位置
    });
    console.log("邊界已更新，覆蓋整個 body");
});

// 初始化成功提示
console.log("Draggable 功能已初始化，拖曳範圍限制為螢幕內，拖曳與回彈優化完成");