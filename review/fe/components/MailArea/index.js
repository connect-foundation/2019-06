/* eslint-disable camelcase */
import React, { useState, useContext, useMemo } from 'react';
import MailTemplate from './MailTemplate';
import S from './styled';
import Paging from './Paging';
import { AppDispatchContext, AppStateContext } from '../../contexts';
import Loading from '../Loading';
import {
  handleMailClick,
  handleMailsChange,
  initCheckerInTools,
  handleSnackbarState,
} from '../../contexts/reducer';
import useFetch from '../../../utils/use-fetch';
import getQueryByOptions from '../../utils/query';
import Tools from './Tools';
import ReadMail from '../ReadMail';
import request from '../../../utils/request';
import { getSnackbarState, SNACKBAR_VARIANT } from '../Snackbar';
import noMailImage from '../../assets/imgs/no-mail.png';
import errorHandler from '../../../utils/error-handler';

const WASTEBASKET_NAME = '휴지통';

const ACTION = {
  STAR: 'star',
  DELETE: 'delete',
  READ: 'read',
};

const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제를 실패하였습니다.',
    STAR: '메일 중요표시에 실패하였습니다.',
    UNSTAR: '메일 중요표시 해제에 실패하였습니다.',
    LOAD: '메일 불러오기에 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: '메일을 삭제하였습니다.',
    STAR: '메일 중요표시를 하였습니다.',
    UNSTAR: '메일 중요표시를 해제하였습니다.',
  },
};

const convertMailToRead = mail => {
  const { is_important, is_read, MailTemplate, no, reservation_time } = mail;
  const { from, to, subject, text, html, createdAt, no: mailTemplateNo } = MailTemplate;
  return {
    from,
    to,
    subject: subject || '제목없음',
    text,
    html,
    createdAt,
    is_important,
    is_read,
    no,
    mailTemplateNo,
    reservation_time,
  };
};

const loadNewMails = async (query, dispatch) => {
  const { isError, data } = await request.get(`/mail/?${query}`);
  if (isError) {
    throw SNACKBAR_MSG.ERROR.LOAD;
  }
  dispatch(handleMailsChange({ ...data }));
};

const updateMail = async (no, props) => {
  return request.patch(`/mail/${no}`, { props });
};

const MailArea = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const query = getQueryByOptions(state);
  const URL = `/mail?${query}`;
  const fetchingMailData = useFetch(URL);

  useMemo(() => {
    dispatch(initCheckerInTools());
    dispatch(handleMailsChange({ ...fetchingMailData.data }));
  }, [dispatch, fetchingMailData.data]);

  if (fetchingMailData.loading || !state.mails) {
    return <Loading />;
  }

  if (fetchingMailData.error) {
    return errorHandler(fetchingMailData.error);
  }

  // 랜더링 로직 생략
};

export default MailArea;
