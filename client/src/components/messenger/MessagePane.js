import { CircularProgress, List, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import getContext from '../../contexts/getContext';
import { Redirect, useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {

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

  return (
    <div className={classes.root}>
      <ul>
        {conversation.messages.map(message => <li>{message.text}</li>)}
      </ul>
    </div>
  );
}
 
export default MessagePane;