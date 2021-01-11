import { Button, Typography, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import getContext from '../../contexts/getContext';
import useFormData from '../../hooks/useFormData';
import useFormStyles from './formStyles';
import Validator from 'validatorjs';

const RegisterForm = () => {
  const classes = useFormStyles();
  const [formData, updateFormData, errors, addError] = useFormData(['email', 'username', 'password']);
  const { setUser } = useContext(getContext('user'));
  const setError = useContext(getContext('setError'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rules = {
      username: 'alpha_dash|min:3|required',
      password: 'min:6|required',
      email: 'email|required'
    };
    const validation = new Validator(formData, rules);
    if (validation.fails()) {
      const err = validation.errors;
      Object
        .keys(err.all())
        .forEach(field => addError(field, err.first(field)));
      return;
    }

    const res = await fetch('/api/auth/register', {
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
        setError(data.error.message);
      }
      else {
        // some other unexpected error happened
        setError('Something went wrong. Try again later.')
      }
    }
  }

  return (
    <>
      <Typography variant="h1" className={classes.formHeader}>Create an account.</Typography>
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
          name="email"
          label="E-mail address"
          value={formData.email.value}
          onChange={updateFormData}
          fullWidth
          error={Boolean(errors.email)}
          helperText={errors.email}
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
          Create
        </Button>
      </form>
    </>
  );
}
 
export default RegisterForm;