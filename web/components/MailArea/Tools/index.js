import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import S from './styled';
import { AppDisapthContext, AppStateContext } from '../../../contexts';
import { handleSortSelect, handleCheckAllMails } from '../../../contexts/reducer';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    color: 'white',
  },
}));

const SORT_TYPES = [
  { value: 'datedesc', name: '시간 역순정렬' },
  { value: 'dateasc', name: '시간 순정렬' },
  { value: 'subjectdesc', name: '제목 역순정렬' },
  { value: 'subjectasc', name: '제목 순정렬' },
  { value: 'fromdesc', name: '보낸 이 역순정렬' },
  { value: 'fromasc', name: '보낸 이 순정렬' },
];

const sortItems = SORT_TYPES.map(type => (
  <MenuItem key={type.value} value={type.value}>
    {type.name}
  </MenuItem>
));

const Tools = () => {
  const classes = useStyles();
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDisapthContext);
  const { allMailCheckInTools, mails } = state;

  const handleChange = ({ target: { value } }) => dispatch(handleSortSelect(value));
  const handleCheckAllChange = () => dispatch(handleCheckAllMails(allMailCheckInTools, mails));
  return (
    <>
      <S.CheckBox>
        <input type="checkbox" checked={allMailCheckInTools} onChange={handleCheckAllChange} />
      </S.CheckBox>
      <S.Filter>
        <FormControl className={classes.formControl}>
          <Select
            value={state.sort}
            onChange={handleChange}
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
