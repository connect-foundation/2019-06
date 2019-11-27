import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import S from './styled';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    color: 'white',
  },
}));

const Tools = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState('datedesc');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <>
      <S.CheckBox>체크박스</S.CheckBox>
      <S.Etc>잡다한 여러게</S.Etc>
      <S.Filter>
        <FormControl className={classes.formControl}>
          <Select value={age} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
            <MenuItem value={'datedesc'}>시간 역순정렬</MenuItem>
            <MenuItem value={'dateasc'}>시간 순정렬</MenuItem>
          </Select>
        </FormControl>
      </S.Filter>
    </>
  );
};

export default Tools;
