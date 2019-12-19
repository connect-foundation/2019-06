/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import {
  handleMailChecked,
  handleSnackbarState,
  handleMailsChange,
} from '../../../contexts/reducer';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import * as S from './styled';
import {
  changeUrlWithoutRunning,
  VIEW,
  getQueryByOptions,
  getRequestPathByQuery,
} from '../../../utils/url/change-query';
import { getSnackbarState } from '../../Snackbar';
import ImportantButton from './ImporantButton';
import DeleteButton from './DeleteButton';

const WASTEBASKET_MAILBOX = '휴지통';
const SEND_MAILBOX = '보낸메일함';

const splitMoment = value =>
  moment(value)
    .format('YYYY-MM-DD')
    .split('-');

const getDateOrTime = createdAt => {
  const [year, month, day] = splitMoment(createdAt);
  const [nowYear, _, nowDay] = splitMoment();
  const time = moment(createdAt).format('HH:mm');
  let date = day !== nowDay ? `${month}-${day}` : '';
  date = year !== nowYear ? `${year}-${month}-${day}` : date;
  return date.length > 0 ? `${date} ${time}` : time;
};

const MailTemplate = ({ mail }) => {
  const { query } = useRouter();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { categoryNoByName, categoryNameByNo, mails } = state;
  const {
    is_read,
    reservation_time,
    category_no,
    MailTemplate: mailTemplate,
    selected,
    index,
    no,
  } = mail;
  const { from, to, subject, createdAt } = mailTemplate;
  const wastebasketNo = categoryNoByName[WASTEBASKET_MAILBOX];
  const sendMailboxNo = categoryNoByName[SEND_MAILBOX];
  const queryString = getQueryByOptions(query);
  const requestPath = getRequestPathByQuery(query);
  const url = `${requestPath}?${queryString}`;

  const openSnackbar = (variant, message) => {
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));
  };

  const setMailsOfContext = data => {
    dispatch(handleMailsChange({ ...data }));
  };

  const handleCheckedChange = () => {
    dispatch(handleMailChecked({ mails, index }));
  };

  const handleSelectableClick = () => {
    changeUrlWithoutRunning({ ...query, view: VIEW.READ, mailNo: no, mailIndex: index });
  };

  return (
    <S.Container>
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
      <ImportantButton mail={mail} openSnackbar={openSnackbar} />
      <S.ReadSign>{is_read ? <DraftsIcon /> : <MailIcon />}</S.ReadSign>
      <DeleteButton
        mail={mail}
        wastebasketNo={wastebasketNo}
        openSnackbar={openSnackbar}
        setMailsOfContext={setMailsOfContext}
        url={url}
      />
      <S.AddressText isRead={is_read}>{category_no === sendMailboxNo ? to : from}</S.AddressText>
      {(+query.category === 0 || !query.category) && (
        <S.CategoryName>{`[${categoryNameByNo[category_no]}]`}</S.CategoryName>
      )}
      <S.Selectable onClick={handleSelectableClick}>
        <S.SubjectText isRead={is_read}>{subject || '제목없음'}</S.SubjectText>
        <S.DateText>
          {getDateOrTime(createdAt)}
          <S.ReservationText>{reservation_time && '예약'}</S.ReservationText>
        </S.DateText>
      </S.Selectable>
    </S.Container>
  );
};

export default MailTemplate;
