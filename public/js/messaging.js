console.log('hello');

const chatForm = document.querySelector('form');

const socket = io();
console.log(socket);

//Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
})

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage',message);
})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const user = document.createElement('div');
    user.classList.add('message-sender');
    user.textContent = 'USERNAME HERE'
    div.append(user);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-text');
    messageDiv.innerHTML = message;

    div.append(messageDiv);


    document.querySelector('.chat-messages').append(div);
}