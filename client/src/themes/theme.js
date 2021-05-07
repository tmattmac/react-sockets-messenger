import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    button: {
      textTransform: "none",
      fontSize: "1.25em",
      fontWeight: "bold",
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
    background: { default: "#FFFFFF" },
  },
  props: {
    MuiInputLabel: {
      shrink: true,
    },
    MuiFilledInput: {
      disableUnderline: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        padding: "1em 3em",
      },
      text: {
        boxShadow: "0px 2px 12px rgba(74, 106, 149, 0.2)",
        fontWeight: "600",
        padding: "1em 2em",
      },
    },
    MuiInputAdornment: {
      filled: {
        marginTop: "0 !important",
        color: "#B1C3DF",
      },
    },
    MuiFilledInput: {
      input: {
        padding: "1.5em",
        fontWeight: "bold",
        color: "#333333",
        "&::placeholder": {
          color: "#B1C3DF",
          opacity: "1",
        },
      },
      inputAdornedStart: {
        paddingLeft: 0,
      },
      root: {
        borderRadius: "4px",
        backgroundColor: "#E9EEF9",
        "&:hover": {
          backgroundColor: "#e1e8f7",
        },
        "&.Mui-focused": {
          backgroundColor: "#e1e8f7",
        },
      },
    },
  },
});
