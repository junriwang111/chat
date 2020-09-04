const express = require('express'); // Import exprerss.js
const app = express(); //The app object conventionally denotes the Express application. Create it by 
const http = require('http').Server(app);
const cors = require('cors'); //allow Cross site origin requests
const io = require('socket.io')(http);

app.use(cors());

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('message', function(msg) {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});