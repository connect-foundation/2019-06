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
  whiteIcon: {
    color: 'white',
  },
}));

const [ADD, MODIFY, DELETE] = [0, 1, 2];

const Aside = () => {
  const classes = useStyles();
  const iconOfDefaultCategories = [
    selected => <AllInboxIcon className={selected ? classes.whiteIcon : null} />,
    selected => <StarBorder className={selected ? classes.whiteIcon : null} />,
    selected => <SendIcon className={selected ? classes.whiteIcon : null} />,
    selected => <DraftsIcon className={selected ? classes.whiteIcon : null} />,
    selected => <DeleteIcon className={selected ? classes.whiteIcon : null} />,
  ];
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
      idx + 4,
      setDialogOpen,
      handleCategoriesChange,
      dispatch,
    );
    if (!dialogData) return;
    setDialogState(dialogData);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClick = () => {
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
  const customCategories = categories.filter(category => !category.is_default);

  const defaultCards = defaultCategories.map((category, idx) => {
    return (
      <ListItem
        style={state.category === category.no ? { backgroundColor: '#0066FF' } : {}}
        button={state.category === category.no ? false : true}
        key={idx}
        onClick={() => dispatch(handleCategoryClick(category.no, <MailArea />))}>
        <ListItemIcon>{iconOfDefaultCategories[idx](state.category === category.no)}</ListItemIcon>
        <ListItemText
          primary={category.name}
          style={state.category === category.no ? { color: 'white' } : {}}
        />
      </ListItem>
    );
  });

  const customCategoryCards = customCategories.map((category, idx) => (
    <ListItem
      key={idx}
      className={classes.nested}
      style={state.category === category.no ? { backgroundColor: '#0066FF' } : {}}
      button={state.category === category.no ? false : true}
      onClick={() => dispatch(handleCategoryClick(category.no, <MailArea />))}>
      <ListItemIcon>
        <StarBorder className={state.category === category.no ? classes.whiteIcon : null} />
      </ListItemIcon>
      <ListItemText>
        <S.EllipsisList style={state.category === category.no ? { color: 'white' } : {}}>
          {category.name}
        </S.EllipsisList>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="modify" onClick={e => handleDialogOpen(e, MODIFY, idx)}>
          <ModifyIcon
            className={state.category === category.no ? classes.whiteIcon : null}
            fontSize={'small'}
          />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={e => handleDialogOpen(e, DELETE, idx)}>
          <DeleteIcon
            className={state.category === category.no ? classes.whiteIcon : null}
            fontSize={'small'}
          />
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
            {customCategoryCards}
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
