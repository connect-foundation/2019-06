import React, { useContext } from 'react';
import * as S from './styled';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { AppContext } from '../../../contexts';

const PageMoveButtonArea = () => {
  const { state, dispatch } = useContext(AppContext);

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
