import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const PrevNextMail = ({ prev, next, setSelected, no }) => {
  const handleClickPrev = e => setSelected({ mail: prev, no: no - 1 });
  const handleClickNext = e => setSelected({ mail: next, no: no + 1 });

  return (
    <div>
      <IconButton disabled={!prev} onClick={handleClickPrev}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton disabled={!next} onClick={handleClickNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default PrevNextMail;
