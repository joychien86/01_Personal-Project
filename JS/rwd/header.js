document.addEventListener('DOMContentLoaded', () => {
    const burgerIcon = document.querySelector('.hamburger'); // 获取汉堡按钮
    const menu = document.querySelector('header nav ul'); // 获取菜单

    // 点击汉堡按钮，切换菜单
    burgerIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        burgerIcon.classList.toggle('active'); // 切换汉堡动画
        menu.classList.toggle('open'); // 切换菜单滑动
    });

    // 点击页面其他区域时隐藏菜单
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !burgerIcon.contains(e.target)) {
            menu.classList.remove('open'); // 隐藏菜单
            burgerIcon.classList.remove('active'); // 恢复汉堡按钮状态
        }
    });

    // 滚动页面时隐藏菜单
    document.addEventListener('scroll', () => {
        menu.classList.remove('open'); // 隐藏菜单
        burgerIcon.classList.remove('active'); // 恢复汉堡按钮状态
    });

    // 子菜单显示/隐藏逻辑
    const menuItems = document.querySelectorAll('header nav ul > li');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            const submenu = item.querySelector('.submenu'); // 获取子菜单
            if (submenu) {
                submenu.classList.toggle('show'); // 切换子菜单显示状态
            }
        });
    });
});