document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('.top > .fa'); // 漢堡選單圖示
    const menu = document.querySelector('header nav ul'); // 主選單

    // 點擊漢堡選單，切換選單顯示或隱藏
    burgerIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止事件冒泡
        menu.classList.toggle('open'); // 切換 .open 類名
    });

    // 點擊主選單項目時展開或收起子選單
    const menuItems = document.querySelectorAll('header nav ul > li');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止事件冒泡
            const submenu = item.querySelector('.submenu'); // 找到子選單
            if (submenu) {
                submenu.classList.toggle('show'); // 切換子選單顯示狀態
            }
        });
    });

    // 點擊文檔其他地方時收起選單
    document.addEventListener('click', (e) => {
        // 如果點擊不在菜單或漢堡按鈕內部
        if (!menu.contains(e.target) && !burgerIcon.contains(e.target)) {
            menu.classList.remove('open'); // 隱藏選單
        }
    });

    // 滑動時自動收起選單
    document.addEventListener('scroll', () => {
        menu.classList.remove('open'); // 隱藏選單
    });
});