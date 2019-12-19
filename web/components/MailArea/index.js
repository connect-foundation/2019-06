import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import MailTemplate from './MailTemplate';
import S from './styled';
import Paging from './Paging';
import { AppDispatchContext, AppStateContext } from '../../contexts';
import Loading from '../Loading';
import { handleMailsChange, initCheckerInTools } from '../../contexts/reducer';
import useFetch from '../../utils/use-fetch';
import Tools from './Tools';
import noMailImage from '../../assets/imgs/no-mail.png';
import errorHandler from '../../utils/error-handler';
import { getQueryByOptions, getRequestPathByQuery } from '../../utils/url/change-query';
import HeadTitle from '../HeadTitle';

const getMailList = mails => {
  if (mails.length === 0) {
    return (
      <S.NothingMailView>
        <img src={noMailImage} alt="no-mail" />
      </S.NothingMailView>
    );
  }

  return mails.map(mail => <MailTemplate key={mail.no} mail={mail} />);
};

const MailArea = () => {
  const { query } = useRouter();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const queryString = getQueryByOptions(query);
  const requestPath = getRequestPathByQuery(query);
  const url = `${requestPath}?${queryString}`;
  const fetchingMailData = useFetch(url);

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

  const { mails, paging, categoryNoByName, categoryNameByNo } = state;
  if (!categoryNoByName || !mails) {
    return <Loading />;
  }

  const mailList = getMailList(mails);
  const categoryNo = +query.category || 0;
  const categoryName = categoryNo === 0 ? '전체메일함' : categoryNameByNo[categoryNo];
  const title = `${categoryName} (${paging.totalCount})`;

  return (
    <S.MailArea>
      <HeadTitle title={title} />
      <Tools />
      <S.MailListArea>{mailList}</S.MailListArea>
      <S.MailPagingArea>
        <Paging paging={paging} />
      </S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
