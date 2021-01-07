import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import getContext from '../../contexts/getContext';

const UnauthenticatedRoute = ({ forwardTo = '/messages', ...props }) => {
  const { user } = useContext(getContext('user'));
  if (user) {
    return <Redirect to={forwardTo} />;
  }
  
  return <Route {...props} />
}
 
export default UnauthenticatedRoute;