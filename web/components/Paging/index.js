/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';

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

const getPageNumberRange = index => {
  const start = index * 10;
  return [start + 1, start + 10];
};

const Paging = ({ paging }) => {
  const { page, startPage, totalPage } = paging;
  const firstIndex = Math.floor(startPage / 10);
  const lastIndex = Math.floor(totalPage / 10);
  const [index, setIndex] = useState(firstIndex);
  const { dispatch } = useContext(AppContext);

  const classes = useStyles();

  const pagingNumber = [];
  const [startNumber, endNumber] = getPageNumberRange(index);
  for (let i = startNumber; i <= endNumber && i <= totalPage; i += 1) {
    const number = <PageNumber key={i} id={i} color="secondary" onActive={page === i} />;
    pagingNumber.push(number);
  }

  const handleMoveBtnClick = value => {
    const newIndex = index + value;
    const [newPageNumber] = getPageNumberRange(newIndex);
    setIndex(newIndex);
    dispatch(handlePageNumberClick(newPageNumber));
  };

  const handleNumberClick = e => {
    e.preventDefault();

    const { id } = e.target;
    if (!id || id === '') {
      return;
    }

    if (Number.isInteger(id)) {
      return;
    }

    dispatch(handlePageNumberClick(Number(id)));
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

const pagingShape = {
  page: PropTypes.number,
  startPage: PropTypes.number,
  totalPage: PropTypes.number,
};

Paging.propTypes = {
  paging: PropTypes.shape(pagingShape),
};

export default Paging;
