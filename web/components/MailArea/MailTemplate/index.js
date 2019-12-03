/* eslint-disable camelcase */
import React, { useContext, useCallback } from 'react';
import moment from 'moment';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { red, yellow } from '@material-ui/core/colors';
import ReadMail from '../../ReadMail';
import { handleMailClick, handleMailChecked, handleMailsChange } from '../../../contexts/reducer';
import { AppDisapthContext, AppStateContext } from '../../../contexts';
import * as S from './styled';
import request from '../../../utils/request';
import { errorParser } from '../../../utils/error-parser';
import getQueryByOptions from '../../../utils/query';

const WASTEBASKET_NAME = '휴지통';

const useStyles = makeStyles(theme => ({
  delete: {
    '&:hover': {
      color: red[800],
    },
  },
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

const splitMoment = value =>
  moment(value)
    .format('YYYY-MM-DD')
    .split('-');

const getDateOrTime = createdAt => {
  const [year, month, day] = splitMoment(createdAt);
  const [nowYear, nowMonth, nowDay] = splitMoment();
  const time = moment(createdAt).format('HH:mm');
  let date;
  if (day !== nowDay) date = `${month}-${day}`;
  if (year !== nowYear) date = `${year}-${month}-${day}`;
  return date ? `${date} ${time}` : time;
};

const loadNewMails = async (state, dispatch) => {
  const query = getQueryByOptions(state);
  const { isError, data } = await request.get(`/mail/?${query}`);
  if (isError) {
    const { message } = errorParser(data);
    console.log(message);
    // TODO: 메일 리스트 로드 실패 메시지 출력
  }
  dispatch(handleMailsChange({ ...data }));
};

const moveMailToWastebasket = async (mailNo, state, dispatch) => {
  const { categoryNoByName } = state;
  const { isError, data } = await request.patch(`/mail/${mailNo}`, {
    props: { category_no: categoryNoByName[WASTEBASKET_NAME] },
  });
  if (isError) {
    const { message } = errorParser(data);
    console.log(message);
    // TODO: 휴지통 이동 실패 메시지 출력
  }
  loadNewMails(state, dispatch);
};

const MailTemplate = ({ mail, selected, index }) => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDisapthContext);

  const { is_important, is_read, MailTemplate, no, reservation_time } = mail;
  const { from, to, subject, text, createdAt, no: mailTemplateNo } = MailTemplate;
  const mailToRead = {
    from,
    to,
    subject,
    text,
    createdAt,
    is_important,
    no,
    mailTemplateNo,
    reservation_time,
  };
  const handleSubjectClick = () => dispatch(handleMailClick(mailToRead, <ReadMail />));
  const handleDeleteClick = () => moveMailToWastebasket(no, state, dispatch);
  const handleCheckedChange = () => dispatch(handleMailChecked({ mails: state.mails, index }));
  const classes = useStyles();

  return (
    <S.Container>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={selected}
              onChange={handleCheckedChange}
              color="primary"
              size="small"
            />
          }
        />
      </div>
      <S.ImportantButton>
        {is_important ? (
          <StarIcon className={classes.star} />
        ) : (
          <StarBorderIcon className={classes.unstar} />
        )}
      </S.ImportantButton>
      <S.ReadSign>{is_read ? <DraftsIcon /> : <MailIcon />}</S.ReadSign>
      <S.DeleteButton onClick={handleDeleteClick}>
        <DeleteIcon className={classes.delete} />
      </S.DeleteButton>
      <S.From isRead={is_read}>{from}</S.From>
      <S.Selectable onClick={handleSubjectClick}>
        <S.Title isRead={is_read}>{subject}</S.Title>
        <S.Date>{getDateOrTime(createdAt)}</S.Date>
      </S.Selectable>
    </S.Container>
  );
};

export default MailTemplate;
