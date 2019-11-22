import React from 'react';
import IconButton from '@material-ui/core/IconButton';

export const PageNumber = ({ id, onActive }) => {
  const classes = useStyles();
  const color = onActive ? 'secondary' : 'default';

  return (
    <IconButton aria-label="delete" className={classes.margin} color={color}>
      <span id={id}>{id}</span>
    </IconButton>
  );
};
