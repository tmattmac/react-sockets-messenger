import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '3em'
  }
}))

const MessageForm = ({ sendMessage }) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      sendMessage(message);
    }
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        placeholder="Type something..."
        variant="filled"
        fullWidth
        value={message}
        onChange={handleChange}
      />
    </form>
  );
}
 
export default MessageForm;