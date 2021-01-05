import { Button, Typography, TextField } from '@material-ui/core';
import React from 'react';
import useFormData from '../../hooks/useFormData';
import useFormStyles from './formStyles';

const LoginForm = () => {
  const classes = useFormStyles();
  const [formData, updateFormData] = useFormData(['email', 'username', 'password']);
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate, send request to API, redirect on success, handle error
  }

  return (
    <>
      <Typography variant="h1" className={classes.formHeader}>Welcome back!</Typography>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          value={formData.username.value}
          onChange={updateFormData}
          fullWidth
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password.value}
          onChange={updateFormData}
          fullWidth
        />
        <Button variant="contained" color="primary" className={classes.submitFormBtn}>
          Login
        </Button>
      </form>
    </>
  );
}
 
export default LoginForm;