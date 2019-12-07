import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Email, Send, Delete } from '@material-ui/icons';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import { handleSnackbarState, setView } from '../../../contexts/reducer';
import { getSnackbarState, SNACKBAR_VARIANT } from '../../Snackbar';
import S from './styled';
import MailArea from '../../MailArea';
import request from '../../../utils/request';

const WASTEBASKET_NAME = '휴지통';
const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제를 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: '메일을 삭제하였습니다.',
  },
};

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    color: 'white',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const buttons = [
  {
    key: 'reply',
    name: '답장',
    icon: <Email />,
    onClick: () => {},
  },
  {
    key: 'send',
    name: '전달',
    icon: <Send />,
    onClick: () => {},
  },
  {
    key: 'delete',
    name: '삭제',
    icon: <Delete />,
    onClick: async ({ mail, openSnackbar, wastebasketNo, backToMailArea }) => {
      const props = { category_no: wastebasketNo };
      const { isError } = await request.patch(`/mail/${mail.no}`, { props });
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.DELETE);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE);
      backToMailArea();
    },
  },
];

const Tools = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const classes = useStyles();
  const { mail, categoryNoByName } = state;
  const wastebasketNo = categoryNoByName[WASTEBASKET_NAME];
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));
  const backToMailArea = () => dispatch(setView(<MailArea />));

  const buttonSet = buttons.map((btn, i) => (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={btn.icon}
      onClick={btn.onClick.bind(null, { mail, openSnackbar, wastebasketNo, backToMailArea })}
      key={btn.key}>
      {btn.name}
    </Button>
  ));

  return <S.Container>{buttonSet}</S.Container>;
};

export default Tools;
