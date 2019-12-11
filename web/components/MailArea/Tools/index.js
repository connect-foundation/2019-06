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
import { ArrowDownward, ArrowUpward, Email, Send, Delete } from '@material-ui/icons';
import S from './styled';
import * as GS from '../../GlobalStyle';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import { handleSortSelect, handleCheckAllMails } from '../../../contexts/reducer';

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
    name: '답장',
    icon: <Email />,
  },
  {
    name: '전달',
    icon: <Send />,
  },
  {
    name: '삭제',
    icon: <Delete />,
  },
];

const Tools = () => {
  const classes = useStyles();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { allMailCheckInTools, mails } = state;
  const handleFilterChange = ({ target: { value } }) => dispatch(handleSortSelect(value));
  const handleCheckAllChange = () => dispatch(handleCheckAllMails(allMailCheckInTools, mails));

  const buttonSet = buttons.map((btn, i) => (
    <Button
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
      startIcon={btn.icon}
      key={i}>
      {btn.name}
    </Button>
  ));

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
