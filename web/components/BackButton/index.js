import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Router from 'next/router';

const handleBackBtnClick = () => {
  Router.back();
};

export default () => {
  return (
    <ArrowBackIosIcon
      style={{ cursor: 'pointer' }}
      fontSize={'small'}
      onClick={handleBackBtnClick}
    />
  );
};
