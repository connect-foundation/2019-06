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
} from '../../../contexts/reducer';
import getQueryByOptions from '../../../utils/query';
import request from '../../../utils/request';
import { getSnackbarState, SNACKBAR_VARIANT } from '../../Snackbar';

const WASTEBASKET_NAME = '휴지통';

const SNACKBAR_MSG = {
  ERROR: {
    DELETE: '메일 삭제를 실패하였습니다.',
  },
  SUCCESS: {
    DELETE: count => `${count}개의 메일을 삭제하였습니다.`,
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
  const { isError, data } = await request.get(`/mail/?${query}`);
  if (isError) {
    throw SNACKBAR_MSG.ERROR.LOAD;
  }
  dispatch(handleMailsChange({ ...data }));
};

const updateMails = async (nos, props) => {
  return request.patch(`/mail`, { nos, props });
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
    enable: true,
    icon: <Email />,
    onClick: () => {},
  },
  {
    key: 'send',
    name: '전달',
    enable: true,
    icon: <Send />,
    onClick: () => {},
  },
  {
    key: 'delete',
    name: '삭제',
    enable: true,
    icon: <Delete />,
    onClick: async ({ mails, dispatch, query, wastebasketNo, openSnackbar }) => {
      try {
        const nos = mails.filter(({ selected }) => selected).map(({ no }) => no);
        const deletedCount = nos.length;
        if (deletedCount === 0) {
          return;
        }
        const { isError } = await updateMails(nos, { category_no: wastebasketNo });
        if (isError) {
          throw SNACKBAR_MSG.ERROR.DELETE;
        }
        await loadNewMails(query, dispatch);
        openSnackbar(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE(deletedCount));
      } catch (errorMessage) {
        openSnackbar(SNACKBAR_VARIANT.ERROR, errorMessage);
      } finally {
        dispatch(initCheckerInTools());
      }
    },
  },
  {
    key: 'forever_delete',
    name: '영구삭제',
    enable: true,
    icon: <DeleteForever />,
    onClick: () => {},
  },
];

const deleteButton = buttons.find(button => button.key === 'delete');
const foreverDeleteButton = buttons.find(button => button.key === 'forever_delete');

const Tools = () => {
  const classes = useStyles();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { allMailCheckInTools, mails, category, categoryNoByName } = state;
  const query = getQueryByOptions(state);
  const wastebasketNo = categoryNoByName[WASTEBASKET_NAME];
  const openSnackbar = (variant, message) =>
    dispatch(handleSnackbarState(getSnackbarState(variant, message)));
  const handleFilterChange = ({ target: { value } }) => dispatch(handleSortSelect(value));
  const handleCheckAllChange = () => dispatch(handleCheckAllMails(allMailCheckInTools, mails));

  if (category === wastebasketNo) {
    deleteButton.enable = false;
    foreverDeleteButton.enable = true;
  } else {
    deleteButton.enable = true;
    foreverDeleteButton.enable = false;
  }

  const buttonSet = buttons.map(btn => {
    if (btn.enable)
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={btn.icon}
          onClick={btn.onClick.bind(null, { mails, dispatch, query, openSnackbar, wastebasketNo })}
          key={btn.key}>
          {btn.name}
        </Button>
      );
  });

  return (
    <>
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
      <S.Filter>
        <FormControl className={classes.formControl}>
          <Select
            value={state.sort}
            onChange={handleFilterChange}
            displayEmpty
            className={classes.selectEmpty}>
            {sortItems}
          </Select>
        </FormControl>
      </S.Filter>
    </>
  );
};

export default Tools;
