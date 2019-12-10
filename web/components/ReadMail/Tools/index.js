import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Email, Send, Delete, DeleteForever } from '@material-ui/icons';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import { handleSnackbarState, setView, handleCategoryClick } from '../../../contexts/reducer';
import { getSnackbarState, SNACKBAR_VARIANT } from '../../Snackbar';
import S from './styled';
import MailArea from '../../MailArea';
import request from '../../../utils/request';

const WASTEBASKET_NAME = '휴지통';
const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제에 실패하였습니다.',
    RECYLCE: '메일 복구에 실패하였습니다.',
    FOREVER_DELETE: '메일 영구 삭제에 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: '메일을 삭제하였습니다.',
    RECYLCE: '메일을 복구하였습니다.',
    FOREVER_DELETE: '메일을 영구 삭제하였습니다.',
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
    enable: true,
    onClick: () => {},
  },
  {
    key: 'send',
    name: '전달',
    icon: <Send />,
    enable: true,
    onClick: () => {},
  },
  {
    key: 'delete',
    name: '삭제',
    enable: true,
    icon: <Delete />,
    onClick: async ({ mail, openSnackbar, wastebasketNo, dispatch }) => {
      const props = { category_no: wastebasketNo };
      const { isError } = await request.patch(`/mail/${mail.no}`, { props });
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.DELETE);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE);
      dispatch(setView(<MailArea />));
    },
  },
  {
    key: 'recycle',
    name: '복구',
    enable: true,
    icon: <Delete />,
    onClick: async ({ mail, openSnackbar, dispatch }) => {
      const props = { category_no: mail.prev_category_no };
      const { isError } = await request.patch(`/mail/${mail.no}`, { props });
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.RECYLCE);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.RECYLCE);
      dispatch(handleCategoryClick(mail.prev_category_no, <MailArea />));
    },
  },
  {
    key: 'forever_delete',
    name: '영구삭제',
    icon: <DeleteForever />,
    enable: true,
    onClick: async ({ mail, openSnackbar, dispatch }) => {
      const { isError } = await request.delete(`/mail/${mail.no}`);
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.FOREVER_DELETE);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.FOREVER_DELETE);
      dispatch(setView(<MailArea />));
    },
  },
];

const deleteButton = buttons.find(button => button.key === 'delete');
const foreverDeleteButton = buttons.find(button => button.key === 'forever_delete');
const recylceButton = buttons.find(button => button.key === 'recycle');

const Tools = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const classes = useStyles();
  const { mail, categoryNoByName } = state;
  const wastebasketNo = categoryNoByName[WASTEBASKET_NAME];
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));

  if (mail.category_no === wastebasketNo) {
    deleteButton.enable = false;
    foreverDeleteButton.enable = true;
    recylceButton.enable = true;
  } else {
    deleteButton.enable = true;
    foreverDeleteButton.enable = false;
    recylceButton.enable = false;
  }

  const buttonSet = buttons.map(btn => {
    if (btn.enable)
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={btn.icon}
          onClick={btn.onClick.bind(null, { mail, openSnackbar, wastebasketNo, dispatch })}
          key={btn.key}>
          {btn.name}
        </Button>
      );
  });

  return <S.Container>{buttonSet}</S.Container>;
};

export default Tools;