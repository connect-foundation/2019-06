import React, { useContext } from 'react';
import Router from 'next/router';
import Button from '@material-ui/core/Button';

import request from '../../utils/request';
import storage from '../../utils/storage';
import { AppDispatchContext } from '../../contexts';
import { initState } from '../../contexts/reducer';

export default () => {
  const { dispatch } = useContext(AppDispatchContext);

  const handleSignOutBtnClick = () => {
    storage.clear();

    request.post('/auth/logout', {});
    dispatch(initState());
    Router.push('/');
  };

  return (
    <Button variant="contained" onClick={handleSignOutBtnClick}>
      로그아웃
    </Button>
  );
};
