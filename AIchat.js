// Chat toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatContainer = document.querySelector('.chat-container');

  if (chatToggleBtn && chatContainer) {
    chatContainer.style.display = chatContainer.style.display || 'none';
    chatToggleBtn.addEventListener('click', function() {
      if (chatContainer.style.display === 'none') {
        chatContainer.style.display = 'block';
        chatContainer.style.animation = 'slideIn 0.3s ease forwards';
      } else {
        chatContainer.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
          chatContainer.style.display = 'none';
        }, 300);
      }
    });
  }
});

// Handle sending and receiving messages
const sendBtnEl = document.getElementById("send-button");
const userInputEl = document.getElementById("user-input");

if (sendBtnEl && userInputEl) {
  const sendMessage = async () => {
    const userInput = userInputEl.value;
    if (userInput.trim() === "") return; // Prevent sending empty messages

    // Add user message to chat box
    addMessage(userInput, "user-message");

    // Clear input field and disable button while processing
    userInputEl.value = "";
    sendBtnEl.disabled = true;

    // Show typing indicator
    const typingId = addTypingIndicator();

    try {
      const botResponse = await getBotResponse(userInput);
      removeTypingIndicator(typingId);
      addMessage(botResponse, "bot-message");
    } catch (err) {
      removeTypingIndicator(typingId);
      addMessage("Sorry, I had trouble responding just now. Please try again.", "bot-message");
      // Log error for diagnostics (visible only in dev tools)
      console.error('[Chat] sendMessage failed:', err);
    } finally {
      sendBtnEl.disabled = false;
    }
  };

  sendBtnEl.addEventListener("click", sendMessage);
  // Enter-to-send
  userInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

// Function to add message to chat box
function addMessage(message, sender) {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) return;
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  const p = document.createElement("p");
  p.textContent = message; // safer than innerHTML
  messageElement.appendChild(p);
  chatBox.appendChild(messageElement);

  // Scroll to the latest message
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing indicator helpers
function addTypingIndicator() {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) return null;
  const id = `typing-${Date.now()}`;
  const indicator = document.createElement("div");
  indicator.classList.add("chat-message", "bot-message", "typing");
  indicator.dataset.id = id;
  const p = document.createElement("p");
  p.textContent = "Typing…";
  indicator.appendChild(p);
  chatBox.appendChild(indicator);
  chatBox.scrollTop = chatBox.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  if (!id) return;
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) return;
  const el = chatBox.querySelector(`[data-id="${id}"]`);
  if (el) chatBox.removeChild(el);
}

// Mock AI response (you can replace this with actual AI API like Dialogflow or OpenAI)
async function getBotResponse(userMessage) {
  // Try calling a hosted AI function first (works with GitHub Pages if you host the API elsewhere)
  // Configure an absolute URL via window.CHAT_API_URL (e.g., https://your-func-host/api/chat)
  const apiUrl = (typeof window !== 'undefined' && window.CHAT_API_URL) || '/api/chat';

  try {
    if (apiUrl) {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.reply) return data.reply;
      }
    }
  } catch (e) {
    // Network or CORS failure – fall back to local rules
    console.warn('[Chat] API call failed, using fallback:', e);
  }

  // Fallback: simple rule-based replies (works entirely on the client)
  const message = (userMessage || '').toLowerCase();
  if (
    message.includes("hi") ||
    message.includes("hello") ||
    message.includes("hey")
  ) {
    return "Hello! 😊 How can I assist you today? Feel free to ask me about my work, design, or anything else!";
  } else if (message.includes("portfolio") || message.includes("work")) {
    return "You can explore my portfolio sections to see my creative projects and professional work!";
  } else if (
    message.includes("secret") ||
    message.includes("unlock") ||
    message.includes("hint") ||
    message.includes("flag") ||
    message.includes("hidden")
  ) {
    return "🔐 You've unlocked a secret message! Check the contact form. Just fill in the details, and the mystery will unfold… 🌟";
  } else if (
    message.includes("design") ||
    message.includes("graphic") ||
    message.includes("art")
  ) {
    return "I specialize in graphic design, video editing, and web design. What kind of design are you interested in?";
  } else if (message.includes("video")) {
    return "I love working with video editing! Whether it's promotional content or personal videos, I'm here to help bring your vision to life!";
  } else if (message.includes("web design") || message.includes("website")) {
    return "Web design is a true passion of mine. Let me know if you'd like to discuss creating a sleek and modern website!";
  } else if (message.includes("help")) {
    return "Of course! 😊 I'm here to help. You can ask me about my services, portfolio, or anything else on your mind!";
  } else if (message.includes("thanks") || message.includes("thank you")) {
    return "You're welcome! 😄 Let me know if you need any more information!";
  } else if (message.includes("contact")) {
    return "You can contact me via email at pbrdesignsstudio@gmail.com. I'll be happy to discuss any projects with you!";
  } else {
    return "I'm not sure how to respond to that, but feel free to ask me anything about design, video editing, or my portfolio!";
  }
}
