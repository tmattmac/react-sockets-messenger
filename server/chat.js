const io = require('socket.io')();
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const { sendMessage } = require('./models/queries/messages');

io.on('connection', (socket) => {
  let username;
  try {
    const { token } = cookie.parse(socket.request.headers.cookie);
    username = jwt.verify(token, process.env.SECRET_KEY).username;
    socket.join(username);
  } catch (e) {
    return;
  }

  socket.on('message', async ({ toUsers, text, conversationId }, callback) => {
    let message;
    const users = [username, ...toUsers];
    if (!conversationId) {
      message = await sendMessage(username, text, toUsers);
    }
    else {
      message = {
        text,
        conversationId,
        fromUser: username,
        createdAt: new Date()
      }
      sendMessage(username, text, toUsers, conversationId);
    }

    toUsers.reduce((io, user) => io.to(user), io).emit('receiveMessage', { message, users });
    callback({ message });
  });

});

module.exports = io;