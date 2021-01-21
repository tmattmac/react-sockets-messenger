import { Typography, Avatar, makeStyles } from '@material-ui/core';
import React, { useContext, useRef, useLayoutEffect } from 'react';
import getContext from '../../contexts/getContext';
import clsx from 'clsx';
import formatTime from '../../helpers/formatTime';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '3em',
    flex: '1 1 auto',
    height: 0,
    overflowY: 'auto'
  },
  message: {
    display: 'flex',
    flexFlow: 'row no-wrap'
  },
  rightJustify: {
    justifyContent: 'flex-end'
  },
  alignRight: {
    textAlign: 'right'
  },
  messageHeader: {
    color: '#BECCE2',
    fontWeight: 'bold'
  },
  messageText: {
    fontWeight: 'bold',
    color: 'white',
    background: 'linear-gradient(to top right, #3A8DFF, #6CC1FF)',
    borderRadius: '0 10px 10px 10px',
    padding: '0.75em 1em',
    marginTop: '0.5em',
    marginBottom: '1.5em'
  },
  messageTextFromUser: {
    color: '#91A3C0',
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px'
  },
  avatar: {
    width: '30px',
    height: '30px',
    margin: '0.5em'
  }
}));

const MessageList = ({ messages }) => {
  const classes = useStyles();
  const { user } = useContext(getContext('user'));

  const bottomOfPage = useRef();

  useLayoutEffect(() => {
    bottomOfPage.current.scrollIntoView();
  });
  
  return ( 
    <div className={classes.root}>
      {messages.map(message => {
        const isFromUser = message.fromUser === user;
        const time = formatTime(message.createdAt);
        return (
          <div key={message.createdAt} className={clsx(classes.message, {
            [classes.rightJustify]: isFromUser
          })}>
            {!isFromUser && <Avatar className={classes.avatar}>{message.fromUser.toUpperCase()[0]}</Avatar>}
            <div>
              <Typography variant='body2' className={clsx(classes.messageHeader, {
                [classes.alignRight]: isFromUser
              })}>
                {!isFromUser && message.fromUser} {time}
              </Typography>
              <Typography variant='body1' className={clsx(classes.messageText, {
                [classes.messageTextFromUser]: isFromUser
              })}>
                {message.text}
              </Typography>
            </div>
          </div>
        )
      })}
      <div ref={bottomOfPage}></div>
    </div>
  );
}
 
export default MessageList;