document.addEventListener("DOMContentLoaded", function () {
    let running = false;
  
    // 送出訊息
    function send() {
      if (running) return; // 防止重複執行
      const msg = document.getElementById("message").value.trim();
      if (msg === "") return; // 空白訊息不處理
      running = true;
  
      addMsg(msg); // 添加使用者訊息
      setTimeout(() => addResponseMsg(msg), 1000); // 模擬回應延遲
    }
  
    // 添加使用者訊息
    function addMsg(msg) {
      const div = document.createElement("div");
      div.className = "chat-message-div";
      div.innerHTML = `<span style="flex-grow:1"></span>
                       <div class="chat-message-sent">${msg}</div>`;
      document.getElementById("message-box").appendChild(div);
      document.getElementById("message").value = ""; // 清空輸入框
      scrollToBottom(); // 滾動到底部
    }
  
    // 添加回應訊息
    function addResponseMsg(msg) {
      const div = document.createElement("div");
      div.className = "chat-message-div";
      div.innerHTML = `<div class="chat-message-received">You said: ${msg}</div>`;
      document.getElementById("message-box").appendChild(div);
      scrollToBottom(); // 滾動到底部
      running = false;
    }
  
    // 滾動至訊息底部
    function scrollToBottom() {
      const messageBox = document.getElementById("message-box");
      messageBox.scrollTop = messageBox.scrollHeight;
    }
  
    // 綁定 Enter 鍵送出訊息
    document.getElementById("message").addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        send();
      }
    });
  
    // Chatbot 折疊與展開切換
    document.getElementById("chatbot_toggle").onclick = function () {
      const chatbot = document.getElementById("chatbot");
      const icons = this.children;
      if (chatbot.classList.contains("collapsed")) {
        chatbot.classList.remove("collapsed");
        icons[0].style.display = "none";
        icons[1].style.display = "block";
        setTimeout(() => addResponseMsg("歡迎來到 FURRY PLANET 毛絨星球！歡迎交流發問～"), 1000); // 展開時自動顯示歡迎訊息
      } else {
        chatbot.classList.add("collapsed");
        icons[0].style.display = "block";
        icons[1].style.display = "none";
      }
    };
  
    // 綁定送出按鈕
    document.querySelector(".input-send").addEventListener("click", send);
  });



