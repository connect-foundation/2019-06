import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useRouter } from 'next/router';
import * as S from './styled';
import request from '../../../utils/request';
import { AppStateContext, AppDispatchContext } from '../../../contexts';
import { setMail, handleMailsChange } from '../../../contexts/reducer';
import getQueryByOptions from '../../../utils/query';
import { changeUrlWithoutRunning } from '../../../utils/url/change-query';

const funcToMove = {
  prev: {
    move: i => i - 1,
    isLimit: idx => idx === 0,
    setIndex: mails => mails.length,
  },
  next: {
    move: i => i + 1,
    isLimit: (idx, count) => idx === count - 1,
    setIndex: () => -1,
  },
};

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
  const { query: urlQuery } = useRouter();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { mails, category, sort, paging } = state;
  const mailCount = mails.length;

  const handleMoveBtnClick = async ({ move, isLimit, setIndex }) => {
    let newMails = mails;
    if (isLimit(index, mailCount)) {
      const query = getQueryByOptions({ category, page: move(paging.page), sort });
      newMails = await loadNewMails({ query, dispatch });
      index = setIndex(newMails);
    }
    const mail = newMails[move(index)];
    mail.index = move(index);
    dispatch(setMail(mail));
    changeUrlWithoutRunning({ ...urlQuery, mailNo: mail.no });
  };

  return (
    <S.Container>
      <IconButton
        disabled={isDisabledPrevBtn(index, paging)}
        onClick={handleMoveBtnClick.bind(null, funcToMove.prev)}>
        <ArrowBack />
      </IconButton>
      <S.PageNumberView>{paging.perPageNum * (paging.page - 1) + index + 1}</S.PageNumberView>
      <IconButton
        disabled={isDisabledNextBtn(index, paging, mailCount)}
        onClick={handleMoveBtnClick.bind(null, funcToMove.next)}>
        <ArrowForward />
      </IconButton>
    </S.Container>
  );
};

export default PageMoveButtonArea;
