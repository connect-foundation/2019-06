import React, { useState, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import * as S from './styled';
import request from '../../../utils/request';
import { AppStateContext, AppDispatchContext } from '../../../contexts';
import { handleMailClick } from '../../../contexts/reducer';
import getQueryByOptions from '../../../utils/query';
import ReadMail from '..';

const PageMoveButtonArea = ({ index }) => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { mails, category, page, sort } = state;

  const handleArrowClick = indexOfMails => {
    mails[indexOfMails].index = indexOfMails;
    dispatch(handleMailClick(mails[indexOfMails], <ReadMail />));
  };

  return (
    <S.Container>
      <IconButton disabled={index < 1} onClick={handleArrowClick.bind(null, index - 1)}>
        <ArrowBack />
      </IconButton>
      <IconButton
        disabled={index === mails.length - 1}
        onClick={handleArrowClick.bind(null, index + 1)}>
        <ArrowForward />
      </IconButton>
    </S.Container>
  );
};

export default PageMoveButtonArea;
