/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ReadMail from '../ReadMail';
import MailTemplate from '../MailTemplate';
import S from './styled';
import Paging from '../Paging';
import { AppContext } from '../../contexts';
import { handleCategoryClick, handleMailsChange } from '../../contexts/reducer';
import Loading from '../Loading';

const useFetch = ({ category, page }, dispatch) => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitData = async (callback, URL) => {
    setIsLoading(true);
    const { data } = await axios.get(URL);
    callback(data.mails);
    setIsLoading(false);
  };

  useEffect(() => {
    const URL = `/mail?category=${category}&page=${page}`;
    const callback = mails => dispatch(handleMailsChange({ category, ...mails, page }));
    fetchInitData(callback, URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  return isLoading;
};

const MailArea = () => {
  const { state, dispatch } = useContext(AppContext);
  const [selected, setSelected] = useState(null);
  const isLoading = useFetch(state, dispatch);

  if (isLoading) {
    return <Loading />;
  }

  const { mails, paging } = state;

  const processedMails = mails.map(mail => {
    const { is_important, is_read, MailTemplate, no } = mail;
    const { from, subject, text, createdAt } = MailTemplate;
    return {
      from,
      subject,
      text,
      createdAt,
      is_important,
      is_read,
      no,
    };
  });

  let mailTemplates = processedMails.map((mail, i) => (
    <MailTemplate key={`mail-${i}`} mail={mail} setSelected={setSelected} no={mail.no} />
  ));
  if (mailTemplates.length === 0) {
    mailTemplates = '메일이 없습니다.';
  }

  return (
    <S.MailArea>
      <S.Tools>{selected ? 'mail' : 'maillist'}</S.Tools>
      <S.MailListArea>
        {selected ? <ReadMail mail={selected.mail} /> : mailTemplates}
      </S.MailListArea>
      <S.MailPagingArea>
        <Paging paging={paging} />
      </S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
