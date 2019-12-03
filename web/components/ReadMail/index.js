import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { StarBorder } from '@material-ui/icons';
import * as S from './styled';
import PageMoveButtonArea from './PageMoveButtonArea';
import { AppStateContext } from '../../contexts';
import ToolGroup from './ToolGroup';
import request from '../../utils/request';
import FileList from './FileList';

const ReadMail = () => {
  const { state } = useContext(AppStateContext);
  const [attachments, setAttachments] = useState(null);
  const { to, from, subject, createdAt, text, no, mailTemplateNo } = state.mail;
  const receivers = to.replace(',', ', ');
  const date = moment(createdAt)
    .utc()
    .format('YYYY-MM-DD HH:mm');

  useEffect(() => {
    const url = `/mail/template/${mailTemplateNo}/attachments`;
    request.get(url).then(({ data }) => {
      setAttachments(data.attachments);
    });
  }, [mailTemplateNo]);

  return (
    <S.Container>
      <ToolGroup />
      <S.ReadArea>
        <S.TitleView>
          <S.Subject>
            <StarBorder />
            <h3>{subject}</h3>
            <div>{date}</div>
          </S.Subject>
          <S.Address>
            <span>보낸 사람</span>
            <div>{from}</div>
          </S.Address>
          <S.Address>
            <span>받은 사람</span>
            <div>{receivers}</div>
          </S.Address>
        </S.TitleView>
        {attachments && <FileList files={attachments} />}
        <S.ReadFrame>{text}</S.ReadFrame>
      </S.ReadArea>
      <PageMoveButtonArea no={no} />
    </S.Container>
  );
};

export default ReadMail;
