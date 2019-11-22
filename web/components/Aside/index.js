import React, { useContext } from 'react';
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
import { AppContext } from '../../contexts';
import { setSelected } from '../../contexts/reducer';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Aside = ({ setView }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { state, dispatch } = useContext(AppContext);

  const handleClick = () => {
    setOpen(!open);
  };

  const defaultCategory = [
    { name: '받은편지함', icon: <AllInboxIcon />, view: <MailArea mailList={state.mails} /> },
    { name: '중요편지함', icon: <StarBorder />, view: <></> },
    { name: '보낸메일함', icon: <SendIcon />, view: <></> },
    { name: '내게쓴메일함', icon: <DraftsIcon />, view: <></> },
    { name: '휴지통', icon: <DeleteIcon />, view: <></> },
  ];

  const userCategory = [
    { name: '대햇', icon: <StarBorder />, view: <></> },
    { name: '흑우', icon: <StarBorder />, view: <></> },
  ];

  const defaultCard = defaultCategory.map((category, idx) => (
    <ListItem
      button
      key={idx}
      onClick={() => {
        setView(category.view), dispatch(setSelected(null));
      }}>
      <ListItemIcon>{category.icon}</ListItemIcon>
      <ListItemText primary={category.name} />
    </ListItem>
  ));
  const userCategoryCard = userCategory.map((category, idx) => (
    <ListItem button key={idx} className={classes.nested}>
      <ListItemIcon>{category.icon}</ListItemIcon>
      <ListItemText primary={category.name} />
    </ListItem>
  ));

  return (
    <S.Aside>
      <List component="nav">
        <ListItem>
          <S.WrtieButton onClick={e => setView(<WriteMail />)}>편지쓰기</S.WrtieButton>
          <S.WrtieButton>내게쓰기</S.WrtieButton>
        </ListItem>
        {defaultCard}
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {userCategoryCard}
          </List>
        </Collapse>
      </List>
    </S.Aside>
  );
};

export default Aside;
