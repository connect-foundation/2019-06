/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';

import * as GS from '../../GlobalStyle';
import { PageNumber } from './PageNumber';
import { AppContext } from '../../../contexts';
import { handlePageNumberClick } from '../../../contexts/reducer';

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

const PAGE_LIST_NUM = 10;

const getPageStartNumber = index => index * PAGE_LIST_NUM;

const getPagingNumbers = (start, page) => {
  const array = [];
  for (let i = 0; i < PAGE_LIST_NUM; i += 1) {
    const num = start + i;
    array.push(<PageNumber key={num} id={num} color="secondary" onActive={page === num} />);
  }
  return array;
};

const Paging = ({ paging }) => {
  const { page, startPage, totalPage } = paging;
  const currentIndex = Math.floor(startPage / PAGE_LIST_NUM);
  const lastIndex = Math.floor(totalPage / PAGE_LIST_NUM);
  const { dispatch } = useContext(AppContext);

  const classes = useStyles();

  const startNumber = getPageStartNumber(currentIndex);
  const pagingNumber = getPagingNumbers(startNumber, page);

  const handleMoveBtnClick = value => {
    const newIndex = currentIndex + value;
    const [newPageNumber] = getPageStartNumber(newIndex);
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
        style={{ width: '35px', height: '10px ', display: currentIndex === 0 ? 'none' : '' }}>
        <ArrowBackIcon />
      </Fab>

      {[...pagingNumber]}

      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        className={classes.margin}
        onClick={() => handleMoveBtnClick(1)}
        style={{
          width: '35px',
          height: '10px ',
          display: currentIndex === lastIndex ? 'none' : '',
        }}>
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
