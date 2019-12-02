import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import * as S from './styled';

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
    axios.post('/auth/logout');
  };

  return (
    <S.ReloadLink href="/">
      <Button variant="contained" className={classes.button} onClick={handleSignOutBtnClick}>
        로그아웃
      </Button>
    </S.ReloadLink>
  );
};
