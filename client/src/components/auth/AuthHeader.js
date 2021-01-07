import React from 'react';
import { Box, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'baseline',
    justifyContent: 'flex-end'
  },
  button: {
    margin: '0 2em'
  }
}))

const AuthHeader = ({ page }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" color="secondary">
        {page === 'login' ? `Don't have an account?` : 'Already have an account?'}
      </Typography>
      <Button
        component={Link}
        color="primary"
        className={classes.button}
        to={page === 'login' ? '/register' : '/login'}
      >
        {page === 'login' ? 'Create account' : 'Login'}
      </Button>
    </Box>
  );
}
 
export default AuthHeader;