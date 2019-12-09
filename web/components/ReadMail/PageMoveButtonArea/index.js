import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import * as S from './styled';
import request from '../../../utils/request';
import { AppStateContext, AppDispatchContext } from '../../../contexts';
import { setMail, handleMailsChange } from '../../../contexts/reducer';
import getQueryByOptions from '../../../utils/query';

const loadNewMails = async ({ query, dispatch }) => {
  const { isError, data } = await request.get(`/mail/?${query}`);
  if (!isError) {
    dispatch(handleMailsChange({ ...data }));
  }
  return data.mails;
};

const isDisabledPrevBtn = (index, paging) => index < 1 && paging.page === 1;
const isDisabledNextBtn = (index, paging, mailCount) =>
  index === mailCount - 1 && paging.page === paging.totalPage;

const PageMoveButtonArea = ({ index }) => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { mails, category, sort, paging, page } = state;
  const mailCount = mails.length;

  const valueToMove = {
    prev: {
      move: i => i - 1,
      isLimit: index === 0,
      newIndex: mails.length,
    },
    next: {
      move: i => i + 1,
      isLimit: index === mails.length - 1,
      newIndex: -1,
    },
  };

  const handleMoveBtnClick = async ({ move, isLimit, newIndex }) => {
    let newMails = mails;
    if (isLimit) {
      const query = getQueryByOptions({ category, page: move(page), sort });
      newMails = await loadNewMails({ query, dispatch });
      index = newIndex;
    }
    const mail = newMails[move(index)];
    mail.index = move(index);
    dispatch(setMail(mail));
  };

  return (
    <S.Container>
      <IconButton
        disabled={isDisabledPrevBtn(index, paging)}
        onClick={handleMoveBtnClick.bind(null, valueToMove.prev)}>
        <ArrowBack />
      </IconButton>
      <IconButton
        disabled={isDisabledNextBtn(index, paging, mailCount)}
        onClick={handleMoveBtnClick.bind(null, valueToMove.next)}>
        <ArrowForward />
      </IconButton>
    </S.Container>
  );
};

export default PageMoveButtonArea;
