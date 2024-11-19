function changeRegion(region, url) {
    // 清除所有按鈕的active狀態
    document.querySelectorAll('.button').forEach(button => {
        button.classList.remove('active');
        button.classList.add('inactive');
    });

    // 將點擊的按鈕設為active
    const activeButton = Array.from(document.querySelectorAll('.button')).find(button => button.innerText.includes(region));
    activeButton.classList.remove('inactive');
    activeButton.classList.add('active');

    // 導向到對應的區域網頁
    window.location.href = url;
}