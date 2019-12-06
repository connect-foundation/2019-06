import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { StarBorder, Star } from '@material-ui/icons';
import { yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import * as S from './styled';
import PageMoveButtonArea from './PageMoveButtonArea';
import { handleSnackbarState } from '../../contexts/reducer';
import { AppStateContext, AppDispatchContext } from '../../contexts';
import ToolGroup from './ToolGroup';
import FileList from './FileList';
import request from '../../utils/request';
import { getSnackbarState, SNACKBAR_VARIANT } from '../Snackbar';

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

const ReadMail = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
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
    is_important,
  } = state.mail;
  const [isImportant, setIsImportant] = useState(is_important);
  const receivers = to.replace(',', ', ');
  const date = moment(createdAt).format('YYYY-MM-DD HH:mm');
  const classes = useStyles();
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));

  useEffect(() => {
    const url = `/mail/template/${mailTemplateNo}/attachments`;
    request.get(url).then(({ data }) => {
      setAttachments(data.attachments);
    });
  }, [mailTemplateNo]);

  const handleStarClick = async () => {
    setIsImportant(!isImportant);
    const { isError } = await updateMail(no, { is_important: !isImportant });
    let message;
    if (isError) {
      message = !isImportant ? SNACKBAR_MSG.ERROR.UNSTAR : SNACKBAR_MSG.ERROR.STAR;
      openSnackbar(SNACKBAR_VARIANT.ERROR, message);
    }
    message = !isImportant ? SNACKBAR_MSG.SUCCESS.STAR : SNACKBAR_MSG.SUCCESS.UNSTAR;
    openSnackbar(SNACKBAR_VARIANT.SUCCESS, message);
  };

  return (
    <S.Container>
      <ToolGroup />
      <S.ReadArea>
        <S.TitleView>
          <S.Subject>
            {isImportant ? (
              <Star className={classes.star} onClick={handleStarClick} />
            ) : (
              <StarBorder className={classes.unstar} onClick={handleStarClick} />
            )}
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
        <S.ReadFrame>
          <Viewer html={html} text={text} />
        </S.ReadFrame>
        {attachments && <FileList files={attachments} />}
      </S.ReadArea>
      <PageMoveButtonArea no={no} />
    </S.Container>
  );
};

export default ReadMail;
