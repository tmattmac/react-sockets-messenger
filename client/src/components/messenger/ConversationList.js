import { List, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import ConversationListItem from './ConversationListItem';
import getContext from '../../contexts/getContext';
import UserSearch from './UserSearch';

const useStyles = makeStyles(theme => ({
  root: {

  }
}))

const ConversationList = () => {

  const classes = useStyles();

  const { conversations } = useContext(getContext('conversations'));

  const lastUpdated = (conversation) => {
    return conversation.messages[conversation.messages.length - 1].timestamp;
  }

  const sortedConversationIds = Object.keys(conversations)
    .sort((a, b) => +lastUpdated(conversations[b]) - +lastUpdated(conversations[a]));

  return (
    <div className={classes.root}>
      <UserSearch doSearch={console.log}/>
      <List>
        {sortedConversationIds.map(id => (
          <ConversationListItem key={id} id={id} />
        ))}
      </List>
    </div>
  );
}
 
export default ConversationList;