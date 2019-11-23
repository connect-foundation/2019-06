import React, { useContext } from 'react';
import * as S from './styled';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { AppContext } from '../../contexts';
import { setSelected } from '../../contexts/reducer';

const PageMoveButtonArea = () => {
  const { state, dispatch } = useContext(AppContext);
  const { mails, selected } = state;
  const handlePrevClick = () =>
    dispatch(setSelected(mails[selected.no - 1].MailTemplate, selected.no - 1));
  const handleNextClick = () =>
    dispatch(setSelected(mails[selected.no + 1].MailTemplate, selected.no + 1));

  return (
    <S.Container>
      <IconButton disabled={selected.no < 1} onClick={handlePrevClick}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton disabled={selected.no === mails.length - 1} onClick={handleNextClick}>
        <ArrowForwardIosIcon />
      </IconButton>
    </S.Container>
  );
};

export default PageMoveButtonArea;
