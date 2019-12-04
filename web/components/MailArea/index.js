/* eslint-disable camelcase */
import React, { useState, useContext, useCallback } from 'react';
import MailTemplate from './MailTemplate';
import S from './styled';
import Paging from './Paging';
import { AppDisapthContext, AppStateContext } from '../../contexts';
import Loading from '../Loading';
import { handleMailClick, handleMailsChange, initCheckerInTools } from '../../contexts/reducer';
import useFetch from '../../utils/use-fetch';
import getQueryByOptions from '../../utils/query';
import Tools from './Tools';
import { handleErrorStatus } from '../../utils/error-handler';
import ReadMail from '../ReadMail';
import request from '../../utils/request';
import MessageSnackbar from '../Snackbar';
import noMailImage from '../../assets/imgs/no-mail.png';

const WASTEBASKET_NAME = '휴지통';

const ACTION = {
  MARK: 'mark',
  DELETE: 'delete',
  READ: 'read',
};

const snackbarInitState = {
  open: false,
  variant: 'error',
  contentText: '',
};

const SNACKBAR_MSG = {
  MAIL_DELETE_FAIL: '업데이트를 실패하였습니다.',
  MAILS_LOAD_FAIL: '메일 리스트 로드를 실패하였습니다.',
};

const convertMailToRead = mail => {
  const { is_important, is_read, MailTemplate, no, reservation_time } = mail;
  const { from, to, subject, text, createdAt, no: mailTemplateNo } = MailTemplate;
  return {
    from,
    to,
    subject,
    text,
    createdAt,
    is_important,
    is_read,
    no,
    mailTemplateNo,
    reservation_time,
  };
};

const loadNewMails = async (query, dispatch, setSnackbarState) => {
  const { isError, data } = await request.get(`/mail/?${query}`);
  if (isError) {
    setSnackbarState({
      open: true,
      variant: 'error',
      contentText: SNACKBAR_MSG.MAILS_LOAD_FAIL,
    });
    return;
  }
  dispatch(handleMailsChange({ ...data }));
};

const updateMail = async (no, props, setSnackbarState) => {
  const { isError } = await request.patch(`/mail/${no}`, { props });
  if (isError) {
    setSnackbarState({
      open: true,
      variant: 'error',
      contentText: SNACKBAR_MSG.MAIL_UPDATE_FAIL,
    });
  }
};

const MailArea = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDisapthContext);
  const [snackbarState, setSnackbarState] = useState(snackbarInitState);
  const query = getQueryByOptions(state);
  const URL = `/mail?${query}`;
  const setMailList = useCallback(
    (err, data) => (
      err ? handleErrorStatus(err) : dispatch(initCheckerInTools()),
      dispatch(handleMailsChange({ ...data }))
    ),
    [dispatch],
  );

  const messageSnackbarProps = {
    snackbarState,
    handleClose: () => setSnackbarState({ ...snackbarState, open: false }),
  };

  const isLoading = useFetch(setMailList, URL);
  if (isLoading) {
    return <Loading />;
  }

  const { mails, paging, categoryNoByName } = state;
  const mailList =
    mails.length > 0 ? (
      mails.map((mail, index) => (
        <MailTemplate key={mail.no} mail={mail} index={index} selected={mail.selected} />
      ))
    ) : (
      <S.NothingMailView>
        <img src={noMailImage} alt="no-mail" />
      </S.NothingMailView>
    );

  const handleMailListAreaClick = async ({ target }) => {
    if (typeof target.className === 'object') {
      target = target.parentNode;
    }

    const { id } = target;
    if (id === '') {
      return;
    }

    const [action, index] = id.split('-');
    const mail = mails[index];

    switch (action) {
      case ACTION.MARK: {
        await updateMail(mail.no, { is_important: !mail.is_important }, setSnackbarState);
        loadNewMails(query, dispatch, setSnackbarState);
        break;
      }
      case ACTION.DELETE: {
        const wastebasketNo = categoryNoByName[WASTEBASKET_NAME];
        await updateMail(mail.no, { category_no: wastebasketNo }, setSnackbarState);
        loadNewMails(query, dispatch, setSnackbarState);
        break;
      }
      case ACTION.READ: {
        const mailToRead = convertMailToRead(mail);
        dispatch(handleMailClick(mailToRead, <ReadMail />));
        updateMail(mail.no, { is_read: true }, setSnackbarState);
        break;
      }
      default:
        break;
    }
  };

  return (
    <S.MailArea>
      <MessageSnackbar {...messageSnackbarProps} />
      <S.ToolsWrapper>
        <Tools />
      </S.ToolsWrapper>
      <S.MailListArea onClick={handleMailListAreaClick}>{mailList}</S.MailListArea>
      <S.MailPagingArea>
        <Paging paging={paging} />
      </S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
