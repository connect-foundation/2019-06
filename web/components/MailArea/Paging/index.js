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
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const PAGE_LIST_NUM = 10;

const getPageStartNumber = index => index * PAGE_LIST_NUM + 1;

const getPagingNumbers = (start, end, page) => {
  const array = [];

  for (let i = start; i <= end; i += 1) {
    array.push(<PageNumber key={i} value={i} onActive={page === i} />);
  }
  return array;
};

const Paging = ({ paging }) => {
  const { page, startPage, totalPage, endPage } = paging;
  const currentIndex = Math.floor(startPage / PAGE_LIST_NUM);
  const lastIndex = Math.floor(totalPage / PAGE_LIST_NUM);
  const { dispatch } = useContext(AppContext);

  const classes = useStyles();

  const pagingNumber = getPagingNumbers(startPage, endPage, page);

  const handleMoveBtnClick = value => {
    const newIndex = currentIndex + value;
    const newPageNumber = getPageStartNumber(newIndex);
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
        style={{
          width: '35px',
          height: '10px ',
          display: currentIndex === 0 ? 'none' : '',
        }}>
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
