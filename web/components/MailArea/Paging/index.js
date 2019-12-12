/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import * as GS from '../../GlobalStyle';
import { PageNumber } from './PageNumber';
import { AppDispatchContext } from '../../../contexts';
import { handlePageNumberClick } from '../../../contexts/reducer';
import { changeUrlWithoutRunning } from '../../../utils/url/change-query';

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
  const router = useRouter();
  const {
    query: { category },
  } = router;
  const { page, startPage, totalPage, endPage } = paging;
  const currentIndex = Math.floor(startPage / PAGE_LIST_NUM);
  const { dispatch } = useContext(AppDispatchContext);
  const classes = useStyles();

  const pagingNumber = getPagingNumbers(startPage, endPage, page);

  const handleMoveBtnClick = value => {
    const newIndex = currentIndex + value;
    const newPageNumber = getPageStartNumber(newIndex);
    dispatch(handlePageNumberClick(newPageNumber));

    changeUrlWithoutRunning({ category, page: newPageNumber });
  };

  const handleNumberClick = e => {
    e.preventDefault();

    let { id } = e.target;
    if (!id || id === '') {
      return;
    }

    id = Number(id);
    if (!Number.isInteger(id)) {
      return;
    }

    dispatch(handlePageNumberClick(id));
    changeUrlWithoutRunning({ category, page: id });
  };

  return (
    <GS.FlexRowWrap onClick={handleNumberClick}>
      <Fab
        size="small"
        color="primary"
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
        color="primary"
        aria-label="add"
        className={classes.margin}
        onClick={() => handleMoveBtnClick(1)}
        style={{
          width: '35px',
          height: '10px ',
          display: totalPage === endPage ? 'none' : '',
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
