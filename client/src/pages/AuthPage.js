import React from 'react';
import { Box, Grid, Hidden, makeStyles } from '@material-ui/core';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';
import HeroImage from '../components/auth/HeroImage';
import AuthHeader from '../components/auth/AuthHeader';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw'
  },
  mainContent: {
    padding: '2em',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },
  formContainer: {
    width: '30vw',
    minWidth: '380px',
    marginTop: '10vh',
    [theme.breakpoints.down('sm')]: {
      minWidth: '0',
      width: '100%'
    }
  },
  header: {
    width: '100%'
  }
}));

const AuthPage = ({ page = 'login' }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={0}>
      <Hidden smDown>
        <Grid item md={4}>
          <HeroImage />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={8} className={classes.mainContent}>
        <Box className={classes.header}>
          <AuthHeader page={page} />
        </Box>
        <Box className={classes.formContainer}>
          {page === 'login' ? <LoginForm /> : <RegisterForm />}
        </Box>
      </Grid>
    </Grid>
  );
}
 
export default AuthPage;