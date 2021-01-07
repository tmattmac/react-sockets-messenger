import React from 'react';
import { Switch } from "react-router-dom";
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import UnauthenticatedRoute from './components/auth/UnauthenticatedRoute';



import AuthPage from "./pages/AuthPage";
import Messenger from './pages/Messenger';

const Routes = () => {
  return (
    <Switch>
      <UnauthenticatedRoute exact path="/" forwardTo="/messages">
        <AuthPage />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/login" forwardTo="/messages">
        <AuthPage />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/register" forwardTo="/messages">
        <AuthPage page="register" />
      </UnauthenticatedRoute>
      <AuthenticatedRoute path="/messages" forwardTo="/login">
        <Messenger /> {/* will be the actual messages once we get there */}
      </AuthenticatedRoute>
    </Switch>
  );
}
 
export default Routes;