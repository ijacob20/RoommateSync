const socket = io()

const clientsTotal = document.getElementById('client-total')

const chatMessages = document.querySelector('.chat-container')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('msg')
const messageTone = new Audio('/message-tone.mp3')



messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`
})

function sendMessage() {
  if (messageInput.value === '') return
  const userName = document.querySelector('.username').textContent;
  // console.log(messageInput.value)
  const data = {
    message: messageInput.value,
    username: userName,
    dateTime: new Date(),
  }
  socket.emit('message', data)
  addMessageToUI(true, data)
  messageInput.value = ''
}

socket.on('chat-message', (data) => {
  // console.log(data)
  messageTone.play()

  addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data) {
  clearFeedback()
    // const user = document.createElement('div');
    
    // user.classList.add('message-sender');
    // user.textContent = data.username;
    // div.append(user);

    const messageLi = document.createElement('li');
    if (isOwnMessage) {
      messageLi.classList.add('message-bubble');
      messageLi.classList.add('message-right');

    } else {
      messageLi.classList.add('message-left');

    }
    messageLi.classList.add('message-bubble');

  const pElement = document.createElement('p');
  pElement.innerHTML = data.message;
  const spanElement = document.createElement('span');
  spanElement.textContent = data.username;
  pElement.append(spanElement);

  messageLi.append(pElement);

    chatMessages.append(messageLi);

  scrollToBottom()
}

function scrollToBottom() {
  chatMessages.scrollTo(0, chatMessages.scrollHeight)
}







function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}
