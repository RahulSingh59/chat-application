const socket = io('http://localhost:8000');

//Get DOM elements in respective JS variable
const form = document.getElementById('send_container');
const messageInput = document.getElementById('messageInp');
const messagecontainer=document.querySelector(".container");

//Audio that will play on receiving message
var audio = new Audio('tong.mp3');



//Function which will append event info to the container
const append= (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);

    if(position=='left')
    {
        audio.play();
    }
  
}
//Ask new user for his/her name and let the server know

const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

//If the new user joins, receive his/her name  from server

socket.on('user-joined', name =>{

    append(`${name} joined the chat`,'right');
});
// If the server sends the message,receive it
socket.on('receive',data=>{

    append(`${data.name}: ${data.message}`,'left');
});

//If the user leaves the chat,append the info to the container

socket.on('left',data=>{

    append(`${data.name} left the chat`,'right');
});


// If the form get submitted,send server the message

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value ='';
})



