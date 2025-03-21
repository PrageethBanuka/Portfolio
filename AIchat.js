// Handle sending and receiving messages
document.getElementById("send-button").addEventListener("click", function () {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return; // Prevent sending empty messages

  // Add user message to chat box
  addMessage(userInput, "user-message");

  // Clear input field
  document.getElementById("user-input").value = "";

  // Simulate a bot response after a short delay
  setTimeout(() => {
    const botResponse = getBotResponse(userInput); // Mocking AI response
    addMessage(botResponse, "bot-message");
  }, 1000);
});

// Function to add message to chat box
function addMessage(message, sender) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  messageElement.innerHTML = `<p>${message}</p>`;
  chatBox.appendChild(messageElement);

  // Scroll to the latest message
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Mock AI response (you can replace this with actual AI API like Dialogflow or OpenAI)
function getBotResponse(userMessage) {
  // Convert user message to lowercase for case-insensitive comparison
  const message = userMessage.toLowerCase();

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
    messege.include("hidden")
  ) {
    return "🔐 You've unlocked a secret message! Check the contact form ,Just fill in the details, and the mystery will unfold… 🌟";
  } else if (
    message.includes("design") ||
    message.includes("graphic") ||
    message.includes("art")
  ) {
    return "I specialize in graphic design, video editing, and web design. What kind of design are you interested in?";
  } else if (message.includes("video")) {
    return "I love working with video editing! Whether it's promotional content or personal videos, I’m here to help bring your vision to life!";
  } else if (message.includes("web design") || message.includes("website")) {
    return "Web design is a true passion of mine. Let me know if you'd like to discuss creating a sleek and modern website!";
  } else if (message.includes("help")) {
    return "Of course! 😊 I'm here to help. You can ask me about my services, portfolio, or anything else on your mind!";
  } else if (message.includes("thanks") || message.includes("thank you")) {
    return "You're welcome! 😄 Let me know if you need any more information!";
  } else if (message.includes("contact")) {
    return "You can contact me via email at pbrdesignsstudio@gmail.com. I'll be happy to discuss any projects with you!";
  } else if (message.includes("hello") || message.includes("hi")) {
    return "Hi again! 😎 I'm here to help, just type away!";
  } else {
    return "I'm not sure how to respond to that, but feel free to ask me anything about design, video editing, or my portfolio!";
  }
}
