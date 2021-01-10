import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    button: {
      textTransform: 'none',
      fontSize: '1.25em'
    }
  },
  palette: {
    primary: { main: '#3A8DFF' },
    secondary: { main: '#B0B0B0' }
  },
  props: {
    MuiInputLabel: {
      shrink: true
    }
  },
  overrides: {
    MuiButton: {
      root: {
        padding: '1em 3em'
      },
      text: {
        boxShadow: '0px 2px 12px rgba(74, 106, 149, 0.2)',
        fontWeight: '600',
        padding: '1em 2em'
      }
    }
  }
});
