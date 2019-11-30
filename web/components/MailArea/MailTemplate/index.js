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
import { handleMailClick } from '../../../contexts/reducer';
import { AppDisapthContext } from '../../../contexts';
import * as S from './styled';

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

const MailTemplate = ({ mail }) => {
  const { dispatch } = useContext(AppDisapthContext);
  const { is_important, is_read, MailTemplate, no } = mail;
  const { from, to, subject, text, createdAt } = MailTemplate;
  const mailToRead = { from, to, subject, text, createdAt, is_important, no };
  const handleSubjectClick = () => dispatch(handleMailClick(mailToRead, <ReadMail />));
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
      <S.DeleteButton>
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
