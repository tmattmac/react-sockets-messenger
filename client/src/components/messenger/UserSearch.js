import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  TextField, 
  InputAdornment, 
  makeStyles, 
  Popper, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  Typography,
  CircularProgress,
  ClickAwayListener
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { debounce } from 'lodash';
import useSearch from '../../hooks/useSearch';

const useStyles = makeStyles(theme => ({
  searchField: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2)
  },
  dropdown: {
    padding: '0.5em 0',
    textAlign: 'center'
  }
}))

const UserSearch = ({ live = true, delay = 500 }) => {
  const classes = useStyles();
  const history = useHistory();

  // configure dropdown menu
  const anchor = useRef();
  const [open, setOpen] = useState(false);
  const setPopperWidth = (data) => {
    const { width, left, right } = data.offsets.reference;
  
    data.styles.width = width;
    data.offsets.popper.width = width;
    data.offsets.popper.left = left;
    data.offsets.popper.right = right;
  
    return data;
  }

  // configure live search
  const [term, setTerm] = useState('');
  const [doSearch, results, loading] = useSearch('/api/users');
  const searchAndOpenMenu = (term) => {
    if (term) {
      doSearch(term);
      setOpen(true);
    }
    else setOpen(false);
  }

  const { current: delaySearch } = useRef(debounce(searchAndOpenMenu, delay));
  useEffect(() => {
    live && delaySearch(term);
  }, [term, live, delaySearch]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    live ? delaySearch.flush() : doSearch(term);
  }

  const handleClose = async (e) => {
    setOpen(false);
    // get conversation ID and forward
    // TODO: Provide some kind of loading feedback
    if (e.currentTarget.dataset && e.currentTarget.dataset.username) {
      setTerm('');
      const username = e.currentTarget.dataset.username;
      const url = new URL('/api/conversations/withUsers', window.location.origin);
      const params = { toUsers: [username] };
      url.search = new URLSearchParams(params).toString();
      const res = await fetch(url);
      const data = await res.json();
      if (data.conversationId) {
        history.push(`/messages/${data.conversationId}`)
      }
      else if (res.status === 404) {
        history.push('/messages/new', { users: [username] })
      }
      // handle server errors at some point
    }
  }


  let dropdownContent;
  if (loading) {
    dropdownContent = (
      <Box className={classes.dropdown}>
        <CircularProgress />
      </Box>
    );
  }
  else if (results.length === 0) {
    dropdownContent = (
      <Box className={classes.dropdown}>
        <Typography variant="body1">
          No users found.
        </Typography>
      </Box>
    );
  }
  else {
    dropdownContent = (
      <List>
        {results.map(username => (
          <ListItem 
            button 
            onClick={handleClose} 
            key={username} 
            data-username={username}
          >
            <ListItemText>{username}</ListItemText>
          </ListItem>
        ))}
      </List>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          placeholder="Search"
          variant="filled"
          fullWidth
          value={term}
          onChange={handleChange}
          ref={anchor}
          InputProps={{
            className: classes.searchField,
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </form>
      <ClickAwayListener onClickAway={handleClose}>
        <Popper
          anchorEl={anchor.current}
          open={open}
          placement="bottom-start"
          onClose={handleClose}
          modifiers={{
            setWidth: {
              enabled: true,
              order: 849,
              fn: setPopperWidth
            }
          }}
        >
          <Paper>
            {dropdownContent}
          </Paper>
        </Popper>
      </ClickAwayListener>
    </>
  )
}

export default UserSearch;