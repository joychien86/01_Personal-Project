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

        if (greetingKeywords.some(keyword => msg.toLowerCase().includes(keyword))) {
            addResponseMsg("Hi~親愛的朋友~歡迎降落 FURRY PLANET 毛絨星球，有任何關於鼠兔的疑難雜症都可以問我喔~");
        } else if (byeKeywords.some(keyword => msg.toLowerCase().includes(keyword))) {
            addResponseMsg("感謝您的參訪！毛絨星球期待您下次蒞臨！");
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
