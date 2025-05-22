import { sendPrivateMessage, ws } from "./websocket.js";

const unreadMessages = new Map();
let offset = 0;
const limit = 10;
let typingTimeout;

export async function chatBox(nickname) {
  // Effacer les notifications
  clearNotifications(nickname);

  // Get the "users" container element
  const app = document.getElementById("users");

  // Set up the chat interface for the selected user
  app.innerHTML = `
      <h2>Chat avec ${nickname}</h2>
      <div id="chatBox" style="overflow-y: auto; height: 400px; border: 1px solid #ccc; padding: 10px;"></div>
      <input type="text" id="messageInput" placeholder="Votre message..." style="width: 80%; margin-top: 10px;">
      <button id="sendMessage" style="width: 18%; margin-top: 10px;">Envoyer</button>
    `;

  // Get references to the newly created elements
  const sendMessageButton = document.getElementById("sendMessage");
  const messageInput = document.getElementById("messageInput");
  const chatBox = document.getElementById("chatBox");

  // Store the nickname in the chatBox dataset for context
  chatBox.dataset.nickname = nickname;

  // Add an event listener to detect typing and send a typing signal
  messageInput.addEventListener("input", () => {
    sendTypingSignal(nickname);
  });

  offset = 0; // Reset offset when opening a new chat

  // Load initial messages
  await loadMessages(nickname);

  // Add scroll event listener for loading more messages
  chatBox.addEventListener(
    "scroll",
    throttle(async () => {
      if (chatBox.scrollTop === 0) {
        await loadMessages(nickname);
      }
    }, 500)
  );

  // Send message functionality
  sendMessageButton.addEventListener("click", async () => {
    const message = messageInput.value.trim();
    clearTimeout(typingTimeout);
    ws.send(
      JSON.stringify({
        type: "typing",
        receiver: nickname,
        content: "false",
      })
    );
    if (message) {
      await sendPrivateMessage(nickname, message);
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", "sent-message");
      messageElement.innerHTML = `
        <div class="message-content sent">
          <p>${message}</p>
          <span class="date">${new Date().toLocaleString()}</span>
        </div>
      `;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
      messageInput.value = ""; // Clear the input after sending
    }
  });
}

async function loadMessages(nickname) {
  const chatBox = document.getElementById("chatBox");
  const response = await fetch(
    `/messages/${nickname}?limit=${limit}&offset=${offset}`
  );
  if (response.ok) {
    const messages = await response.json();

    // Vérifiez si messages est un tableau valide
    if (Array.isArray(messages) && messages.length > 0) {
      offset += limit;

      // Les messages sont ajoutés dans l'ordre chronologique
      messages.reverse(); // Inverser l'ordre pour afficher les plus anciens en haut

      const fragment = document.createDocumentFragment();
      messages.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        // Vérifier si le message est envoyé ou reçu
        if (message.sender === nickname) {
          messageElement.classList.add("received-message");
          messageElement.innerHTML = `
            <div class="message-content received">
              <p>${message.content}</p>
              <span class="date">${new Date(
                message.created_at
              ).toLocaleString()}</span>
            </div>
          `;
        } else {
          messageElement.classList.add("sent-message");
          messageElement.innerHTML = `
            <div class="message-content sent">
              <p>${message.content}</p>
              <span class="date">${new Date(
                message.created_at
              ).toLocaleString()}</span>
            </div>
          `;
        }

        fragment.appendChild(messageElement);
      });

      chatBox.prepend(fragment);

      // Scroll to the bottom only on the first load
      if (offset === limit) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }
  } else {
    console.error("Erreur lors de la récupération des messages");
  }
}

export function incrementUnreadMessages(sender) {
  const count = unreadMessages.get(sender) || 0;
  unreadMessages.set(sender, count + 1);
}

export function updateNotificationBadge(sender) {
  const users = document.getElementById("users");
  const first = users.children[0];
  if (first.firstChild.dataset.nickname != sender) {
    for (let i = 0; i < users.children.length; i++) {
      let user = users.children[i];
      if (user.firstChild.dataset.nickname == sender) {
        users.removeChild(user);
        users.insertBefore(user, first);
      }
    }
  }
  const userDiv = document.querySelector(
    `.users_user .nickname[data-nickname="${sender}"]`
  )?.parentElement;
  if (!userDiv) return;

  let badge = userDiv.querySelector(".notification-badge");
  const count = unreadMessages.get(sender) || 0;

  if (!badge) {
    badge = document.createElement("div");
    badge.className = "notification-badge";
    userDiv.appendChild(badge);
  }

  badge.textContent = count;
  badge.classList.add("active");
  badge.classList.add("pulse");
  setTimeout(() => badge.classList.remove("pulse"), 500);
}

function clearNotifications(sender) {
  unreadMessages.delete(sender);
  const userDiv = document.querySelector(
    `.users_user .nickname[data-nickname="${sender}"]`
  )?.parentElement;
  if (!userDiv) return;

  const badge = userDiv.querySelector(".notification-badge");
  if (badge) {
    badge.classList.remove("active");
  }
}

// Throttle function to limit scroll event calls
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          ws.send(
            JSON.stringify({
              type: "typing",
              receiver: nickname,
              content: "false",
            })
          );
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Function to display typing indicator
function sendTypingSignal(nickname) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "typing",
        receiver: nickname,
        content: "true",
      })
    );
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      ws.send(
        JSON.stringify({
          type: "typing",
          receiver: nickname,
          content: "false",
        })
      );
    }, 2000);
  }
}

// Show typing indicator
export function showTypingIndicator(sender) {
  const chatBox = document.getElementById("chatBox");
  if (!chatBox || chatBox.dataset.nickname !== sender) return;

  let typingDiv = document.getElementById("typing-indicator");
  if (!typingDiv) {
    typingDiv = document.createElement("div");
    typingDiv.id = "typing-indicator";
    typingDiv.style.fontStyle = "italic";
    typingDiv.style.color = "#888";
    typingDiv.textContent = `${sender} est en train d'écrire...`;
    chatBox.appendChild(typingDiv);
  } else {
    typingDiv.textContent = `${sender} est en train d'écrire...`;
  }

  // Retire l'indicateur après 2 secondes sans nouveau signal
}
