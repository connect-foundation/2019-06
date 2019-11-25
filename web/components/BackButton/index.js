import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Router from 'next/router';

export default () => {
  const handleBackBtnClick = () => {
    Router.back();
  };

  return (
    <ArrowBackIosIcon
      style={{ cursor: 'pointer' }}
      fontSize={'small'}
      onClick={handleBackBtnClick}
    />
  );
};
