import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useRouter } from 'next/router';
import * as S from './styled';
import request from '../../../utils/request';
import { AppStateContext, AppDispatchContext } from '../../../contexts';
import { handleMailsChange } from '../../../contexts/reducer';
import {
  getQueryByOptions,
  changeUrlWithoutRunning,
  getRequestPathByQuery,
} from '../../../utils/url/change-query';

const actionToMove = {
  prev: {
    move: i => i - 1,
    isNeedNewMails: (idx, paging) => idx === 0 && paging.page > 1,
    setIndex: mails => mails.length,
  },
  next: {
    move: i => i + 1,
    isNeedNewMails: (idx, paging, count) => idx === count - 1 && paging.page < paging.totalPage,
    setIndex: () => -1,
  },
};

const loadNewMails = async (url, dispatch) => {
  const { isError, data } = await request.get(url);
  if (!isError) {
    dispatch(handleMailsChange({ ...data }));
  }
  return data.mails;
};

const isDisabledPrevBtn = (index, paging) => index < 1 && paging.page === 1;
const isDisabledNextBtn = (index, paging, mailCount) =>
  index === mailCount - 1 && paging.page === paging.totalPage;

const PageMoveButtonArea = ({ index }) => {
  const { query } = useRouter();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { mails, paging } = state;
  const mailCount = mails.length;

  const handleMoveBtnClick = ({ move, isNeedNewMails, setIndex }) => async () => {
    let newMails = mails;
    let movedPage = paging.page;
    if (isNeedNewMails(index, paging, mailCount)) {
      movedPage = move(paging.page);
      const queryString = getQueryByOptions({ ...query, page: movedPage });
      const requestPath = getRequestPathByQuery(query);
      const url = `${requestPath}?${queryString}`;
      newMails = await loadNewMails(url, dispatch);
      index = setIndex(newMails);
    }
    console.log(newMails);
    const mail = newMails[move(index)];
    changeUrlWithoutRunning({
      ...query,
      page: movedPage,
      mailNo: mail.no,
      mailIndex: mail.index,
    });
  };

  return (
    <S.Container>
      <IconButton
        disabled={isDisabledPrevBtn(index, paging)}
        onClick={handleMoveBtnClick(actionToMove.prev)}>
        <ArrowBack />
      </IconButton>
      <S.PageNumberView>{paging.perPageNum * (paging.page - 1) + index + 1}</S.PageNumberView>
      <IconButton
        disabled={isDisabledNextBtn(index, paging, mailCount)}
        onClick={handleMoveBtnClick(actionToMove.next)}>
        <ArrowForward />
      </IconButton>
    </S.Container>
  );
};

export default PageMoveButtonArea;
