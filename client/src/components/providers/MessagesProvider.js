import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import getContext from '../../contexts/getContext';

// TODO: Remove
import data from './dummy_data.json';

const MessagesProvider = ({ children }) => {

  const { user } = useContext(getContext('user'));

  const MessagesContext = getContext('conversations');

  const [conversations, setConversations] = useState();
  const [loading, setLoading] = useState(true);

  // fetch conversations on load
  useEffect(() => {
    // for now, just populate with dummy data
    // simulate loading with timeout
    setTimeout(() => {
      const conversations = data.conversations
        .reduce((acc, conversation) => {
        acc[conversation.id] = {
          read: conversation.read,
          users: conversation.users.filter(username => username !== user),
          hydrated: false,
          messages: [{ ...conversation.lastMessage }]
        }
        return acc;
        }, {});
      setConversations(conversations);
      setLoading(false);
    }, 1000);
  }, []);

  // load messages from conversation
  const loadConversation = (id, cb) => {
    // generate random dates for now
    function randomDate(start, end) {
      var date = new Date(+start + Math.random() * (end - start));
      var hour = 0 + Math.random() * 24 | 0;
      date.setHours(hour);
      return date;
    }
    const startDate = new Date(2021, 0, 1);
    const endDate = new Date();

    setConversations(conversations => {
      return {
        ...conversations,
        [id]: {
          ...conversations[id],
          hydrated: true,
          messages: [
            {
              text: 'a message',
              timestamp: randomDate(startDate, endDate),
              fromUser: 'testuser'
            },
            {
              text: 'second message',
              timestamp: randomDate(startDate, endDate),
              fromUser: conversations[id].users[0]
            },
            {
              text: 'third message',
              timestamp: randomDate(startDate, endDate),
              fromUser: 'testuser'
            },
            {
              text: 'fourth message',
              timestamp: randomDate(startDate, endDate),
              fromUser: conversations[id].users[0]
            }

          ].sort((a, b) => +a.timestamp - +b.timestamp)
        }
      }
    });

    cb();
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