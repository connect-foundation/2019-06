import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import S from './styled';
import MailArea from '../MailArea';
import WriteMail from '../WriteMail';
import BoxSetting from '../BoxSetting';
import { AppDisapthContext } from '../../contexts';
import { handleCategoryClick, setView } from '../../contexts/reducer';

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

const Aside = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { dispatch } = useContext(AppDisapthContext);
  const handleClick = () => {
    setOpen(!open);
  };

  const defaultCategory = [
    { name: '받은편지함', icon: <AllInboxIcon />, no: 0 },
    { name: '중요편지함', icon: <StarBorder />, no: 1 },
    { name: '보낸메일함', icon: <SendIcon />, no: 2 },
    { name: '내게쓴메일함', icon: <DraftsIcon />, no: 3 },
    { name: '휴지통', icon: <DeleteIcon />, no: 4 },
  ];

  const userCategory = [
    { name: '대햇', icon: <StarBorder />, no: 5 },
    { name: '흑우', icon: <StarBorder />, no: 6 },
  ];

  const defaultCard = defaultCategory.map((category, idx) => (
    <ListItem
      button
      key={idx}
      onClick={() => dispatch(handleCategoryClick(category.no, <MailArea />))}>
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
        <ListItem className={classes.alignHorizontalCenter}>
          <S.WrtieButton onClick={() => dispatch(setView(<WriteMail />))}>편지쓰기</S.WrtieButton>
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
        <ListItem className={classes.alignHorizontalCenter}>
          <S.WrtieButton
            onClick={() => dispatch(setView(<BoxSetting />))}
            className={classes.alignHorizonVerticalCenter}>
            {<SettingsIcon />}메일함 설정
          </S.WrtieButton>
        </ListItem>
      </List>
    </S.Aside>
  );
};

export default Aside;
