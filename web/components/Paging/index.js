import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import * as GS from '../GlobalStyle';
import { PageNumber } from './PageNumber';
import { AppContext } from '../../contexts';
import { handlePageNumberClick } from '../../contexts/reducer';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const Paging = ({ paging }) => {
  const { page, startPage, totalPage } = paging;
  const firstIndex = Math.floor(startPage / 10);
  const lastIndex = Math.floor(totalPage / 10);
  const [index, setIndex] = useState(firstIndex);
  const { dispatch } = useContext(AppContext);

  const classes = useStyles();

  const pagingNumber = [];
  for (let i = index * 10 + 1; i <= index * 10 + 10; i += 1) {
    const number = <PageNumber key={i} id={i} color="secondary" onActive={page === i} />;
    pagingNumber.push(number);
  }

  const handleMoveBtnClick = value => {
    const newIndex = index + value;
    const newPage = newIndex * 10 + 1;
    setIndex(newIndex);
    dispatch(handlePageNumberClick(newPage));
  };

  const handleNumberClick = ({ target }) => {
    const { innerText } = target;
    if (!innerText || innerText === '') {
      return;
    }
    dispatch(handlePageNumberClick(Number(innerText)));
  };

  return (
    <GS.FlexRowWrap onClick={handleNumberClick}>
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        className={classes.margin}
        onClick={() => handleMoveBtnClick(-1)}
        style={{ width: '35px', height: '10px ', display: index === 0 ? 'none' : '' }}>
        <ArrowBackIcon />
      </Fab>

      {[...pagingNumber]}

      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        className={classes.margin}
        onClick={() => handleMoveBtnClick(1)}
        style={{ width: '35px', height: '10px ', display: index === lastIndex ? 'none' : '' }}>
        <ArrowForwardIcon />
      </Fab>
    </GS.FlexRowWrap>
  );
};

export default Paging;
