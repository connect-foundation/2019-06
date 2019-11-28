import React, { useState, useContext } from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import { useStateForWM, useDispatchForWM } from '../ContextProvider';
import { RESERVATION_MODAL_OFF } from '../ContextProvider/reducer/action-type';

import S from './styled';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ReservationTimePicker = () => {
  const classes = useStyles();
  const rootRef = React.useRef(null);
  const [date, changeDate] = useState(new Date());
  const { reservationModalOn } = useStateForWM();
  const dispatch = useDispatchForWM();

  const handleSubmit = e => {
    e.preventDefault();

    // reserveMail();
  };

  const handleClose = e => {
    e.preventDefault();
    dispatch({ type: RESERVATION_MODAL_OFF });
  };

  return (
    <div className={classes.root} ref={rootRef}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={reservationModalOn}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={reservationModalOn}>
          <div className={classes.paper}>
            <S.InputForm autoComplete="off">
              <S.Title>날짜 및 시간 선택</S.Title>
              <S.InputContainer></S.InputContainer>
              <S.ButtonContainer>
                <S.WhiteButton className="submit-btn max-width" onClick={handleClose}>
                  취소
                </S.WhiteButton>
                <S.Button className="submit-btn max-width" onClick={handleSubmit}>
                  확인
                </S.Button>
              </S.ButtonContainer>
            </S.InputForm>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ReservationTimePicker;
