import React, { useContext, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ModifyIcon from '@material-ui/icons/Create';
import MoveInboxIcon from '@material-ui/icons/MoveToInbox';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import S from './styled';
import MailArea from '../MailArea';
import WriteMail from '../WriteMail';
import useFetch from '../../utils/use-fetch';
import Loading from '../Loading';
import { handleCategoryClick, setView, handleCategoriesChange } from '../../contexts/reducer';
import { getDialogData } from './dialog-data';
import { handleErrorStatus } from '../../utils/error-handler';
import { AppDisapthContext, AppStateContext } from '../../contexts';

const URL = '/mail/categories';
const ENTIRE_MAILBOX = '전체메일함';

const iconOfDefaultCategories = [
  <AllInboxIcon />,
  <StarBorder />,
  <SendIcon />,
  <DraftsIcon />,
  <DeleteIcon />,
];

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  alignHorizontalCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  alignHorizonVerticalCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const [ADD, MODIFY, DELETE] = [0, 1, 2];

const Aside = () => {
  const classes = useStyles();
  const [mailboxFolderOpen, setMailboxFolderOpen] = useState(true);
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDisapthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState(getDialogData(0));
  const [dialogTextFieldState, setDialogTextFieldState] = useState('');

  const handleDialogOpen = (_, action, idx) => {
    const dialogData = getDialogData(
      action,
      state.categories,
      idx,
      setDialogOpen,
      handleCategoriesChange,
    );
    if (!dialogData) return;
    setDialogState(dialogData);
    setDialogOpen(true);
  };

  const handleDialogClose = _ => {
    setDialogOpen(false);
  };

  const handleClick = _ => {
    setMailboxFolderOpen(!mailboxFolderOpen);
  };
  const callback = useCallback(
    (err, data) => (err ? handleErrorStatus(err) : dispatch(handleCategoriesChange({ ...data }))),
    [dispatch],
  );

  const isLoading = useFetch(callback, URL);

  if (isLoading) {
    return <Loading />;
  }

  const { categories } = state;
  const filteredDefaultCategories = categories.filter(category => category.is_default);
  const defaultCategories = [{ name: ENTIRE_MAILBOX, no: 0 }, ...filteredDefaultCategories];
  const userDefinedCategories = categories.filter(category => !category.is_default);

  const defaultCards = defaultCategories.map((category, idx) => (
    <ListItem
      button
      key={idx}
      onClick={() => dispatch(handleCategoryClick(category.no, <MailArea />))}>
      <ListItemIcon>{iconOfDefaultCategories[idx]}</ListItemIcon>
      <ListItemText primary={category.name} />
    </ListItem>
  ));

  const userDefinedCategoryCards = userDefinedCategories.map((category, idx) => (
    <ListItem button key={idx} className={classes.nested}>
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
      <ListItemText primary={category.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="modify" onClick={e => handleDialogOpen(e, MODIFY, idx)}>
          <ModifyIcon fontSize={'small'} />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={e => handleDialogOpen(e, DELETE, idx)}>
          <DeleteIcon fontSize={'small'} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <S.Aside>
      <List component="nav">
        <ListItem className={classes.alignHorizontalCenter}>
          <S.WrtieButton onClick={() => dispatch(setView(<WriteMail />))}>편지쓰기</S.WrtieButton>
          <S.WrtieButton>내게쓰기</S.WrtieButton>
        </ListItem>
        {defaultCards}
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <MoveInboxIcon />
          </ListItemIcon>
          <ListItemText primary="개인메일함" />
          {mailboxFolderOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={mailboxFolderOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {userDefinedCategoryCards}
            <ListItem button onClick={e => handleDialogOpen(e, ADD)} className={classes.nested}>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText>메일함 추가하기</ListItemText>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">{dialogState.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogState.textContents}</DialogContentText>
          {dialogState.needTextField ? (
            <TextField
              onChange={({ target: { value } }) => setDialogTextFieldState(value)}
              autoFocus
              margin="dense"
              id="dialogTextField"
              type="text"
              fullWidth
            />
          ) : (
            ''
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={e => dialogState.okBtnHandler(e, dialogTextFieldState)} color="primary">
            확인
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </S.Aside>
  );
};

export default Aside;
