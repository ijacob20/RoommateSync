const socket = io()

const clientsTotal = document.getElementById('client-total')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('msg')


messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`
})

function sendMessage() {
  if (messageInput.value === '') return
  // console.log(messageInput.value)
  const data = {
    message: messageInput.value,
    username: 'empty',
    dateTime: new Date(),
  }
  socket.emit('message', data)
  addMessageToUI(true, data)
  messageInput.value = ''
}

socket.on('chat-message', (data) => {
  // console.log(data)
  addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
  clearFeedback()
  const div = document.createElement('div');
    div.classList.add('message');
    const user = document.createElement('div');
    user.classList.add('message-sender');
    // user.textContent = 'Username Here';
    div.append(user);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message-text');
    messageDiv.innerHTML = data.message;

    div.append(messageDiv);
    document.querySelector('.chat-messages').append(div);

  scrollToBottom()
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}





socket.on('feedback', (data) => {
  clearFeedback()
  const element = `
        <li class="message-feedback">
          <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
  `
  messageContainer.innerHTML += element
})

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}
