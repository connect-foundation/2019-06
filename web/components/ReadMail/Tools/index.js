import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, Menu } from '@material-ui/core';
import {
  Email as EmailIcon,
  Delete as DeleteIcon,
  Loop as LoopIcon,
  DeleteForever as DeleteForeverIcon,
  Archive as ArchiveIcon,
} from '@material-ui/icons';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import { handleSnackbarState, setMailToReply } from '../../../contexts/reducer';
import { getSnackbarState, SNACKBAR_VARIANT } from '../../Snackbar';
import S from './styled';
import mailRequest from '../../../utils/mail-request';
import sessionStorage from '../../../utils/storage';
import { changeView, VIEW, changeUrlWithoutRunning } from '../../../utils/url/change-query';

const WASTEBASKET_MAILBOX = '휴지통';

const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제에 실패하였습니다.',
    RECYLCE: '메일 복구에 실패하였습니다.',
    DELETE_FOREVER: '메일 영구 삭제에 실패하였습니다.',
    REPLY_SELF: '자신의 메일에는 답장할 수 없습니다.',
    MOVE: '메일 이동에 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: '메일을 삭제하였습니다.',
    RECYLCE: '메일을 복구하였습니다.',
    DELETE_FOREVER: '메일을 영구 삭제하였습니다.',
    MOVE: name => `메일을 [${name}]으로 이동하였습니다.`,
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
    handleClick: async ({ mail, openSnackbar, dispatch }) => {
      if (mail.MailTemplate.from === sessionStorage.getUser().email) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.REPLY_SELF);
        return;
      }
      changeView(VIEW.WRITE);
      dispatch(setMailToReply(mail));
    },
  },
  {
    key: 'delete',
    name: '삭제',
    visible: true,
    icon: <DeleteIcon />,
    handleClick: async ({ mail, openSnackbar, wastebasketNo, query }) => {
      const { isError } = await mailRequest.update(mail.no, { category_no: wastebasketNo });
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.DELETE);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE);
      changeUrlWithoutRunning({ ...query, view: VIEW.LIST });
    },
  },
  {
    key: 'recycle',
    name: '복구',
    visible: true,
    icon: <LoopIcon />,
    handleClick: async ({ mail, openSnackbar, query }) => {
      const { isError } = await mailRequest.update(mail.no, { category_no: mail.prev_category_no });
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.RECYLCE);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.RECYLCE);
      changeUrlWithoutRunning({ ...query, view: VIEW.LIST });
    },
  },
  {
    key: 'delete_forever',
    name: '영구삭제',
    icon: <DeleteForeverIcon />,
    visible: true,
    handleClick: async ({ mail, openSnackbar, query }) => {
      const { isError } = await mailRequest.remove(mail.no);
      if (isError) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.DELETE_FOREVER);
        return;
      }
      openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE_FOREVER);
      changeUrlWithoutRunning({ ...query, view: VIEW.LIST });
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

const Tools = ({ mail }) => {
  const classes = useStyles();
  const { query } = useRouter();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const [categoryMenu, setCategoryMenu] = useState(null);
  const { categoryNoByName, categoryNameByNo, categories } = state;
  const wastebasketNo = categoryNoByName[WASTEBASKET_MAILBOX];
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));
  const paramsToClick = { mail, openSnackbar, wastebasketNo, dispatch, query };

  const handleCategoryMenuItemClick = async e => {
    const categoryNoToMove = e.currentTarget.value;
    const { isError } = await mailRequest.update(mail.no, { category_no: categoryNoToMove });
    if (isError) {
      openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.MOVE);
      return;
    }
    openSnackbar(
      SNACKBAR_VARIANT.SUCCESS,
      SNACKBAR_MSG.SUCCESS.MOVE(categoryNameByNo[categoryNoToMove]),
    );
    changeUrlWithoutRunning({ ...query, view: VIEW.LIST });
  };

  swapButtonSetView(mail.category_no, wastebasketNo);

  const buttonSet = buttons.map(btn => {
    return (
      btn.visible && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={btn.icon}
          onClick={() => btn.handleClick(paramsToClick)}
          key={btn.key}>
          {btn.name}
        </Button>
      )
    );
  });

  const categoryItems = categories.map(ctgr => (
    <MenuItem key={ctgr.no} value={ctgr.no} onClick={handleCategoryMenuItemClick}>
      {ctgr.name}
    </MenuItem>
  ));

  return (
    <S.Container>
      {buttonSet}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<ArchiveIcon />}
        onClick={e => setCategoryMenu(e.currentTarget)}>
        이동
      </Button>
      <Menu
        anchorEl={categoryMenu}
        keepMounted
        open={Boolean(categoryMenu)}
        onClose={() => setCategoryMenu(null)}>
        {categoryItems}
      </Menu>
    </S.Container>
  );
};

export default Tools;
