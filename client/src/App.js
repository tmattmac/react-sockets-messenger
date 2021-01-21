import React from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import { theme } from "./themes/theme";
import AuthProvider from "./components/providers/AuthProvider";
import MessagesProvider from "./components/providers/MessagesProvider";

import ErrorProvider from "./components/providers/ErrorProvider";
import ErrorSnackbar from "./components/ErrorSnackbar";


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ErrorProvider>
        <AuthProvider>
          <MessagesProvider>
            <CssBaseline />
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </MessagesProvider>
        </AuthProvider>
        <ErrorSnackbar />
      </ErrorProvider>
    </MuiThemeProvider>
  );
}

export default App;
