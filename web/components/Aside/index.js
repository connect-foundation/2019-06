import React, { useContext, useState, useEffect } from 'react';
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
import {
  ExpandLess,
  ExpandMore,
  StarBorder,
  AddBox as AddBoxIcon,
  Create as ModifyIcon,
  MoveToInbox as MoveInboxIcon,
  AllInbox as AllInboxIcon,
  Drafts as DraftsIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  ImportContacts,
} from '@material-ui/icons';
import { useRouter } from 'next/router';
import S from './styled';
import useFetch from '../../utils/use-fetch';
import Loading from '../Loading';
import { handleCategoriesChange, handleSnackbarState } from '../../contexts/reducer';
import { getDialogData } from './dialog-data';
import errorHandler from '../../utils/error-handler';
import { AppDispatchContext, AppStateContext } from '../../contexts';
import { changeView, VIEW, changeCategory } from '../../utils/url/change-query';
import HeadTitle from '../HeadTitle';

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
  const { query } = useRouter();
  const [mailboxFolderOpen, setMailboxFolderOpen] = useState(true);
  const [dialogOkButtonDisableState, setDialogOkButtonDisableState] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState(getDialogData({ type: 0 }));
  const [dialogTextFieldState, setDialogTextFieldState] = useState('');
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const queryCategory = Number(query.category) || 0;

  const fetchingCategories = useFetch(URL);

  useEffect(() => {
    if (fetchingCategories.data) {
      dispatch(handleCategoriesChange({ ...fetchingCategories.data }));
    }
  }, [dispatch, fetchingCategories.data]);

  if (fetchingCategories.loading) {
    return <Loading />;
  }

  if (fetchingCategories.error) {
    return errorHandler(fetchingCategories.error);
  }

  if (!state.categories) {
    return <Loading />;
  }

  const iconOfDefaultCategories = [
    selected => <AllInboxIcon className={selected ? classes.whiteIcon : ''} />,
    selected => <DraftsIcon className={selected ? classes.whiteIcon : ''} />,
    selected => <SendIcon className={selected ? classes.whiteIcon : ''} />,
    selected => <ImportContacts className={selected ? classes.whiteIcon : ''} />,
    selected => <DeleteIcon className={selected ? classes.whiteIcon : ''} />,
  ];

  const handleDialogOpen = (type, idx) => {
    const dialogData = getDialogData({
      type,
      handleSnackbarState,
      categories: state.categories,
      idx: idx + 4,
      setDialogOpen,
      setCategories: handleCategoriesChange,
      dispatch,
    });
    if (!dialogData) return;
    setDialogOkButtonDisableState(false);
    setDialogState(dialogData);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogTextFieldState('');
    setDialogOpen(false);
  };

  const handleClick = () => {
    setMailboxFolderOpen(!mailboxFolderOpen);
  };

  const { categories } = state;
  const filteredDefaultCategories = categories.filter(category => category.is_default);
  const defaultCategories = [{ name: ENTIRE_MAILBOX, no: 0 }, ...filteredDefaultCategories];
  const customCategories = categories.filter(category => !category.is_default);

  const defaultCards = defaultCategories.map((category, idx) => {
    const selected = queryCategory === category.no;
    return (
      <ListItem
        style={selected ? { backgroundColor: '#0066FF' } : {}}
        button={!selected}
        key={idx}
        onClick={() => changeCategory({ categoryNo: category.no, ...query })}>
        <ListItemIcon>{iconOfDefaultCategories[idx](selected)}</ListItemIcon>
        <ListItemText primary={category.name} style={selected ? { color: 'white' } : {}} />
      </ListItem>
    );
  });

  const customCategoryCards = customCategories.map((category, idx) => {
    const selected = queryCategory === category.no;
    return (
      <ListItem
        key={idx}
        className={classes.nested}
        style={selected ? { backgroundColor: '#0066FF' } : {}}
        button={!selected}
        onClick={() => changeCategory({ categoryNo: category.no, ...query })}>
        <ListItemIcon>
          <StarBorder className={selected ? classes.whiteIcon : ''} />
        </ListItemIcon>
        <ListItemText>
          <S.EllipsisList style={selected ? { color: 'white' } : {}}>
            {category.name}
          </S.EllipsisList>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="modify" onClick={() => handleDialogOpen(MODIFY, idx)}>
            <ModifyIcon className={selected ? classes.whiteIcon : ''} fontSize={'small'} />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDialogOpen(DELETE, idx)}>
            <DeleteIcon className={selected ? classes.whiteIcon : ''} fontSize={'small'} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  return (
    <S.Aside>
      <HeadTitle title={''} />

      <List component="nav">
        <ListItem className={classes.alignHorizontalCenter}>
          <S.WrtieButton onClick={() => changeView(VIEW.WRITE)}>메일쓰기</S.WrtieButton>
          <S.WrtieButton onClick={() => changeView(VIEW.WRITE_TO_ME)}>내게쓰기</S.WrtieButton>
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
            <ListItem button onClick={() => handleDialogOpen(ADD)} className={classes.nested}>
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
          {dialogState.needTextField && (
            <TextField
              onChange={({ target: { value } }) => setDialogTextFieldState(value)}
              autoFocus
              margin="dense"
              id="dialogTextField"
              type="text"
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={dialogOkButtonDisableState}
            onClick={() =>
              dialogState.okBtnHandler(dialogTextFieldState.trim(), setDialogOkButtonDisableState)
            }
            color="primary">
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
