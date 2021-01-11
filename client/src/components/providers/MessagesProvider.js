import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import getContext from '../../contexts/getContext';

const MessagesProvider = ({ children }) => {

  const { user } = useContext(getContext('user'));

  const MessagesContext = getContext('conversations');

  const [conversations, setConversations] = useState();
  const [loading, setLoading] = useState(true);

  // fetch conversations on load
  useEffect(() => {
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
    }
    fetchData();
  }, []);

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
    <MessagesContext.Provider value={{ conversations, loading, loadConversation }}>
      {children}
    </MessagesContext.Provider>
  );
}
 
export default MessagesProvider;