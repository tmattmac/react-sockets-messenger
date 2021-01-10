import { Avatar, Chip, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import getContext from '../../contexts/getContext';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '1em',
    boxShadow: '0 2px 10px rgba(88, 133, 196, 0.05)',
    borderRadius: '8px'
  },
  bold: {
    fontWeight: 'bold',
  },
  black: {
    color: 'black'
  }
}));

const ConversationListItem = ({ id }) => {
  const classes = useStyles();

  const { conversations } = useContext(getContext('conversations'));
  const conversation = conversations[id];
  const username = conversation.users[0];
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <ListItem button component={Link} to={`/messages/${id}`} className={classes.root}>
      <ListItemAvatar>
        <Avatar>{username[0].toUpperCase()}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={username}
        secondary={lastMessage.text}
        classes={{
          primary: classes.bold,
          secondary: `${classes.bold} ${conversation.read || classes.black}`
        }}
      />
      {!conversation.read &&
        <Chip color="primary" label="New" className={classes.bold} size="small" />}
    </ListItem>
  );
}
 
export default ConversationListItem;