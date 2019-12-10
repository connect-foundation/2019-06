/* eslint-disable camelcase */
import React, { useContext } from 'react';
import moment from 'moment';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { StarBorder, Star, Mail, Drafts, Delete, DeleteForever } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { red, yellow } from '@material-ui/core/colors';
import { handleMailChecked } from '../../../contexts/reducer';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import * as S from './styled';

const WASTEBASKET_NAME = '휴지통';

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
  const [nowYear, nowMonth, nowDay] = splitMoment();
  const time = moment(createdAt).format('HH:mm');
  let date;
  if (day !== nowDay) date = `${month}-${day}`;
  if (year !== nowYear) date = `${year}-${month}-${day}`;
  return date ? `${date} ${time}` : time;
};

const MailTemplate = ({ mail, selected, index, categories }) => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { is_important, is_read, MailTemplate, reservation_time, category_no } = mail;
  const { from, subject, createdAt } = MailTemplate;
  const handleCheckedChange = () => dispatch(handleMailChecked({ mails: state.mails, index }));
  const classes = useStyles();
  const wastebasketNo = state.categoryNoByName[WASTEBASKET_NAME];

  let category = '';
  if (state.category === 0) {
    category = <S.CategoryName>{`[${categories[category_no]}]`}</S.CategoryName>;
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
          <Star className={classes.star} id={`star-${index}`} />
        ) : (
          <StarBorder className={classes.unstar} id={`star-${index}`} />
        )}
      </S.ImportantButton>
      <S.ReadSign>{is_read ? <Drafts /> : <Mail />}</S.ReadSign>
      {state.category === wastebasketNo ? (
        <S.ForeverDeleteButton id={`foreverDelete-${index}`}>
          <DeleteForever className={classes.delete} id={`foreverDelete-${index}`} />
        </S.ForeverDeleteButton>
      ) : (
        <S.DeleteButton id={`delete-${index}`}>
          <Delete className={classes.delete} id={`delete-${index}`} />
        </S.DeleteButton>
      )}
      <S.From isRead={is_read}>{from}</S.From>
      {category}
      <S.Selectable id={`read-${index}`}>
        <S.Title isRead={is_read} id={`read-${index}`}>
          {subject || '제목없음'}
        </S.Title>
        <S.Date>
          {getDateOrTime(createdAt)}
          <S.Text>{reservation_time && '예약'}</S.Text>
        </S.Date>
      </S.Selectable>
    </S.Container>
  );
};

export default MailTemplate;
