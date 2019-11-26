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
import ReadMail from '../ReadMail';
import { handleMailClick } from '../../contexts/reducer';
import { AppDisapthContext } from '../../contexts';
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

const MailTemplate = ({ mail, no }) => {
  const { dispatch } = useContext(AppDisapthContext);
  const { from, subject, date, is_important, is_read } = mail;
  const startdate = moment(date).format('YYYY-MM-DD');
  const handleSubjectClick = () => dispatch(handleMailClick(mail, <ReadMail />));
  const classes = useStyles();

  return (
    <S.MailTemplateWrap isRead={is_read}>
      <div>
        <input type="checkbox" />
      </div>
      <div>
        {is_important ? (
          <StarIcon className={classes.star} />
        ) : (
          <StarBorderIcon className={classes.unstar} />
        )}
      </div>
      <div>{is_read ? <DraftsIcon /> : <MailIcon />}</div>
      <div>
        <DeleteIcon className={classes.delete} />
      </div>
      <div>{from}</div>
      <div onClick={handleSubjectClick}>{subject}</div>
      <div>{startdate}</div>
    </S.MailTemplateWrap>
  );
};

export default MailTemplate;
