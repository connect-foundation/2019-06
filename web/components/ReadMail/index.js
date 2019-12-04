import React, { useContext, useState, useCallback } from 'react';
import moment from 'moment';
import { StarBorder } from '@material-ui/icons';
import * as S from './styled';
import PageMoveButtonArea from './PageMoveButtonArea';
import { AppStateContext } from '../../contexts';
import ToolGroup from './ToolGroup';
import FileList from './FileList';
import useFetch from '../../utils/use-fetch';

const ReadMail = () => {
  const { state } = useContext(AppStateContext);
  const [attachments, setAttachments] = useState(null);
  const {
    to,
    from,
    subject,
    createdAt,
    text,
    html,
    no,
    mailTemplateNo,
    reservation_time,
  } = state.mail;
  const receivers = to.replace(',', ', ');
  const date = moment(createdAt).format('YYYY-MM-DD HH:mm');
  const URL = `/mail/template/${mailTemplateNo}/attachments`;
  const setFileList = useCallback(
    (err, data) => {
      if (!err) {
        setAttachments(data.attachments);
      }
    },
    [mailTemplateNo],
  );

  useFetch(setFileList, URL);

  return (
    <S.Container>
      <ToolGroup />
      <S.ReadArea>
        <S.TitleView>
          <S.Subject>
            <StarBorder />
            <h3>{subject}</h3>
            <div>
              <S.Text>{reservation_time && '예약'}</S.Text>
              <span>{date}</span>
            </div>
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
        <S.ReadFrame>{html || text}</S.ReadFrame>
        {attachments && <FileList files={attachments} />}
      </S.ReadArea>
      <PageMoveButtonArea no={no} />
    </S.Container>
  );
};

export default ReadMail;
