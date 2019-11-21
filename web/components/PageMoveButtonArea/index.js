import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { AppContext } from '../../contexts';

// prev={selected.no > 0 ? mails[selected.no - 1] : false}
// next={selected.no < mails.length - 1 ? mails[selected.no + 1] : false}
// setSelected={setSelected}
// no={selected.no}

const PageMoveButtonArea = () => {
  const { state, dispatch } = useContext(AppContext);
  const handlePrevClick = e => setSelected({ mail: prev, no: no - 1 });
  const handleNextClick = e => setSelected({ mail: next, no: no + 1 });

  return (
    <div>
      <IconButton disabled={!prev} onClick={handlePrevClick}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton disabled={!next} onClick={handleNextClick}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};

export default PageMoveButtonArea;
