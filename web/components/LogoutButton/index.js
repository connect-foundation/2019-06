import React from 'react';
import Button from '@material-ui/core/Button';

import request from '../../utils/request';

export default () => {
  const handleSignOutBtnClick = () => {
    window.sessionStorage.clear();
    request.post('/auth/logout', {});
    window.location.href = '/login';
  };

  return (
    <Button variant="contained" onClick={handleSignOutBtnClick}>
      로그아웃
    </Button>
  );
};
