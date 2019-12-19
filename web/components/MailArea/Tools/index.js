import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Menu,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Email as EmailIcon,
  Delete as DeleteIcon,
  DeleteForever as DeleteForeverIcon,
  Archive as ArchiveIcon,
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import S from './styled';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import {
  handleCheckAllMails,
  handleSnackbarState,
  handleMailsChange,
  initCheckerInTools,
  setMailToReply,
} from '../../../contexts/reducer';
import {
  getQueryByOptions,
  changeUrlWithoutRunning,
  changeView,
  VIEW,
  getRequestPathByQuery,
} from '../../../utils/url/change-query';
import mailRequest from '../../../utils/mail-request';
import { getSnackbarState, SNACKBAR_VARIANT } from '../../Snackbar';
import sessionStorage from '../../../utils/storage';

const WASTEBASKET_MAILBOX = '휴지통';

const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제에 실패하였습니다.',
    DELETE_FOREVER: '메일 영구 삭제에 실패하였습니다.',
    ONLY_ONE: '1개의 메일을 선택해주세요.',
    REPLY_SELF: '자신의 메일에는 답장할 수 없습니다.',
    MOVE: '메일 이동에 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: count => `${count}개의 메일을 삭제하였습니다.`,
    DELETE_FOREVER: count => `${count}개의 메일을 영구 삭제하였습니다.`,
    MOVE: (count, name) => `${count}개 메일을 [${name}]으로 이동하였습니다.`,
  },
};

const useStyles = makeStyles(theme => ({
  sortType: {
    color: 'white',
    padding: 0,
    minWidth: 80,
  },
  perPageNum: {
    color: 'white',
    padding: 0,
    minWidth: 60,
    marginRight: 30,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const SORTING_CRITERIA = [
  { value: 'datedesc', name: '시간' },
  { value: 'dateasc', name: '시간' },
  { value: 'subjectdesc', name: '제목' },
  { value: 'subjectasc', name: '제목' },
  { value: 'fromdesc', name: '보낸 이' },
  { value: 'fromasc', name: '보낸 이' },
];

const getArrowIcon = sortValue =>
  sortValue.includes('asc') ? (
    <ArrowUpwardIcon fontSize={'small'} style={{ height: '19.2px' }} />
  ) : (
    <ArrowDownwardIcon fontSize={'small'} style={{ height: '19.2px' }} />
  );

const loadNewMails = async (query, dispatch, url) => {
  const { isError, data } = await mailRequest.get(url);
  if (isError) {
    throw SNACKBAR_MSG.ERROR.LOAD;
  }
  dispatch(handleMailsChange({ ...data }));
  const { mails, paging } = data;
  if (mails.length === 0 && paging.page !== 1) {
    changeUrlWithoutRunning({ ...query, page: paging.page });
  }
};

const sortItems = SORTING_CRITERIA.map(type => (
  <MenuItem key={type.value} value={type.value}>
    <S.SortItemView>
      <ListItemText style={{ padding: 0, margin: 0 }}>{type.name}</ListItemText>
      <ListItemIcon style={{ minWidth: 0 }}>{getArrowIcon(type.value)}</ListItemIcon>
    </S.SortItemView>
  </MenuItem>
));

const BUTTONS = [
  {
    key: 'reply',
    name: '답장',
    visible: true,
    icon: <EmailIcon />,
    handleClick: async ({ selectedMails, dispatch, openSnackbar }) => {
      if (selectedMails.length !== 1) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.ONLY_ONE);
        return;
      }
      const mail = selectedMails[0];
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
    handleClick: async ({ selectedMails, dispatch, wastebasketNo, openSnackbar, query, url }) => {
      try {
        const nos = selectedMails.map(({ no }) => no);
        const { isError } = await mailRequest.update(nos, { category_no: wastebasketNo });
        if (isError) {
          throw SNACKBAR_MSG.ERROR.DELETE;
        }
        await loadNewMails(query, dispatch, url);
        openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE(selectedMails.length));
      } catch (errorMessage) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, errorMessage);
        dispatch(handleCheckAllMails(true, selectedMails));
      } finally {
        dispatch(initCheckerInTools());
      }
    },
  },
  {
    key: 'delete_forever',
    name: '영구삭제',
    visible: true,
    icon: <DeleteForeverIcon />,
    handleClick: async ({ selectedMails, dispatch, openSnackbar, query, url }) => {
      try {
        const nos = selectedMails.map(({ no }) => no);
        const { isError } = await mailRequest.remove(nos);
        if (isError) {
          throw SNACKBAR_MSG.ERROR.DELETE_FOREVER;
        }
        await loadNewMails(query, dispatch, url);
        openSnackbar(
          SNACKBAR_VARIANT.SUCCESS,
          SNACKBAR_MSG.SUCCESS.DELETE_FOREVER(selectedMails.length),
        );
      } catch (errorMessage) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, errorMessage);
        dispatch(handleCheckAllMails(true, selectedMails));
      } finally {
        dispatch(initCheckerInTools());
      }
    },
  },
];

const getButton = key => BUTTONS.find(button => button.key === key);
const deleteButton = getButton('delete');
const deleteForeverButton = getButton('delete_forever');

const swapButtonSetView = (categoryNo, wastebasketNo) => {
  if (categoryNo === wastebasketNo) {
    deleteButton.visible = false;
    deleteForeverButton.visible = true;
  } else {
    deleteButton.visible = true;
    deleteForeverButton.visible = false;
  }
};

const Tools = () => {
  const classes = useStyles();
  const { query } = useRouter();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const queryString = getQueryByOptions(query);
  const requestPath = getRequestPathByQuery(query);
  const url = `${requestPath}?${queryString}`;
  const [categoryMenu, setCategoryMenu] = useState(null);
  const { allMailCheckInTools, mails, categoryNoByName, categories, categoryNameByNo } = state;
  const wastebasketNo = categoryNoByName[WASTEBASKET_MAILBOX];
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));
  const selectedMails = mails.filter(({ selected }) => selected);
  const paramsToClick = {
    selectedMails,
    dispatch,
    openSnackbar,
    wastebasketNo,
    query,
    url,
  };

  const handleSortChange = ({ target: { value } }) =>
    changeUrlWithoutRunning({ ...query, sort: value });
  const handlePerPageNumChange = ({ target: { value } }) => {
    if (!Number.isInteger(value)) {
      value = '';
    }
    changeUrlWithoutRunning({ ...query, perPageNum: value });
  };
  const handleCheckAllChange = () => dispatch(handleCheckAllMails(allMailCheckInTools, mails));
  const handleCategoryMenuItemClick = async e => {
    try {
      const categoryNoToMove = e.currentTarget.value;
      const nos = selectedMails.map(({ no }) => no);
      const { isError } = await mailRequest.update(nos, { category_no: categoryNoToMove });
      if (isError) {
        throw SNACKBAR_MSG.ERROR.MOVE;
      }
      await loadNewMails(query, dispatch, url);
      openSnackbar(
        SNACKBAR_VARIANT.SUCCESS,
        SNACKBAR_MSG.SUCCESS.MOVE(selectedMails.length, categoryNameByNo[categoryNoToMove]),
      );
    } catch (errorMessage) {
      openSnackbar(SNACKBAR_VARIANT.ERROR, errorMessage);
      dispatch(handleCheckAllMails(true, selectedMails));
    } finally {
      dispatch(initCheckerInTools());
      setCategoryMenu(null);
    }
  };

  swapButtonSetView(+query.category, wastebasketNo);

  const buttonSet = BUTTONS.map(btn => {
    return (
      btn.visible && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={btn.icon}
          disabled={!selectedMails.length}
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
    <S.FlexWrap>
      <S.FlexLeft>
        <S.CheckBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={allMailCheckInTools}
                onChange={handleCheckAllChange}
                color="primary"
                size="small"
              />
            }
          />
        </S.CheckBox>
        <S.ButtonGroup>
          {buttonSet}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ArchiveIcon />}
            disabled={!selectedMails.length}
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
        </S.ButtonGroup>
      </S.FlexLeft>
      <S.FlexRight>
        <FormControl className={classes.perPageNum}>
          <Select value={query.perPageNum || '메일수'} onChange={handlePerPageNumChange}>
            <MenuItem value={'메일수'}>
              <span>메일수</span>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={80}>80</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.sortType}>
          <Select value={query.sort || 'datedesc'} onChange={handleSortChange} displayEmpty>
            {sortItems}
          </Select>
        </FormControl>
      </S.FlexRight>
    </S.FlexWrap>
  );
};

export default Tools;
