import { Backdrop, CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import getContext from '../../contexts/getContext';

const AuthProvider = ({ children }) => {

  const UserContext = getContext('user');

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // check if user is logged in on load
  useEffect(() => {
    fetch('/api/auth/isAuthenticated')
      .then(res => res.json())
      .then(data => {
        if (data.username) {
          setUser(data.username);
        }
        setLoading(false);
      });
  }, []);

  const logout = () => {
    fetch('/auth/logout', { method: 'POST' })
      .then(res => {
        if (res.ok) {
          setUser(null);
        }
      });
  }

  if (loading) return (
    <Backdrop open>
      <CircularProgress style={{ color: 'white' }} />
    </Backdrop>
  )

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
 
export default AuthProvider;