/* eslint-disable no-return-assign */
/* eslint-disable no-multi-spaces */
/* eslint-disable indent */
/* eslint-disable camelcase */
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import useFetch from '../../utils/use-fetch';
import Tools from './Tools';
import mailRequest from '../../utils/mail-request';
import { getSnackbarState, SNACKBAR_VARIANT } from '../Snackbar';
import noMailImage from '../../assets/imgs/no-mail.png';
import errorHandler from '../../utils/error-handler';
import { changeUrlWithoutRunning, getQueryByOptions } from '../../utils/url/change-query';
import HeadTitle from '../HeadTitle';

const WASTEBASKET_MAILBOX = '휴지통';
const ACTION = {
  STAR: 'star',
  DELETE: 'delete',
  READ: 'read',
  DELETE_FOREVER: 'deleteForever',
};

const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제를 실패하였습니다.',
    STAR: '메일 중요표시에 실패하였습니다.',
    UNSTAR: '메일 중요표시 해제에 실패하였습니다.',
    LOAD: '메일 불러오기에 실패하였습니다.',
    DELETE_FOREVER: '메일 영구 삭제에 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: '메일을 삭제하였습니다.',
    STAR: '메일 중요표시를 하였습니다.',
    UNSTAR: '메일 중요표시를 해제하였습니다.',
    DELETE_FOREVER: '메일을 영구 삭제하였습니다.',
  },
};

const loadNewMails = async (query, dispatch) => {
  const { isError, data } = await mailRequest.get(`/mail/?${query}`);
  if (isError) {
    throw SNACKBAR_MSG.ERROR.LOAD;
  }
  dispatch(handleMailsChange({ ...data }));
};

const handleAction = {
  [ACTION.STAR]: async ({ mail, openSnackbar }) => {
    try {
      mail.is_important = !mail.is_important;
      const { isError } = await mailRequest.update(mail.no, { is_important: mail.is_important });
      if (isError) {
        throw mail.is_important ? SNACKBAR_MSG.ERROR.UNSTAR : SNACKBAR_MSG.ERROR.STAR;
      }
      openSnackbar(
        SNACKBAR_VARIANT.SUCCESS,
        mail.is_important ? SNACKBAR_MSG.SUCCESS.STAR : SNACKBAR_MSG.SUCCESS.UNSTAR,
      );
    } catch (errorMessage) {
      openSnackbar(SNACKBAR_VARIANT.ERROR, errorMessage);
    }
  },
  [ACTION.DELETE]: async ({ mail, dispatch, query, wastebasketNo, openSnackbar }) => {
    try {
      const { isError } = await mailRequest.update(mail.no, { category_no: wastebasketNo });
      if (isError) {
        throw SNACKBAR_MSG.ERROR.DELETE;
      }
      await loadNewMails(query, dispatch);
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE);
    } catch (errorMessage) {
      openSnackbar(SNACKBAR_VARIANT.ERROR, errorMessage);
    }
  },
  [ACTION.DELETE_FOREVER]: async ({ mail, dispatch, query, openSnackbar }) => {
    try {
      const { isError } = await mailRequest.remove(mail.no);
      if (isError) {
        throw SNACKBAR_MSG.ERROR.DELETE_FOREVER;
      }
      await loadNewMails(query, dispatch);
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE_FOREVER);
    } catch (errorMessage) {
      openSnackbar(SNACKBAR_VARIANT.ERROR, errorMessage);
    }
  },
  [ACTION.READ]: ({ mail, dispatch, index, urlQuery }) => {
    mail.index = index;
    dispatch(handleMailClick(mail));
    changeUrlWithoutRunning({ ...urlQuery, view: 'read', mailNo: mail.no });
  },
};

const MailArea = () => {
  const router = useRouter();
  const { query: urlQuery } = router;
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const query = getQueryByOptions(urlQuery).join('&');
  const URL = `/mail?${query}`;

  const fetchingMailData = useFetch(URL);
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));

  useEffect(() => {
    dispatch(initCheckerInTools());
    dispatch(handleMailsChange({ ...fetchingMailData.data }));
  }, [dispatch, fetchingMailData.data]);

  if (fetchingMailData.loading) {
    return <Loading />;
  }

  if (fetchingMailData.error) {
    return errorHandler(fetchingMailData.error);
  }

  if (!state.mails) {
    return <Loading />;
  }

  const { mails, paging, categoryNoByName, category, categoryNameByNo } = state;
  const wastebasketNo = categoryNoByName[WASTEBASKET_MAILBOX];
  const categories = {};
  Object.entries(categoryNoByName).map(([k, v]) => (categories[v] = k));

  const mailList =
    mails.length > 0 ? (
      mails.map((mail, index) => (
        <MailTemplate
          key={mail.no}
          mail={mail}
          index={index}
          selected={mail.selected}
          categories={categories}
        />
      ))
    ) : (
      <S.NothingMailView>
        <img src={noMailImage} alt="no-mail" />
      </S.NothingMailView>
    );

  const handleMailListAreaClick = ({ target }) => {
    if (typeof target.className === 'object') {
      target = target.parentNode;
    }

    const { id } = target;
    if (id === '') {
      return;
    }

    const [action, index] = id.split('-');
    const mail = mails[index];
    if (Object.values(ACTION).includes(action)) {
      handleAction[action]({ mail, dispatch, query, wastebasketNo, openSnackbar, index, urlQuery });
    }
  };

  const categoryName = category === 0 ? '전체메일함' : categoryNameByNo[category];
  const title = `${categoryName} (${paging.totalCount}) - 다잇누`;
  return (
    <S.MailArea>
      <HeadTitle title={title} />
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
