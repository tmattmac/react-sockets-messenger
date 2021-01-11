import React, { useEffect, useState, useRef } from 'react';
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
  CircularProgress
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { debounce } from 'lodash';
import useSearch from '../../hooks/useSearch';

const useStyles = makeStyles(theme => ({
  searchField: {
    paddingRight: 0,
    backgroundColor: "#fff",
    marginBottom: theme.spacing(2)
  },
  dropdown: {
    padding: '0.5em 0',
    textAlign: 'center'
  }
}))

const UserSearch = ({ live = true, delay = 500 }) => {
  const classes = useStyles();

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

  const handleClose = (e) => {
    setOpen(false);
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
          <ListItem button onClose={handleClose} key={username}>
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
          onBlur={handleClose}
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
    </>
  )
}

export default UserSearch;