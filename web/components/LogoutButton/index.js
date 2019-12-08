import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import request from '../../utils/request';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: '100px',
  },
}));

export default () => {
  const classes = useStyles();

  const handleSignOutBtnClick = () => {
    window.sessionStorage.clear();
    request.post('/auth/logout', {});
    window.location.href = '/login';
  };

  return (
    <Button variant="contained" className={classes.button} onClick={handleSignOutBtnClick}>
      로그아웃
    </Button>
  );
};
