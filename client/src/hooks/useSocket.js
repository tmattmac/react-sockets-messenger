import { useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  const [socket, setSocket] = useState();

  const init = useCallback((callback) => {
    const socket = io({ port: 3001 });
    setSocket(socket);
    socket.on('disconnect', () => {
      socket.off('receiveMessage', callback);
    });
    socket.on('receiveMessage', callback);
  }, []);

  /** 
   * Send a message and receive a promise that resolves to
   * an object containing the conversation ID
   */
  const sendMessage = (toUsers, text, conversationId) => {
    const promise = new Promise((resolve, reject) => {
      if (!socket) return reject('Must initialize socket first');
      socket.emit('message', {
        toUsers, text, conversationId
      }, (response) => resolve(response));
    });
    return promise;
  }

  const close = socket && socket.close;

  return [init, sendMessage, close];

}

export default useSocket;