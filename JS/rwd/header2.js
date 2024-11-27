$(document).ready(function () {
    // 选择所有菜单项和标题
    var $els = $('.rwd-menu a, .rwd-menu .rwd-menu-header');
    var count = $els.length;
    var grouplength = Math.ceil(count / 3); // 每组菜单项数
    var groupNumber = 0;
    var i = 1;

    // 设置自定义 CSS 变量
    $('.rwd-menu').css('--count', count + '');
    $els.each(function (j) {
        if (i > grouplength) {
            groupNumber++;
            i = 1;
        }
        $(this).attr('data-group', groupNumber);
        i++;
        console.log("Element", j, "assigned to group", groupNumber); // 调试输出
    });

    // 绑定切换菜单的功能
    function toggleMenu() {
        $els.each(function (j) {
            $(this).css('--top', $(this)[0].getBoundingClientRect().top + ($(this).attr('data-group') * -15) - 20);
            $(this).css('--delay-in', j * 0.1 + 's');
            $(this).css('--delay-out', (count - j) * 0.1 + 's');
        });
        $('.rwd-menu').toggleClass('closed');
        console.log("Menu state toggled:", $('.rwd-menu').hasClass('closed') ? "Closed" : "Opened");
    }

    // 绑定菜单切换按钮
    $('.rwd-menu-footer button').on('click', function (e) {
        e.preventDefault();
        toggleMenu();
    });

    // 绑定「关闭菜单」选项与 footer 按钮
    $('#close-menu-option').on('click', function (e) {
        e.preventDefault();
        toggleMenu();
    });

    // 点击页面其他地方时关闭菜单
    $(document).on('click', function (e) {
        var $menu = $('.rwd-menu');
        // 检查点击是否在菜单内部
        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
            // 如果菜单是展开状态，则关闭
            if (!$menu.hasClass('closed')) {
                toggleMenu();
            }
        }
    });

    // 阻止菜单内部点击关闭菜单
    $('.rwd-menu').on('click', function (e) {
        e.stopPropagation();
    });

    // 初始动画演示
    setTimeout(function () {
        toggleMenu();
        setTimeout(function () {
            toggleMenu();
        }, (count * 100) + 500);
    }, 1000);
});