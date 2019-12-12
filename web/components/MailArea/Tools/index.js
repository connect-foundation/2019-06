import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import { ArrowDownward, ArrowUpward, Email, Send, Delete, DeleteForever } from '@material-ui/icons';
import S from './styled';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import {
  handleSortSelect,
  handleCheckAllMails,
  handleSnackbarState,
  handleMailsChange,
  initCheckerInTools,
  handlePageNumberClick,
  setView,
} from '../../../contexts/reducer';
import getQueryByOptions from '../../../utils/query';
import mailRequest from '../../../utils/mail-request';
import { getSnackbarState, SNACKBAR_VARIANT } from '../../Snackbar';
import WriteMail from '../../WriteMail';
import sessionStorage from '../../../utils/storage';

const WASTEBASKET_MAILBOX = '휴지통';

const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제를 실패하였습니다.',
    DELETE_FOREVER: '메일 영구 삭제에 실패하였습니다.',
    ONLY_ONE: '1개의 메일을 선택해주세요.',
    REPLY_SELF: '자신의 메일에는 답장할 수 없습니다.',
  },
  SUCCESS: {
    DELETE: count => `${count}개의 메일을 삭제하였습니다.`,
    DELETE_FOREVER: count => `${count}개의 메일을 영구 삭제하였습니다.`,
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

const SORT_TYPES = [
  { value: 'datedesc', name: '시간' },
  { value: 'dateasc', name: '시간' },
  { value: 'subjectdesc', name: '제목' },
  { value: 'subjectasc', name: '제목' },
  { value: 'fromdesc', name: '보낸 이' },
  { value: 'fromasc', name: '보낸 이' },
];

const getArrowIcon = sortValue =>
  sortValue.includes('asc') ? (
    <ArrowUpward fontSize={'small'} />
  ) : (
    <ArrowDownward fontSize={'small'} />
  );

const loadNewMails = async (query, dispatch) => {
  const { isError, data } = await mailRequest.get(`/mail/?${query}`);
  if (isError) {
    throw SNACKBAR_MSG.ERROR.LOAD;
  }
  dispatch(handleMailsChange({ ...data }));
  const { mails, paging } = data;
  if (mails.length === 0) {
    dispatch(handlePageNumberClick(paging.page));
  }
};

const sortItems = SORT_TYPES.map(type => (
  <MenuItem key={type.value} value={type.value}>
    <S.SortItemView>
      <ListItemText>{type.name}</ListItemText>
      <ListItemIcon>{getArrowIcon(type.value)}</ListItemIcon>
    </S.SortItemView>
  </MenuItem>
));

const buttons = [
  {
    key: 'reply',
    name: '답장',
    visible: true,
    icon: <Email />,
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
      dispatch(setView(<WriteMail mailToReply={mail} />));
    },
  },
  {
    key: 'delete',
    name: '삭제',
    visible: true,
    icon: <Delete />,
    handleClick: async ({ selectedMails, dispatch, query, wastebasketNo, openSnackbar }) => {
      try {
        const nos = selectedMails.map(({ no }) => no);
        const { isError } = await mailRequest.update(nos, { category_no: wastebasketNo });
        if (isError) {
          throw SNACKBAR_MSG.ERROR.DELETE;
        }
        await loadNewMails(query, dispatch);
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
    icon: <DeleteForever />,
    handleClick: async ({ selectedMails, dispatch, query, openSnackbar }) => {
      try {
        const nos = selectedMails.map(({ no }) => no);
        const { isError } = await mailRequest.remove(nos);
        if (isError) {
          throw SNACKBAR_MSG.ERROR.DELETE_FOREVER;
        }
        await loadNewMails(query, dispatch);
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

const deleteButton = buttons.find(button => button.key === 'delete');
const deleteForeverButton = buttons.find(button => button.key === 'delete_forever');

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
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { allMailCheckInTools, mails, category, categoryNoByName } = state;
  const query = getQueryByOptions(state);
  const wastebasketNo = categoryNoByName[WASTEBASKET_MAILBOX];
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));
  const selectedMails = mails.filter(({ selected }) => selected);
  const paramsToClick = {
    selectedMails,
    dispatch,
    query,
    openSnackbar,
    wastebasketNo,
  };
  const handleFilterChange = ({ target: { value } }) => dispatch(handleSortSelect(value));
  const handleCheckAllChange = () => dispatch(handleCheckAllMails(allMailCheckInTools, mails));
  swapButtonSetView(category, wastebasketNo);

  const buttonSet = buttons.map(btn => {
    return btn.visible ? (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={btn.icon}
        disabled={!selectedMails.length}
        onClick={btn.handleClick.bind(null, paramsToClick)}
        key={btn.key}>
        {btn.name}
      </Button>
    ) : (
      ''
    );
  });

  return (
    <>
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
        <S.ButtonGroup>{buttonSet}</S.ButtonGroup>
      </S.FlexLeft>
      <S.Sort>
        <FormControl className={classes.formControl}>
          <Select
            value={state.sort}
            onChange={handleFilterChange}
            displayEmpty
            className={classes.selectEmpty}>
            {sortItems}
          </Select>
        </FormControl>
      </S.Sort>
    </>
  );
};

export default Tools;
