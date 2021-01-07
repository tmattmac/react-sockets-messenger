import React from "react";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import { theme } from "./themes/theme";
import AuthProvider from "./components/providers/AuthProvider";
import MessagesProvider from "./components/providers/MessagesProvider";



function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <MessagesProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MessagesProvider>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
