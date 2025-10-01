

// Simple pizza shop chatbot using only basic DOM, if/else, and while loop
var chatWindow = document.getElementById('chat-window');
var chatForm = document.getElementById('chat-form');
var chatInput = document.getElementById('chat-input');

// Clear chat window using while loop
while (chatWindow && chatWindow.firstChild) {
    chatWindow.removeChild(chatWindow.firstChild);
}

// State
var step = 0;


function botMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'chat-message bot';
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function userMessage(text) {
    var msg = document.createElement('div');
    msg.className = 'chat-message user';
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showOptions(opts) {
    var text = '';
    for (var k in opts) {
        text += '\n' + k + ') ' + opts[k];
    }
    return text;
}




function ask() {
    if (step === 0) {
        botMessage("👋 Welcome to Talha's Pizza! How may I assist you today?" + showOptions({a:"Place an order",b:"Make a complaint",c:"View menu"}));
        botMessage("Please type a, b, or c to select an option.");
    } else if (step === 1) {
        botMessage("🍕 Wonderful! What size pizza would you like?" + showOptions({a:"Small",b:"Medium",c:"Large"}));
        botMessage("Type a, b, or c for your choice.");
    } else if (step === 8) {
        botMessage("🍕 Please select your pizza flavor:" + showOptions({a:"Margherita",b:"Pepperoni",c:"Veggie"}));
        botMessage("Type a, b, or c for your flavor.");
    } else if (step === 2) {
        botMessage("� We're sorry for any inconvenience. Please select your complaint type:" + showOptions({a:"Late delivery",b:"Wrong order",c:"Bad Customer Service"}));
        botMessage("Type a, b, or c for your complaint.");
    } else if (step === 3) {
        botMessage("📋 Our menu includes: Margherita, Pepperoni, and Veggie pizzas." + showOptions({a:"Select a flavor",b:"Exit",c:"Show menu again"}));
        botMessage("Type a, b, or c to continue.");
    } else if (step === 4) {
        botMessage("✅ Thank you! Your pizza order is being processed. You will receive a confirmation soon. Would you like anything else?" + showOptions({a:"Order another pizza",b:"No, thank you",c:"Make a complaint"}));
        botMessage("Type a, b, or c to continue.");
    } else if (step === 5) {
        botMessage("🙏 Thank you for your feedback. We value your input and will address your concern promptly. Would you like to do anything else?" + showOptions({a:"Place an order",b:"No, thank you",c:"View menu"}));
        botMessage("Type a, b, or c to continue.");
    } else if (step === 6) {
        botMessage("👋 Thank you for visiting Talha's Pizza! Have a great day.");
        chatForm.querySelector('button').disabled = true;
        chatInput.disabled = true;
    }
}

ask();




chatForm.onsubmit = function(e) {
    e.preventDefault();
    var val = chatInput.value.trim().toLowerCase();
    userMessage(val);
    chatInput.value = '';

    // End chat if user says 'okay', 'thanks', or 'exit'
    if (val === 'okay' || val === 'thanks' || val === 'exit') {
        botMessage("👋 Thank you for visiting Talha's Pizza! Have a great day.");
        chatForm.querySelector('button').disabled = true;
        chatInput.disabled = true;
        return;
    }

    // Professional flow with confirmations and polite responses
    if (step === 0) {
        if (val === 'a') step = 1;
        else if (val === 'b') step = 2;
        else if (val === 'c') step = 3;
        else botMessage("Sorry, I didn't understand. Please type a, b, or c.");
    } else if (step === 1) {
        if (val === 'a' || val === 'b' || val === 'c') step = 8;
        else botMessage("Sorry, I didn't understand. Please type a, b, or c.");
    } else if (step === 8) {
        if (val === 'a' || val === 'b' || val === 'c') step = 4;
        else botMessage("Sorry, I didn't understand. Please type a, b, or c.");
    } else if (step === 2) {
        if (val === 'a' || val === 'b' || val === 'c') step = 5;
        else botMessage("Sorry, I didn't understand. Please type a, b, or c.");
    } else if (step === 3) {
        if (val === 'a') step = 8;
        else if (val === 'b') step = 6;
        else if (val === 'c') step = 3;
        else botMessage("Sorry, I didn't understand. Please type a, b, or c.");
    } else if (step === 4) {
        if (val === 'a') step = 1;
        else if (val === 'b') step = 0;
        else if (val === 'c') step = 2;
        else botMessage("Sorry, I didn't understand. Please type a, b, or c.");
    } else if (step === 5) {
        if (val === 'a') step = 1;
        else if (val === 'b') step = 0;
        else if (val === 'c') step = 3;
        else botMessage("Sorry, I didn't understand. Please type a, b, or c.");
    }
    ask();
};
