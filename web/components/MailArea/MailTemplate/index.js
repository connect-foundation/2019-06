/* eslint-disable camelcase */
import React, { useContext } from 'react';
import moment from 'moment';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { red, yellow } from '@material-ui/core/colors';
import ReadMail from '../../ReadMail';
import { handleMailClick, handleMailsChange } from '../../../contexts/reducer';
import { AppDisapthContext, AppStateContext } from '../../../contexts';
import * as S from './styled';
import request from '../../../utils/request';
import { errorParser } from '../../../utils/error-parser';

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

const moveMailToWastebasket = async (mailNo, state, dispatch) => {
  const { categories, mails, paging } = state;
  const category_no = categories.filter(({ name }) => name === WASTEBASKET_NAME)[0].no;
  const { isError, data } = await request.patch('/mail', {
    no: mailNo,
    props: { category_no },
  });
  if (isError) {
    const { message } = errorParser(data);
    console.log(message);
    // TODO: 휴지통 버리기 실패 메시지 출력
  }
  const updatedMails = mails.filter(({ no }) => no !== data.no);
  dispatch(handleMailsChange({ mails: updatedMails, paging }));
};

const MailTemplate = ({ mail }) => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDisapthContext);
  const { is_important, is_read, MailTemplate, no } = mail;
  const { from, to, subject, text, createdAt } = MailTemplate;
  const mailToRead = { from, to, subject, text, createdAt, is_important, no };
  const handleSubjectClick = () => dispatch(handleMailClick(mailToRead, <ReadMail />));
  const handleDeleteClick = () => moveMailToWastebasket(no, state, dispatch);
  const classes = useStyles();

  return (
    <S.Container>
      <div>
        <input type="checkbox" />
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
