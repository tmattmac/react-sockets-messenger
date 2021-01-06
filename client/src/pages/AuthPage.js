import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';
import HeroImage from '../components/auth/HeroImage';
import AuthHeader from '../components/auth/AuthHeader';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw'
  },
  mainContent: {
    margin: '2em',
    flexGrow: '2',
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
    <Box className={classes.root}>
      <HeroImage />
      <Box className={classes.mainContent}>
        <Box className={classes.header}>
          <AuthHeader page={page} />
        </Box>
        <Box className={classes.formContainer}>
          {page === 'login' ? <LoginForm /> : <RegisterForm />}
        </Box>
      </Box>
    </Box>
  );
}
 
export default AuthPage;