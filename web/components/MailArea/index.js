/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MailTemplate from '../MailTemplate';
import S from './styled';
import Paging from '../Paging';
import { AppContext } from '../../contexts';
import Loading from '../Loading';
import { handleMailsChange } from '../../contexts/reducer';

const useFetch = ({ category, page }, callback) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitData = async URL => {
    setIsLoading(true);
    const { data } = await axios.get(URL);
    callback(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const URL = `/mail?category=${category}&page=${page}`;
    fetchInitData(URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);
  return isLoading;
};

const MailArea = () => {
  const { state, dispatch } = useContext(AppContext);
  const { category, page } = state;
  const callback = data => dispatch(handleMailsChange({ category, ...data.mails, page }));
  const isLoading = useFetch(state, callback);
  if (isLoading) {
    return <Loading />;
  }

  const { mails, paging } = state;
  const processedMails = mails.map(mail => {
    const { is_important, is_read, MailTemplate, no } = mail;
    const { from, to, subject, text, createdAt } = MailTemplate;
    return {
      from,
      to,
      subject,
      text,
      createdAt,
      is_important,
      is_read,
      no,
    };
  });

  let mailTemplates = processedMails.map((mail, i) => (
    <MailTemplate key={`mail-${i}`} mail={mail} no={i} />
  ));
  if (mailTemplates.length === 0) {
    mailTemplates = '메일이 없습니다.';
  }

  return (
    <S.MailArea>
      <S.Tools>tools</S.Tools>
      <S.MailListArea>{mailTemplates}</S.MailListArea>
      <S.MailPagingArea>
        <Paging paging={paging} />
      </S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
