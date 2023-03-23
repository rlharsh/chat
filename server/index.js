const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

app.use(cors())
let users = {}

socketIO.on('connection', (socket) => {

    console.log(`⚡: ${socket.id} user just connected!`)  

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      let roomId;
      for (const [key, value] of Object.entries(users)) {
        if (value.includes(socket.username)) {
          roomId = key;
          break;
        }
      }

      if (roomId) {
        users[roomId] = users[roomId].filter(name => name !== socket.username);

        socket.to(roomId).emit("newUserResponse", users[roomId]);
      }
    });

    socket.on('leaveChat', (message) => {

    });

    socket.on('message', data => {
      console.log(data);
      socketIO.to(data.id).emit('messageResponse', data);
    })

    socket.on('typing', data => {
      socketIO.to(data.id).emit('typingResponse', {
        message: data.message
      });
    })

    socket.on('roomEntered', data => {
      socketIO.to(data.id).emit('roomEntered', {
        users: users[data.id]
      })
    })

    socket.on('createRoom', (message) => {
      const roomCode = message.roomId;
      socket.join(roomCode);
      socket.emit('roomCreated', {
        id: roomCode,
        owner: message.name
      })
      console.log('Room ' + roomCode + ' created by ' + message.name)
    });

    socket.on('joinRoom', (message) => {
      const room = socketIO.sockets.adapter.rooms.get(message.id);

      console.log(message);

      if (room && room.size < 10) {
        socket.join(message.id);
        socket.username = message.name;

        if (!users[message.id]) {
          users[message.id] = [message.name];
        } else {
          users[message.id].push(message.name);
        }

        socket.emit('roomJoined', {
          id: message.id,
          users: users[message.id]
        })
      } else {
        console.log('Something happened.')
      }
    })

});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});