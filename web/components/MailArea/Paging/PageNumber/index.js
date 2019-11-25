import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const PageNumber = ({ value, onActive }) => {
  const classes = useStyles();
  const color = onActive ? 'secondary' : 'default';

  return (
    <IconButton aria-label="delete" className={classes.margin} color={color} id={value}>
      <span id={value}>{value}</span>
    </IconButton>
  );
};
