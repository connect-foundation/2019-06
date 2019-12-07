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
} from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import S from './styled';
import { AppDispatchContext, AppStateContext } from '../../../contexts';
import { handleSortSelect, handleCheckAllMails } from '../../../contexts/reducer';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    color: 'white',
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

const getArrowDirection = sortValue =>
  sortValue.includes('asc') ? (
    <ArrowUpward fontSize={'small'} />
  ) : (
    <ArrowDownward fontSize={'small'} />
  );

const sortItems = SORT_TYPES.map(type => (
  <MenuItem key={type.value} value={type.value}>
    <S.SortItemView>
      <ListItemText>{type.name}</ListItemText>
      <ListItemIcon>{getArrowDirection(type.value)}</ListItemIcon>
    </S.SortItemView>
  </MenuItem>
));

const Tools = () => {
  const classes = useStyles();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const { allMailCheckInTools, mails } = state;
  const handleFilterChange = ({ target: { value } }) => dispatch(handleSortSelect(value));
  const handleCheckAllChange = () => dispatch(handleCheckAllMails(allMailCheckInTools, mails));

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
