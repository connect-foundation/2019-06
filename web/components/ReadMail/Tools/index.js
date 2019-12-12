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
import mailRequest from '../../../utils/mail-request';

const TRASH_MAILBOX = '휴지통';
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

const buttons = [
  {
    key: 'reply',
    name: '답장',
    icon: <EmailIcon />,
    visible: true,
    handleClick: () => {},
  },
  {
    key: 'send',
    name: '전달',
    icon: <SendIcon />,
    visible: true,
    handleClick: () => {},
  },
  {
    key: 'delete',
    name: '삭제',
    visible: true,
    icon: <DeleteIcon />,
    handleClick: async ({ mail, openSnackbar, wastebasketNo, dispatch }) => {
      const { isError } = await mailRequest.update(mail.no, { category_no: wastebasketNo });
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
    visible: true,
    icon: <LoopIcon />,
    handleClick: async ({ mail, openSnackbar, dispatch }) => {
      const { isError } = await mailRequest.update(mail.no, { category_no: mail.prev_category_no });
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.RECYLCE);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.RECYLCE);
      dispatch(setView(<MailArea />));
    },
  },
  {
    key: 'delete_forever',
    name: '영구삭제',
    icon: <DeleteForeverIcon />,
    visible: true,
    handleClick: async ({ mail, openSnackbar, dispatch }) => {
      const { isError } = await mailRequest.remove(mail.no);
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
const deleteForeverButton = buttons.find(button => button.key === 'delete_forever');
const recylceButton = buttons.find(button => button.key === 'recycle');

const swapButtonSetView = (categoryNo, wastebasketNo) => {
  if (categoryNo === wastebasketNo) {
    deleteButton.visible = false;
    deleteForeverButton.visible = true;
    recylceButton.visible = true;
  } else {
    deleteButton.visible = true;
    deleteForeverButton.visible = false;
    recylceButton.visible = false;
  }
};

const Tools = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const classes = useStyles();
  const { mail, categoryNoByName } = state;
  const wastebasketNo = categoryNoByName[TRASH_MAILBOX];
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));
  const paramsToClick = { mail, openSnackbar, wastebasketNo, dispatch };
  swapButtonSetView(mail.category_no, wastebasketNo);

  const buttonSet = buttons.map(btn => {
    return btn.visible ? (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={btn.icon}
        onClick={btn.handleClick.bind(null, paramsToClick)}
        key={btn.key}>
        {btn.name}
      </Button>
    ) : (
      ''
    );
  });

  return <S.Container>{buttonSet}</S.Container>;
};

export default Tools;
