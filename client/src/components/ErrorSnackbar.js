import { makeStyles, Snackbar, } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import getContext from '../contexts/getContext';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      backgroundColor: theme.palette.error.main,
      fontWeight: 'bold',
      justifyContent: 'center',
      fontSize: '1.25em'
    }
  }
}))

const ErrorSnackbar = () => {
  const classes = useStyles();

  const error = useContext(getContext('error'));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error.message) setOpen(true);
  }, [error]);


  const handleClose = (evt, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={error.message}
      className={classes.root}
    />
  );
}
 
export default ErrorSnackbar;