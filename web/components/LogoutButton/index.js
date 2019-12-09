import React from 'react';
import Button from '@material-ui/core/Button';

import request from '../../utils/request';
import storage from '../../utils/storage';
import history from '../../utils/history';

export default () => {
  const handleSignOutBtnClick = () => {
    storage.clear();

    request.post('/auth/logout', {});
    history.push('/login');
  };

  return (
    <Button variant="contained" onClick={handleSignOutBtnClick}>
      로그아웃
    </Button>
  );
};
