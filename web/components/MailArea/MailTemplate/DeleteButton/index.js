import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as S from './styled';
import mailRequest from '../../../../utils/mail-request';
import { SNACKBAR_VARIANT } from '../../../Snackbar';

const SNACKBAR_MSG = {
  DELETE: {
    SUCCESS: '메일을 삭제하였습니다.',
    ERROR: '메일 삭제를 실패하였습니다.',
  },
  DELETE_FOREVER: {
    SUCCESS: '메일을 영구 삭제하였습니다.',
    ERROR: '메일 영구 삭제에 실패하였습니다.',
  },
  LOAD: {
    ERROR: '메일 불러오기에 실패하였습니다.',
  },
};

const useStyles = makeStyles(() => ({
  delete: {
    '&:hover': {
      color: red[800],
    },
  },
}));

const DeleteButton = ({ mail, wastebasketNo, openSnackbar, setMailsOfContext, url }) => {
  const classes = useStyles();
  const updateMail = mailRequest.update.bind(null, mail.no, { category_no: wastebasketNo });
  const removeMail = mailRequest.remove.bind(null, mail.no);
  const handleDeleteIconClick = (request, message) => async () => {
    const response = await request();
    if (response.isError) {
      openSnackbar(SNACKBAR_VARIANT.ERROR, message.ERROR);
      return;
    }
    const loaded = await mailRequest.get(url);
    if (loaded.isError) {
      openSnackbar(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.LOAD.ERROR);
      return;
    }
    setMailsOfContext(loaded.data);
    openSnackbar(SNACKBAR_VARIANT.SUCCESS, message.SUCCESS);
  };

  return (
    <S.Container>
      {mail.category_no !== wastebasketNo ? (
        <DeleteIcon
          onClick={handleDeleteIconClick(updateMail, SNACKBAR_MSG.DELETE)}
          className={classes.delete}
        />
      ) : (
        <DeleteForeverIcon
          onClick={handleDeleteIconClick(removeMail, SNACKBAR_MSG.DELETE_FOREVER)}
          className={classes.delete}
        />
      )}
    </S.Container>
  );
};

export default DeleteButton;
