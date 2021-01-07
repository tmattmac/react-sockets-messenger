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
    },
    MuiInputLabel: {
      root: {
        marginLeft: '0.5em'
      },
      shrink: {
        transform: 'translateY(-0.75em)'
      }
    },
    MuiInput: {
      root: {
        marginBottom: '4em'
      },
      input: {
        fontWeight: '600',
        padding: '0.75em 0.5em'
      }
    },
    MuiFormHelperText: {
      root: {
        position: 'absolute',
        top: '4.5em',
        fontSize: '1em'
      }
    }
  }
});
