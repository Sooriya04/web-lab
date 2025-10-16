const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public')); // Serve frontend

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg); // Broadcast to all users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});