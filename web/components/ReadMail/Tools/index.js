import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  Email as EmailIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  Loop as LoopIcon,
  DeleteForever as DeleteForeverIcon,
} from '@material-ui/icons';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import { handleSnackbarState, setView } from '../../../contexts/reducer';
import { getSnackbarState, SNACKBAR_VARIANT } from '../../Snackbar';
import S from './styled';
import MailArea from '../../MailArea';
import request from '../../../utils/request';

const WASTEBASKET_NAME = '휴지통';
const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제에 실패하였습니다.',
    RECYLCE: '메일 복구에 실패하였습니다.',
    DELETE_FOREVER: '메일 영구 삭제에 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: '메일을 삭제하였습니다.',
    RECYLCE: '메일을 복구하였습니다.',
    DELETE_FOREVER: '메일을 영구 삭제하였습니다.',
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

const updateMail = async (no, props) => {
  return request.patch(`/mail/${no}`, { props });
};

const removeMail = async no => {
  return request.delete(`/mail/${no}`);
};

const buttons = [
  {
    key: 'reply',
    name: '답장',
    icon: <EmailIcon />,
    enable: true,
    onClick: () => {},
  },
  {
    key: 'send',
    name: '전달',
    icon: <SendIcon />,
    enable: true,
    onClick: () => {},
  },
  {
    key: 'delete',
    name: '삭제',
    enable: true,
    icon: <DeleteIcon />,
    onClick: async ({ mail, openSnackbar, wastebasketNo, dispatch }) => {
      const { isError } = await updateMail(mail.no, { category_no: wastebasketNo });
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
    icon: <LoopIcon />,
    onClick: async ({ mail, openSnackbar, dispatch }) => {
      const { isError } = await updateMail(mail.no, { category_no: mail.prev_category_no });
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.RECYLCE);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.RECYLCE);
      dispatch(setView(<MailArea />));
    },
  },
  {
    key: 'DELETE_FOREVER',
    name: '영구삭제',
    icon: <DeleteForeverIcon />,
    enable: true,
    onClick: async ({ mail, openSnackbar, dispatch }) => {
      const { isError } = await removeMail(mail.no);
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.DELETE_FOREVER);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE_FOREVER);
      dispatch(setView(<MailArea />));
    },
  },
];

const deleteButton = buttons.find(button => button.key === 'delete');
const deleteForeverButton = buttons.find(button => button.key === 'DELETE_FOREVER');
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
    deleteForeverButton.enable = true;
    recylceButton.enable = true;
  } else {
    deleteButton.enable = true;
    deleteForeverButton.enable = false;
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
          onClick={() => {
            btn.onClick({ mail, openSnackbar, wastebasketNo, dispatch });
          }}
          key={btn.key}>
          {btn.name}
        </Button>
      );
  });

  return <S.Container>{buttonSet}</S.Container>;
};

export default Tools;
