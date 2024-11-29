$(document).ready(function () {
    const menu = $('.menu-list');
    const hamburger = $('#hamburger-menu');

    // 點擊漢堡選單
    hamburger.click(function () {
        if (menu.hasClass('open')) {
            menu.removeClass('open'); // 收回菜單 (向右移出)
        } else {
            menu.addClass('open'); // 展開菜單 (向左進入)
        }
        hamburger.toggleClass('open'); // 切換漢堡按鈕狀態
    });

    // 點擊子選單的 `+` 號展開/收回
    $('.accordion-toggle').click(function (e) {
        e.stopPropagation(); // 防止冒泡影響父級事件
        const submenu = $(this).next('.accordion-content');
        submenu.slideToggle(300); // 平滑展開/收回子選單
        $(this).toggleClass('active'); // 切換激活狀態
        const toggleIcon = $(this).find('.icon-toggle');
        toggleIcon.text(toggleIcon.text() === '+' ? '-' : '+'); // 切換符號
    });

    // 點擊空白區域關閉菜單
    $(document).click(function (e) {
        if (!$(e.target).closest('#menu-container').length && menu.hasClass('open')) {
            menu.removeClass('open');
            hamburger.removeClass('open');
        }
    });
});