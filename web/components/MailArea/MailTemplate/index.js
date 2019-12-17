/* eslint-disable camelcase */
import React, { useContext } from 'react';
import moment from 'moment';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import {
  StarBorder as StarBorderIcon,
  Star as StarIcon,
  Mail as MailIcon,
  Drafts as DraftsIcon,
  Delete as DeleteIcon,
  DeleteForever as DeleteForeverIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red, yellow } from '@material-ui/core/colors';
import { handleMailChecked } from '../../../contexts/reducer';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import * as S from './styled';

const WASTEBASKET_MAILBOX = '휴지통';
const SEND_MAILBOX = '보낸메일함';

const useStyles = makeStyles(() => ({
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
  const [nowYear, nowDay] = splitMoment();
  const time = moment(createdAt).format('HH:mm');
  let date;
  if (day !== nowDay) date = `${month}-${day}`;
  if (year !== nowYear) date = `${year}-${month}-${day}`;
  return date ? `${date} ${time}` : time;
};

const MailTemplate = ({ mail, selected, index }) => {
  const { state } = useContext(AppStateContext);
  const { categoryNameByNo } = state;
  const { dispatch } = useContext(AppDispatchContext);
  const { is_important, is_read, reservation_time, category_no, MailTemplate: mailTemplate } = mail;
  const { from, to, subject, createdAt } = mailTemplate;
  const handleCheckedChange = () => dispatch(handleMailChecked({ mails: state.mails, index }));
  const classes = useStyles();
  const wastebasketNo = state.categoryNoByName[WASTEBASKET_MAILBOX];
  const sendMailboxNo = state.categoryNoByName[SEND_MAILBOX];

  let category = '';
  if (state.category === 0) {
    category = <S.CategoryName>{`[${categoryNameByNo[category_no]}]`}</S.CategoryName>;
  }

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
      <S.ImportantButton id={`star-${index}`}>
        {is_important ? (
          <StarIcon className={classes.star} id={`star-${index}`} />
        ) : (
          <StarBorderIcon className={classes.unstar} id={`star-${index}`} />
        )}
      </S.ImportantButton>
      <S.ReadSign>{is_read ? <DraftsIcon /> : <MailIcon />}</S.ReadSign>
      {state.category === wastebasketNo ? (
        <S.DeleteForeverButton id={`deleteForever-${index}`}>
          <DeleteForeverIcon className={classes.delete} id={`deleteForever-${index}`} />
        </S.DeleteForeverButton>
      ) : (
        <S.DeleteButton id={`delete-${index}`}>
          <DeleteIcon className={classes.delete} id={`delete-${index}`} />
        </S.DeleteButton>
      )}
      <S.AddressText isRead={is_read}>{state.category === sendMailboxNo ? to : from}</S.AddressText>
      {category}
      <S.Selectable id={`read-${index}`}>
        <S.SubjectText isRead={is_read} id={`read-${index}`}>
          {subject || '제목없음'}
        </S.SubjectText>
        <S.DateText>
          {getDateOrTime(createdAt)}
          <S.ReservationText>{reservation_time && '예약'}</S.ReservationText>
        </S.DateText>
      </S.Selectable>
    </S.Container>
  );
};

export default MailTemplate;
