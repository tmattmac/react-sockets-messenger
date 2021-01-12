import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import getContext from '../../contexts/getContext';
import useSocket from '../../hooks/useSocket';

const MessagesProvider = ({ children }) => {

  const { user } = useContext(getContext('user'));

  const MessagesContext = getContext('conversations');

  const [conversations, setConversations] = useState();
  const [loading, setLoading] = useState(true);
  const [init, send, close] = useSocket();

  const addMessageToConversation = useCallback((id, messageObject, users, read = true) => {
    setConversations(conversations => {
      let conversation = conversations[id];
      if (!conversation) {
        conversation = {
          hydrated: false,
          read,
          users,
          messages: [messageObject]
        }
      }
      else {
        conversation = {
          ...conversation,
          read,
          messages: [...conversation.messages, messageObject]
        }
      }

      return {
        ...conversations,
        [id]: conversation
      }
    });
  }, []);

  const sendMessage = async (toUsers, text, conversationId) => {
    if (conversations[conversationId]) {
      const id = conversationId;
      addMessageToConversation(id, {
        fromUser: user,
        createdAt: new Date(),
        text
      });
      send(toUsers, text, id);
      return id;
    }
    else {
      const data = await send(toUsers, text);
      const { message } = data;
      addMessageToConversation(message.conversationId, message, toUsers);
      return message.conversationId;
    }
  }

  /**
   * callback called when message received via socket
   */
  const receiveMessage = useCallback(({ message, users }) => {
    addMessageToConversation(
      message.conversationId,
      message,
      users.filter(u => u !== user),
      false
    );
  }, [user, addMessageToConversation]);

  // fetch conversations on load
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch('/api/conversations');
      const data = await res.json();
      const conversations = data.conversations
        .reduce((acc, conversation) => {
          acc[conversation.id] = {
            read: conversation.readStatus,
            users: conversation.users,
            hydrated: false,
            messages: conversation.messages
          }
          return acc;
        }, {});
      setConversations(conversations);
      setLoading(false);
      init(receiveMessage);
    }
    if (user) {
      fetchData();
    }
    else {
      setLoading(false);
    }
  }, [user, init, receiveMessage]);

  // load messages from conversation
  const loadConversation = async (id) => {
    const res = await fetch(`/api/conversations/${id}`);
    const data = await res.json();
    setConversations(conversations => {
      return {
        ...conversations,
        [id]: {
          ...conversations[id],
          hydrated: true,
          messages: data.messages
        }
      }
    });
  }

  // TODO: Use Skeleton on messenger page components
  if (loading) return (
    <Backdrop open>
      <CircularProgress style={{ color: 'white' }} />
    </Backdrop>
  )

  return (
    <MessagesContext.Provider value={{ conversations, loading, loadConversation, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}
 
export default MessagesProvider;