import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { StarBorder as StarBorderIcon, Star as StarIcon } from '@material-ui/icons';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import * as S from './styled';
import PageMoveButtonArea from './PageMoveButtonArea';
import { handleSnackbarState, setMail } from '../../contexts/reducer';
import { AppStateContext, AppDispatchContext } from '../../contexts';
import FileList from './FileList';
import request from '../../utils/request';
import { getSnackbarState, SNACKBAR_VARIANT } from '../Snackbar';
import Tools from './Tools';

const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제를 실패하였습니다.',
    STAR: '메일 중요표시에 실패하였습니다.',
    UNSTAR: '메일 중요표시 해제에 실패하였습니다.',
    FILE_LOAD: '파일 불러오기에 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: '메일을 삭제하였습니다.',
    STAR: '메일 중요표시를 하였습니다.',
    UNSTAR: '메일 중요표시를 해제하였습니다.',
  },
};

const Viewer = dynamic(import('./Viewer'), { ssr: false });

const useStyles = makeStyles(() => ({
  unstar: {
    color: '#808080',
    '&:hover': {
      color: yellow[800],
    },
  },
  star: {
    color: yellow[800],
    '&:hover': {
      color: '#1976d2',
    },
  },
}));

const updateMail = async (no, props) => {
  return request.patch(`/mail/${no}`, { props });
};

const loadAttachments = async (mailTemplateNo, setAttachments) => {
  const url = `/mail/template/${mailTemplateNo}/attachments`;
  const { data } = await request.get(url);
  setAttachments(data.attachments);
};

const ReadMail = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const [attachments, setAttachments] = useState(null);
  const { is_important, MailTemplate, no, reservation_time, index } = state.mail;
  const { from, to, subject, text, html, createdAt, no: mailTemplateNo } = MailTemplate;
  const receivers = to.replace(',', ', ');
  const date = moment(createdAt).format('YYYY-MM-DD HH:mm');
  const classes = useStyles();
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));

  useEffect(() => {
    loadAttachments(mailTemplateNo, setAttachments);
    updateMail(no, { is_read: true });
  }, [no, mailTemplateNo]);

  const handleStarClick = async () => {
    const { isError, data } = await updateMail(no, { is_important: !is_important });
    let message;
    if (isError) {
      message = !is_important ? SNACKBAR_MSG.ERROR.UNSTAR : SNACKBAR_MSG.ERROR.STAR;
      openSnackbar(SNACKBAR_VARIANT.ERROR, message);
      return;
    }
    message = !is_important ? SNACKBAR_MSG.SUCCESS.STAR : SNACKBAR_MSG.SUCCESS.UNSTAR;
    data.MailTemplate = MailTemplate;
    data.index = index;
    dispatch(setMail(data));
    openSnackbar(SNACKBAR_VARIANT.SUCCESS, message);
  };

  return (
    <S.Container>
      <Tools />
      <S.ReadArea>
        <S.TitleView>
          <S.Subject>
            {is_important ? (
              <StarIcon className={classes.star} onClick={handleStarClick} />
            ) : (
              <StarBorderIcon className={classes.unstar} onClick={handleStarClick} />
            )}
            <h3>{subject || '제목없음'}</h3>
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
        <S.ReadFrame>
          <Viewer html={html} text={text} />
        </S.ReadFrame>
        {attachments && <FileList files={attachments} />}
      </S.ReadArea>
      <PageMoveButtonArea index={+index} />
    </S.Container>
  );
};

export default ReadMail;
