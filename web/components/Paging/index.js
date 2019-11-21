import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import * as GS from '../GlobalStyle';
import { PageNumber } from './PageNumber';

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
  const { endPage, page, perPageNum, startPage, totalPage } = paging;
  const firstIndex = Math.floor(startPage / 10);
  const lastIndex = Math.floor(totalPage / 10);
  const [index, setIndex] = useState(firstIndex);
  const [curPage, setCurPage] = useState(page);

  const classes = useStyles();

  const pagingNumber = [];
  for (let i = index * 10 + 1; i < index * 10 + 1 + 10; i += 1) {
    const number = <PageNumber key={i} id={i} color="secondary" onActive={curPage === i} />;
    pagingNumber.push(number);
  }

  const handleMoveBtnClick = value => {
    setIndex(index + value);
  };

  const handleNumberClick = ({ target }) => {
    const { id, innerText } = target;
    if (!innerText || innerText === '') {
      return;
    }
    setCurPage(innerText);
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
