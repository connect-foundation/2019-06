/* eslint-disable camelcase */
import React, { useContext } from 'react';
import moment from 'moment';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { red, yellow } from '@material-ui/core/colors';
import { handleMailChecked } from '../../../contexts/reducer';
import { AppDisapthContext, AppStateContext } from '../../../contexts';
import * as S from './styled';

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

const MailTemplate = ({ mail, selected, index, categories }) => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDisapthContext);
  const { is_important, is_read, MailTemplate, reservation_time, category_no } = mail;
  const { from, subject, createdAt } = MailTemplate;
  const handleCheckedChange = () => dispatch(handleMailChecked({ mails: state.mails, index }));
  const classes = useStyles();

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
      <S.ImportantButton id={`mark-${index}`}>
        {is_important ? (
          <StarIcon className={classes.star} id={`mark-${index}`} />
        ) : (
          <StarBorderIcon className={classes.unstar} id={`mark-${index}`} />
        )}
      </S.ImportantButton>
      <S.ReadSign>{is_read ? <DraftsIcon /> : <MailIcon />}</S.ReadSign>
      <S.DeleteButton id={`delete-${index}`}>
        <DeleteIcon className={classes.delete} id={`delete-${index}`} />
      </S.DeleteButton>
      <S.From isRead={is_read}>{from}</S.From>
      {category}
      <S.Selectable id={`read-${index}`}>
        <S.Title isRead={is_read} id={`read-${index}`}>
          {subject}
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
