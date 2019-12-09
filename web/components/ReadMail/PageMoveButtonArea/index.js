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

  const handlePrevBtnClick = async () => {
    let newMails = mails;
    if (index === 0) {
      const query = getQueryByOptions({ category, page: page - 1, sort });
      newMails = await loadNewMails({ query, dispatch });
      index = mails.length;
    }
    const mail = newMails[index - 1];
    mail.index = index - 1;
    dispatch(setMail(mail));
  };

  const handleNextBtnClick = async () => {
    let newMails = mails;
    if (index === mails.length - 1) {
      const query = getQueryByOptions({ category, page: page + 1, sort });
      newMails = await loadNewMails({ query, dispatch });
      index = -1;
    }
    const mail = newMails[index + 1];
    mail.index = index + 1;
    dispatch(setMail(mail));
  };

  return (
    <S.Container>
      <IconButton disabled={isDisabledPrevBtn(index, paging)} onClick={handlePrevBtnClick}>
        <ArrowBack />
      </IconButton>
      <IconButton
        disabled={isDisabledNextBtn(index, paging, mailCount)}
        onClick={handleNextBtnClick}>
        <ArrowForward />
      </IconButton>
    </S.Container>
  );
};

export default PageMoveButtonArea;
