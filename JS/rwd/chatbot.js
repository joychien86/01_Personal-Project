document.addEventListener("DOMContentLoaded", function () {
    const chatbot = document.getElementById("chatbot");
    const toggleButton = document.getElementById("chatbot_toggle");
    const messageBox = document.getElementById("message-box");
    const inputField = document.getElementById("message");
    const sendButton = document.querySelector(".input-send"); // 取得傳送按鈕
    let hasShownWelcomeMessage = false;
    let running = false;

    // Chatbot 展開與收起
    toggleButton.addEventListener("click", function () {
        if (chatbot.classList.contains("collapsed")) {
            chatbot.classList.remove("collapsed");
            chatbot.classList.add("expanded");

            // 首次展開時顯示歡迎訊息
            if (!hasShownWelcomeMessage) {
                setTimeout(() => {
                    addResponseMsg("歡迎來到 FURRY PLANET 毛絨星球！歡迎交流發問～");
                }, 500);
                hasShownWelcomeMessage = true;
            }
        } else {
            chatbot.classList.remove("expanded");
            chatbot.classList.add("collapsed");
        }
    });

    // 送出訊息功能
    function send() {
        const msg = inputField.value.trim();
        if (!msg || running) return;

        running = true;
        addMsg(msg);
        setTimeout(() => generateResponse(msg), 1000);
    }

    // 添加使用者訊息
    function addMsg(msg) {
        const div = document.createElement("div");
        div.className = "chat-message-div";
        div.innerHTML = `<div class="chat-message-sent">${msg}</div>`;
        messageBox.appendChild(div);
        inputField.value = ""; // 清空輸入框
        scrollToBottom();
    }

    // 添加回應訊息
    function addResponseMsg(msg) {
        const div = document.createElement("div");
        div.className = "chat-message-div";
        div.innerHTML = `<div class="chat-message-received">${msg}</div>`;
        messageBox.appendChild(div);
        scrollToBottom();
        running = false;
    }

   // 根據使用者輸入生成回應
   function generateResponse(msg) {
    const greetingKeywords = ["你好", "hi", "hello", "嗨", "安安", "嗨嗨", "test"];
    const byeKeywords = ["掰掰","拜拜", "bye", "再見", "byebye","謝謝"];
    const careKeywords = ["如何養天竺鼠", "如飼養兔子", "飼養天竺鼠", "飼養兔子", "養兔子", "養天竺鼠", "飼養須知","飼養注意事項","養兔子注意事項","養天竺鼠注意事項"];
    const breedKeywords = ["天竺鼠品種", "兔子品種", "品種", "有哪些品種", "不同品種", "品種介紹","兔子有哪些品種","天竺鼠有哪些品種"];
    const healthKeywords = ["天竺鼠疾病", "兔子疾病", "特寵醫院", "天竺鼠醫院", "兔子醫院", "醫院介紹", "醫院", "醫院推薦"];
    const adoptionKeywords = ["如何領養", "領養", "領養機構", "想領養","領養兔子","領養天竺鼠"];
    const brandKeywords = ["品牌推薦", "兔子品牌", "天竺鼠品牌", "品牌", "推薦品牌", "兔子用品", "天竺鼠用品"];
    const authorKeywords = ["你是誰", "網站作者是誰", "其他", "作者"];


    if (greetingKeywords.some(keyword => msg.toLowerCase().includes(keyword))) {
        addResponseMsg("Hi~親愛的朋友~歡迎降落 FURRY PLANET 毛絨星球，有任何關於鼠兔的疑難雜症都可以問我喔~");
    } else if (byeKeywords.some(keyword => msg.toLowerCase().includes(keyword))) {
        addResponseMsg("感謝您的參訪！毛絨星球期待您下次蒞臨！");
    } else if(careKeywords.some(keyword => msg.includes(keyword))) {
        addResponseMsg("您可以參考我們的＂飼養須知＂頁面，了解天竺鼠/兔子的飼養方法、飲食需求和所需設備！");
    } else if (breedKeywords.some(keyword => msg.includes(keyword))) {
        addResponseMsg("我們的＂品種介紹＂頁面詳細介紹了常見的兔子和天竺鼠品種，包含習性、個性和外貌特徵、歡迎前往參考！");
    } else if (healthKeywords.some(keyword => msg.includes(keyword))) {
        addResponseMsg("我們提供了全台詳細的醫療資訊，及特寵醫院列表，請至＂醫院一覽＂參考！");
    } else if (adoptionKeywords.some(keyword => msg.includes(keyword))) {
        addResponseMsg("我們支持領養代替購買，提供了領養機構的資訊在＂領養途徑＂供您參考呦～");
    } else if (brandKeywords.some(keyword => msg.includes(keyword))) {
        addResponseMsg("我們整理了提供鼠兔優質的飼料和用品的大品牌，請至＂品牌推薦＂參考呦～");
    } else if (authorKeywords.some(keyword => msg.includes(keyword))) {
        addResponseMsg("＂關於作者＂就可以看到這顆星球的建立者呦！希望您會喜歡在這顆星球上探索的一切～有任何問題都歡迎跟我們聯繫！");
    } else {
        addResponseMsg("抱歉星球管理人員外出巡航中，等宇宙巡航回來就立刻回覆您！歡迎您先在本星球到處走走逛逛～謝謝～");
    }
}


    // 滾動到底部
    function scrollToBottom() {
        messageBox.scrollTop = messageBox.scrollHeight;
    }

    // 綁定 Enter 鍵送出訊息
    inputField.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            send();
        }
    });

    // 綁定按鈕點擊事件
    sendButton.addEventListener("click", function () {
        send(); // 按下按鈕時觸發送出訊息
    });

    // 確保按鈕在頁面加載完成後顯示
    toggleButton.classList.add("show");
    toggleButton.classList.remove("hide");
});
