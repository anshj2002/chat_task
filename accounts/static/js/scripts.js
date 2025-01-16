document.getElementById("toggle-menu").onclick = function() {
    const menu = document.getElementById("left-menu");
    menu.classList.toggle("hidden");
};

// WebSocket connection
const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/chat/' + recipientId + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    
    messageDiv.className = 'flex ' + (data.sender === currentUser ? 'justify-end' : 'justify-start') + ' message-animation';
    
    const messageContent = `
        <div class="${data.sender === currentUser ? 'bg-indigo-600 text-white' : 'bg-gray-200'} rounded-lg py-2 px-4 max-w-md">
            <p>${data.message}</p>
            <span class="text-xs opacity-75">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
    `;
    
    messageDiv.innerHTML = messageContent;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
};

// Form submission
document.getElementById('chat-form').onsubmit = function(e) {
    e.preventDefault();
    const messageInput = document.querySelector('input[name="message"]');
    const message = messageInput.value.trim();
    
    if (message) {
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        messageInput.value = '';
    }
};

// Responsive design
function handleResize() {
    const width = window.innerWidth;
    const leftMenu = document.getElementById('left-menu');
    
    if (width < 768) {
        leftMenu.classList.add('hidden');
    } else {
        leftMenu.classList.remove('hidden');
    }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Add active state to current navigation item
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('bg-indigo-700');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const usersList = document.getElementById('usersList');
    
    if (searchInput && usersList) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const users = usersList.getElementsByTagName('li');
            
            Array.from(users).forEach(user => {
                const username = user.querySelector('h3').textContent.toLowerCase();
                if (username.includes(searchTerm)) {
                    user.style.display = '';
                } else {
                    user.style.display = 'none';
                }
            });
        });
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function handleResponsiveLayout() {
    const pageContent = document.querySelector('.container');
    const screenWidth = window.innerWidth;
    
    // Reset any previously applied styles
    pageContent.style.transform = '';
    pageContent.style.margin = '0 auto';
    
    // Apply scaling based on screen width
    if (screenWidth >= 992 && screenWidth <= 1600) {
        pageContent.style.transform = 'scale(0.9)';
        pageContent.style.transformOrigin = 'top center';
        pageContent.style.margin = '-5vh auto';
    } else if (screenWidth >= 700 && screenWidth <= 767) {
        pageContent.style.transform = 'scale(0.8)';
        pageContent.style.transformOrigin = 'top center';
        pageContent.style.margin = '-10vh auto';
    } else if (screenWidth >= 600 && screenWidth <= 700) {
        pageContent.style.transform = 'scale(0.75)';
        pageContent.style.transformOrigin = 'top center';
        pageContent.style.margin = '-12.5vh auto';
    } else if (screenWidth <= 600) {
        pageContent.style.transform = 'scale(0.5)';
        pageContent.style.transformOrigin = 'top center';
        pageContent.style.margin = '-25vh auto';
    }
}

// Enhanced menu toggle functionality
function setupMenuToggle() {
    const toggleButton = document.getElementById('toggle-menu');
    const leftMenu = document.getElementById('left-menu');
    const mainContent = document.querySelector('.flex-1');
    
    if (toggleButton && leftMenu) {
        toggleButton.addEventListener('click', () => {
            leftMenu.classList.toggle('hidden');
            leftMenu.classList.toggle('slide-in');
            
            // Adjust main content when menu is toggled
            if (window.innerWidth > 768) {
                mainContent.classList.toggle('ml-0');
                mainContent.classList.toggle('ml-64');
            }
        });
    }
}

// Handle initial layout and resize events
window.addEventListener('load', () => {
    handleResponsiveLayout();
    setupMenuToggle();
    
    // Initialize WebSocket connection
    if (typeof recipientId !== 'undefined') {
        const chatSocket = new WebSocket(
            'ws://' + window.location.host + '/ws/chat/' + recipientId + '/'
        );
        
        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            appendMessage(data);
        };
    }
});

window.addEventListener('resize', handleResponsiveLayout);

// Utility function to append messages
function appendMessage(data) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    const messageDiv = document.createElement('div');
    const isSender = data.sender === currentUser;
    
    messageDiv.className = `flex ${isSender ? 'justify-end' : 'justify-start'} message-animation`;
    
    messageDiv.innerHTML = `
        <div class="${isSender ? 'bg-indigo-600 text-white' : 'bg-gray-200'} rounded-lg py-2 px-4 max-w-md shadow-sm">
            <p>${data.message}</p>
            <span class="text-xs opacity-75">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
    `;
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
document.getElementById('toggle-chat').addEventListener('click', function() {
    const chatPanel = document.getElementById('chat-panel');
    chatPanel.classList.toggle('hidden'); // Toggles the 'hidden' class
});
// Handle user search functionality
function setupUserSearch() {
    const searchInput = document.getElementById('searchInput');
    const usersList = document.getElementById('usersList');
    
    if (searchInput && usersList) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const users = usersList.getElementsByTagName('li');
            
            Array.from(users).forEach(user => {
                const username = user.querySelector('h3').textContent.toLowerCase();
                user.style.display = username.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}