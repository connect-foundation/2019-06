import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { CircularProgress } from '@material-ui/core';
import * as WM_S from '../styled';

export const Message = ({ icon, msg }) => {
  const iconMapping = {
    0: <CircularProgress size={25} />,
    1: <CheckIcon color="primary" />,
    2: <ErrorOutlineIcon color="error" />,
  };

  return (
    <WM_S.RowWrapper>
      <div></div>
      <div>
        {iconMapping[icon]}
        {msg}
      </div>
    </WM_S.RowWrapper>
  );
};
