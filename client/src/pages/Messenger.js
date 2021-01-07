import React, { useContext } from 'react';
import getContext from '../contexts/getContext';

const Messenger = () => {
  const { user, logout } = useContext(getContext('user'));

  return (<p>{user} is logged in <button onClick={logout}>Log Out</button></p>);
}
 
export default Messenger;