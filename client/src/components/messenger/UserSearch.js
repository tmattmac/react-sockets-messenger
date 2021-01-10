import React, { useEffect, useState, useRef } from 'react';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { debounce } from 'lodash';

const useStyles = makeStyles(theme => ({
  searchField: {
    paddingRight: 0,
    backgroundColor: "#fff",
    marginBottom: theme.spacing(2)
  }
}))

const UserSearch = ({ doSearch, live = true, delay = 500 }) => {
  const classes = useStyles();

  const [term, setTerm] = useState('');

  const { current: delaySearch } = useRef(debounce(doSearch, delay));
  useEffect(() => {
    live && term && delaySearch(term);
  }, [term, live, delaySearch]);

  const handleChange = (e) => {
    setTerm(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    live ? delaySearch.flush() : doSearch(term);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        placeholder="Search"
        variant="filled"
        fullWidth
        value={term}
        onChange={handleChange}
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
  )
}

export default UserSearch;