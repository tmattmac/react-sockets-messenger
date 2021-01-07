import { Box, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import MessageBubble from '../../img/bubble.svg';
import Background from '../../img/bg-img.png';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    background: `linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(${Background}), #88BAFE`,
    backgroundSize: '100%',
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
    '& > img': {
      width: '6em',
      paddingTop: '30vh',
      paddingBottom: '4em',
      [theme.breakpoints.up('lg')]: {
        paddingTop: '20vh',
        width: '10em'
      }
    }
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: '2em',
    lineHeight: '1.5em',
    [theme.breakpoints.up('lg')]: {
      fontSize: '3em',
    }
  }
}));

const HeroImage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img src={MessageBubble} alt="Message bubble icon" />
      <Typography variant="h2" className={classes.text}>
        Converse with anyone<br />
        with any language
      </Typography>
    </Box>
  );
}
 
export default HeroImage;