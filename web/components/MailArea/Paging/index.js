/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useRouter } from 'next/router';

import * as GS from '../../GlobalStyle';
import { PageNumber } from './PageNumber';
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

const getPagingNumbers = (start, end, page) => {
  const array = [];

  for (let i = start; i <= end; i += 1) {
    array.push(<PageNumber key={i} value={i} onActive={page === i} />);
  }
  return array;
};

const Paging = ({ paging }) => {
  const router = useRouter();
  const { query } = router;
  const { page, startPage, totalPage, endPage } = paging;
  const currentIndex = Math.floor(startPage / PAGE_LIST_NUM);
  const classes = useStyles();

  const pagingNumber = getPagingNumbers(startPage, endPage, page);

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

    changeUrlWithoutRunning({ ...query, page: id });
  };

  return (
    <GS.FlexRowWrap onClick={handleNumberClick}>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        className={classes.margin}
        onClick={() => changeUrlWithoutRunning({ ...query, page: startPage - 1 })}
        style={{
          width: '35px',
          height: '10px ',
          display: currentIndex === 0 ? 'none' : 'block',
        }}>
        <ArrowBackIcon />
      </Fab>

      {[...pagingNumber]}

      <Fab
        size="small"
        color="primary"
        aria-label="add"
        className={classes.margin}
        onClick={() => changeUrlWithoutRunning({ ...query, page: endPage + 1 })}
        style={{
          width: '35px',
          height: '10px ',
          display: totalPage === endPage ? 'none' : 'block',
        }}>
        <ArrowForwardIcon />
      </Fab>
    </GS.FlexRowWrap>
  );
};

export default Paging;
