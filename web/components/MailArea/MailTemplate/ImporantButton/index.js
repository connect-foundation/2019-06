import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import * as S from './styled';
import mailRequest from '../../../../utils/mail-request';
import { SNACKBAR_VARIANT } from '../../../Snackbar';

const SNACKBAR_MSG = {
  STAR: {
    SUCCESS: '메일 중요표시를 하였습니다.',
    ERROR: '메일 중요표시에 실패하였습니다.',
  },
  UNSTAR: {
    SUCCESS: '메일 중요표시를 해제하였습니다.',
    ERROR: '메일 중요표시 해제에 실패하였습니다.',
  },
};

const useStyles = makeStyles(() => ({
  unstar: {
    color: '#808080',
    '&:hover': {
      color: yellow[800],
    },
  },
  star: {
    color: yellow[800],
    '&:hover': {
      color: '#1976d2',
    },
  },
}));

const ImportantButton = ({ mail, openSnackbar }) => {
  const classes = useStyles();
  const handleContainerClick = async () => {
    mail.is_important = !mail.is_important;
    const { isError } = await mailRequest.update(mail.no, { is_important: mail.is_important });
    const snackbar = {};
    if (isError) {
      snackbar.variant = SNACKBAR_VARIANT.ERROR;
      snackbar.message = mail.is_important ? SNACKBAR_MSG.STAR.ERROR : SNACKBAR_MSG.UNSTAR.ERROR;
    } else {
      snackbar.variant = SNACKBAR_VARIANT.SUCCESS;
      snackbar.message = mail.is_important
        ? SNACKBAR_MSG.STAR.SUCCESS
        : SNACKBAR_MSG.UNSTAR.SUCCESS;
    }
    openSnackbar(snackbar.variant, snackbar.message);
  };

  return (
    <S.Container onClick={handleContainerClick}>
      {mail.is_important ? (
        <StarIcon className={classes.star} />
      ) : (
        <StarBorderIcon className={classes.unstar} />
      )}
    </S.Container>
  );
};

export default ImportantButton;
