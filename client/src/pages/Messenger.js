import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import ConversationList from '../components/messenger/ConversationList';
import getContext from '../contexts/getContext';

const Messenger = () => {
  const { user, logout } = useContext(getContext('user'));

  return (
    <Grid container>
      <p>{user} is logged in <button onClick={logout}>Log Out</button></p>
      <Grid item md={3}>
        <ConversationList />
      </Grid>
    </Grid>  
    );
}
 
export default Messenger;