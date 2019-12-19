/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useRouter } from 'next/router';

import * as GS from '../../GlobalStyle';
import { changeUrlWithoutRunning } from '../../../utils/url/change-query';
import S from './styled';

const useStyles = makeStyles(theme => ({
  moveButton: {
    margin: theme.spacing(1),
    width: 35,
    height: 10,
    boxShadow: 'none',
  },
}));

const getNumericRangeArray = (start, end) => {
  const numbers = [];
  for (let i = start; i <= end; i += 1) {
    numbers.push(i);
  }
  return numbers;
};

const Paging = ({ paging }) => {
  const router = useRouter();
  const { query } = router;
  const { page: queryPage = 1 } = query;
  const { startPage, totalPage, endPage } = paging;
  const classes = useStyles();
  const pageNumbers = getNumericRangeArray(startPage, endPage);

  const pageComponents = pageNumbers.map(number => (
    <S.NumberSpan
      key={`page-${number}`}
      value={number}
      active={+queryPage === number}
      onClick={() => changeUrlWithoutRunning({ ...query, page: number })}>
      {number}
    </S.NumberSpan>
  ));

  return (
    <GS.FlexRowWrap>
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        className={classes.moveButton}
        onClick={() => changeUrlWithoutRunning({ ...query, page: startPage - 1 })}
        style={{
          display: startPage === 1 ? 'none' : 'flex',
        }}>
        <ArrowBackIcon />
      </Fab>

      {pageComponents}

      <Fab
        size="small"
        color="primary"
        aria-label="add"
        className={classes.moveButton}
        onClick={() => changeUrlWithoutRunning({ ...query, page: endPage + 1 })}
        style={{
          display: totalPage === endPage ? 'none' : 'flex',
        }}>
        <ArrowForwardIcon />
      </Fab>
    </GS.FlexRowWrap>
  );
};

export default Paging;
