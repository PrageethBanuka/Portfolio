// Handle sending and receiving messages
document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return; // Prevent sending empty messages

    // Add user message to chat box
    addMessage(userInput, 'user-message');

    // Clear input field
    document.getElementById('user-input').value = "";

    // Simulate a bot response after a short delay
    setTimeout(() => {
        const botResponse = getBotResponse(userInput); // Mocking AI response
        addMessage(botResponse, 'bot-message');
    }, 1000);
});

// Function to add message to chat box
function addMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageElement);

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Mock AI response (you can replace this with actual AI API like Dialogflow or OpenAI)
function getBotResponse(userMessage) {
    if (userMessage.includes("hi") || userMessage.includes("hello")) {
        return "Hello! How can I assist you today?";
    } else if (userMessage.includes("portfolio")) {
        return "You can learn more about my work by visiting my portfolio sections.";
    } else if (userMessage.includes("design")) {
        return "I specialize in graphic design, video editing, and web design. What can I help you with?";
    } else {
        return "I'm not sure how to respond to that, but I'll be happy to assist you with anything else!";
    }
}