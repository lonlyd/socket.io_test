var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

var username = prompt('Введите свой ник', 'Guest');
window.onload = function () {
    socket.emit('connection', username); // Username send to server
}

socket.on('message', function (msg, username, date) {
    var item = document.createElement('li');
    let message = `${username} ${date}: ${msg}`
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('disconnected', function (infomsg) {
    var item = document.createElement('li');
    item.classList.add('info');
    item.textContent = infomsg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})


socket.on('connected', function (infomsg) {
    var item = document.createElement('li');
    item.classList.add('info');
    item.textContent = infomsg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})




