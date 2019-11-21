import React from 'react';
import Router from 'next/router';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default () => {
  const classes = useStyles();

  const handleSignOutBtnClick = () => {
    window.sessionStorage.clear();
    axios.post('/auth/logout');
    Router.push('/login');
  };

  return (
    <Button variant="contained" className={classes.button} onClick={handleSignOutBtnClick}>
      로그아웃
    </Button>
  );
};
