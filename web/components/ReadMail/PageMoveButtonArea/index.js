import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as S from './styled';

const PageMoveButtonArea = ({ no }) => {
  return (
    <S.Container>
      <IconButton>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton>
        <ArrowForwardIosIcon />
      </IconButton>
    </S.Container>
  );
};

export default PageMoveButtonArea;
