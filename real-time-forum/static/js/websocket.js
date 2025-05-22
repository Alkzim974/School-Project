import { displayUsers } from "./home.js";
import { incrementUnreadMessages, updateNotificationBadge } from "./message.js";
import { showTypingIndicator } from "./message.js";

export let ws = null;

const unreadMessages = new Map(); // Pour stocker le nombre de messages non lus par utilisateur

export function InitWS() {
  ws = new WebSocket("ws://localhost:8080/ws");

  ws.onopen = function (event) {
    console.log("WebSocket is open now.");
  };

  ws.onclose = function (event) {
    console.log("WebSocket is closed now.");
    console.log("Message from server ", event);
  };

  ws.onmessage = async function (event) {
    try {
      const data = JSON.parse(event.data);
      const chatBox = document.getElementById("chatBox");
      if (data.type === "log") {
        console.log("User connection update:", data.connexion);
        displayUsers();
      } else if (data.type === "message") {
        if (chatBox && chatBox.dataset.nickname === data.sender) {
          chatBox.innerHTML += `<div class="message received-message">
            <div class="message-content received">
              <p>${data.content}</p>
              <span class="date">${new Date(
                data.created_at
              ).toLocaleString()}</span>
            </div>
          </div>`;
          chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        } else {
          // Incrémenter le compteur de messages non lus
          incrementUnreadMessages(data.sender);
          updateNotificationBadge(data.sender);
        }
      } else if (data.type === "typing") {
        if (data.content == "true") {
          showTypingIndicator(data.sender);
          chatBox.scrollTop = chatBox.scrollHeight;
        } else {
          let typingDiv = document.getElementById("typing-indicator");
          typingDiv.remove();
        }
      }
    } catch (e) {
      console.error("Error parsing message:", e);
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error observed:", error);
    ws.close();
  };
}

export function sendPrivateMessage(nickname, message) {
  console.log(ws);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "message",
        receiver: nickname,
        content: message,
        created_at: new Date(),
      })
    );
  } else {
    console.error("WebSocket is not open. Cannot send message.");
  }
}
