import React, { useContext } from 'react';
import ConversationList from '../components/messenger/ConversationList';
import getContext from '../contexts/getContext';

const Messenger = () => {
  const { user, logout } = useContext(getContext('user'));

  return (
    <div>
      <p>{user} is logged in <button onClick={logout}>Log Out</button></p>
      <ConversationList />
    </div>  
    );
}
 
export default Messenger;