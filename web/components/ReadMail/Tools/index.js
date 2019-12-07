import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Email, Send, Delete } from '@material-ui/icons';
import S from './styled';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    color: 'white',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const buttons = [
  {
    name: '답장',
    icon: <Email />,
  },
  {
    name: '전달',
    icon: <Send />,
  },
  {
    name: '삭제',
    icon: <Delete />,
  },
];

const Tools = () => {
  const classes = useStyles();
  const buttonSet = buttons.map((btn, i) => (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      startIcon={btn.icon}
      key={i}>
      {btn.name}
    </Button>
  ));

  return <S.Container>{buttonSet}</S.Container>;
};

export default Tools;
