import { CircularProgress, Typography, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import getContext from '../../contexts/getContext';
import { Redirect, useParams } from 'react-router-dom';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  header: {
    background: 'white',
    padding: '3em',
    boxShadow: '0 2px 20px rgba(88,133,196,0.1)'
  },
  headerText: {
    fontWeight: 'bold'
  }
}))

const MessagePane = ({ newConversation = false, toUsers }) => {

  const classes = useStyles();
  const { conversationId } = useParams();
  const { conversations, loadConversation } = useContext(getContext('conversations'));


  const conversation = conversations[conversationId];
  const isLoaded = conversation.hydrated;

  if (newConversation) {

  }

  useEffect(() => {
    if (!isLoaded) {
      loadConversation(conversationId);
    }
  }, [isLoaded]);

  if (!newConversation && !conversations[conversationId]) {
    return <Redirect to='/messages' />
  }

  if (!isLoaded) {
    return <CircularProgress />;
  }

  const sendMessage = (message) => {
    console.log(message);
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant='h5' component='h1' className={classes.headerText}>
          {conversation.users.join(', ')}
        </Typography>
      </div>
      <MessageList messages={conversation.messages} />
      <MessageForm sendMessage={sendMessage} />
    </div>
  );
}
 
export default MessagePane;