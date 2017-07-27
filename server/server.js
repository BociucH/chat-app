const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (data, callback) => {
        console.log(data);

        io.emit('newMessage', generateMessage(data.from, data.text));

        callback();
    });

    socket.on('createLocationMessage', (data) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', data.latitude, data.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is up on port 3000');
});