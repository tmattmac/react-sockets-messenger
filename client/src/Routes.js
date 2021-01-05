import React from 'react';
import { Route, Switch } from "react-router-dom";

import AuthPage from "./pages/AuthPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <AuthPage />
      </Route>
      <Route exact path="/login" component={AuthPage}>
        <AuthPage />
      </Route>
      <Route exact path="/register">
        <AuthPage page="register" />
      </Route>
    </Switch>
  );
}
 
export default Routes;