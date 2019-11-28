import React, { useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import S from './styled';
import MailArea from '../MailArea';
import WriteMail from '../WriteMail';
import useFetch from '../../utils/use-fetch';
import Loading from '../Loading';
import { AppDisapthContext } from '../../contexts';
import { handleCategoryClick, setView } from '../../contexts/reducer';
import { handleErrorStatus } from '../../utils/error-handler';

const URL = '/mail/categories';
const defaultCategories = [{ name: '전체메일함', no: 0 }];
const userDefinedCategories = [];
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
}));

const setCategories = ({ categories }) => {
  categories.forEach(category => {
    if (category.is_default) {
      defaultCategories.push(category);
    } else {
      userDefinedCategories.push(category);
    }
  });
};

const Aside = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { dispatch } = useContext(AppDisapthContext);
  const callback = useCallback(
    (err, data) => (err ? handleErrorStatus(err) : setCategories(data)),
    [],
  );
  const isLoading = useFetch(callback, URL);

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = () => {
    setOpen(!open);
  };

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
    </ListItem>
  ));

  return (
    <S.Aside>
      <List component="nav">
        <ListItem>
          <S.WrtieButton onClick={() => dispatch(setView(<WriteMail />))}>편지쓰기</S.WrtieButton>
          <S.WrtieButton>내게쓰기</S.WrtieButton>
        </ListItem>
        {defaultCards}
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {userDefinedCategoryCards}
          </List>
        </Collapse>
      </List>
    </S.Aside>
  );
};

export default Aside;
