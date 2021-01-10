import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import ConversationList from '../components/messenger/ConversationList';
import MessagePane from '../components/messenger/MessagePane';
import getContext from '../contexts/getContext';

const Messenger = () => {
  const { user, logout } = useContext(getContext('user'));

  return (
    <Grid container>
      <Grid item md={3}>
        <ConversationList />
      </Grid>
      <Grid item md={9}>
        <Switch>
          <Route exact path="/messages/new">
            <MessagePane newConversation={true} />
          </Route>
          <Route path="/messages/:conversationId">
            <MessagePane />
          </Route>
        </Switch>
      </Grid>
    </Grid>  
    );
}
 
export default Messenger;