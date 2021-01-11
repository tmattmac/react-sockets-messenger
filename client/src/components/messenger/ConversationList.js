import { Avatar, List, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import ConversationListItem from './ConversationListItem';
import getContext from '../../contexts/getContext';
import UserSearch from './UserSearch';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '2em',
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  conversationList: {
    flexGrow: 2,
    overflowY: 'auto'
  },
  header: {
    fontWeight: 'bold',
    marginBottom: '1em'
  },
  userCard: {
    marginBottom: '3em',
    display: 'flex',
    alignItems: 'baseline',
    '&>span': {
      fontWeight: 'bold',
      marginLeft: '1em',
      display: 'block',
      flexGrow: 2
    }
  }
}))

const ConversationList = () => {

  const classes = useStyles();

  const { user, logout } = useContext(getContext('user'));
  const { conversations } = useContext(getContext('conversations'));

  const lastUpdated = (conversation) => {
    return conversation.messages[conversation.messages.length - 1].timestamp;
  }

  const sortedConversationIds = Object.keys(conversations)
    .sort((a, b) => +lastUpdated(conversations[b]) - +lastUpdated(conversations[a]));

  return (
    <div className={classes.root}>
      <div className={classes.userCard}>
        <Avatar>{user.toUpperCase()[0]}</Avatar>
        <Typography variant="h6" component="span">{user}</Typography>
      </div>
      <Typography variant="h5" component="h2" className={classes.header}>Chats</Typography>
      <UserSearch />
      <List className={classes.conversationList}>
        {sortedConversationIds.map(id => (
          <ConversationListItem key={id} id={id} />
        ))}
      </List>
    </div>
  );
}
 
export default ConversationList;