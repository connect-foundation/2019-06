/* eslint-disable camelcase */
import React, { useState, useContext, useCallback } from 'react';
import MailTemplate from './MailTemplate';
import S from './styled';
import Paging from './Paging';
import { AppDispatchContext, AppStateContext } from '../../contexts';
import Loading from '../Loading';
import { handleMailClick, handleMailsChange, initCheckerInTools } from '../../contexts/reducer';
import useFetch from '../../utils/use-fetch';
import getQueryByOptions from '../../utils/query';
import Tools from './Tools';
import { handleErrorStatus } from '../../utils/error-handler';
import ReadMail from '../ReadMail';
import request from '../../utils/request';
import MessageSnackbar, {
  snackbarInitState,
  SNACKBAR_VARIANT,
  getSnackbarState,
} from '../Snackbar';
import noMailImage from '../../assets/imgs/no-mail.png';

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

  const handleAction = {
    [ACTION.STAR]: async mail => {
      try {
        mail.is_important = !mail.is_important;
        const { isError } = await updateMail(mail.no, { is_important: mail.is_important });
        if (isError) {
          throw mail.is_important ? SNACKBAR_MSG.ERROR.UNSTAR : SNACKBAR_MSG.ERROR.STAR;
        }
        setSnackbarState(
          getSnackbarState(
            SNACKBAR_VARIANT.SUCCESS,
            mail.is_important ? SNACKBAR_MSG.SUCCESS.STAR : SNACKBAR_MSG.SUCCESS.UNSTAR,
          ),
        );
      } catch (errorMessage) {
        setSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, errorMessage));
      }
    },
    [ACTION.DELETE]: async mail => {
      try {
        const wastebasketNo = categoryNoByName[WASTEBASKET_NAME];
        const { isError } = await updateMail(mail.no, { category_no: wastebasketNo });
        if (isError) {
          throw SNACKBAR_MSG.ERROR.DELETE;
        }
        loadNewMails(query, dispatch);
        setSnackbarState(getSnackbarState(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE));
      } catch (errorMessage) {
        setSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, errorMessage));
      }
    },
    [ACTION.READ]: mail => {
      const mailToRead = convertMailToRead(mail);
      dispatch(handleMailClick(mailToRead, <ReadMail />));
      updateMail(mail.no, { is_read: true });
    },
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
    handleAction[action](mail);
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
