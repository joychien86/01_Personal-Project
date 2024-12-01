// 確保插件載入成功
gsap.registerPlugin(Draggable, InertiaPlugin);

// 設定 Draggable 效果
Draggable.create(".flair--1", {
    type: "x", // 僅允許水平拖動
    bounds: ".container", // 限制拖動範圍在 container 內
    onDrag: function () {
        console.log("flair--1 正在拖動");
    }
});

Draggable.create(".flair--3b", {
    type: "rotation", // 旋轉效果
    inertia: true, // 惯性效果
    onDrag: function () {
        console.log("flair--3b 正在旋轉");
    }
});

Draggable.create(".flair--4b", {
    bounds: ".container09", // 限制拖動範圍
    inertia: true, // 惯性效果
    onDrag: function () {
        console.log("flair--4b 正在拖動");
    }
});

console.log("JavaScript 加載成功");



