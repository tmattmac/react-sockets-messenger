import { Button, Typography, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import getContext from '../../contexts/getContext';
import useFormData from '../../hooks/useFormData';
import useFormStyles from './formStyles';

const LoginForm = () => {
  const classes = useFormStyles();
  const [formData, updateFormData, errors, addError] = useFormData(['email', 'username', 'password']);
  const { setUser } = useContext(getContext('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      const { username } = await res.json();
      setUser(username);
    }
    else {
      const data = await res.json();
      if (data.error) {
        if (data.error.message.indexOf('username') >= 0) {
          addError('username', data.error.message);
        }
        if (data.error.message.indexOf('password') >= 0) {
          addError('password', data.error.message)
        }
      }
      else {
        // some other unexpected error happened
        addError('username', 'Something went wrong. Try again later.')
      }
    }
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
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password.value}
          onChange={updateFormData}
          fullWidth
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.submitFormBtn}>
          Login
        </Button>
      </form>
    </>
  );
}
 
export default LoginForm;