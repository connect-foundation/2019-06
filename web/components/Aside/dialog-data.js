import React from 'react';
import { StarBorder } from '@material-ui/icons';

const [ADD, MODIFY, DELETE] = [0, 1, 2];

const makeMailbox = e => {};

const alterMailbox = e => {};

const deleteMailbox = e => {};

export const getDialogData = (type, customCategory, idx, setDialogOpen, setCustomCategory) => {
  switch (type) {
    case ADD:
      return {
        title: '메일함 추가',
        textContents: '추가할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: (e, name) => {
          customCategory.push({ name, icon: <StarBorder fontSize={'small'} />, no: 6 });
          setDialogOpen(false);
          // 서버와 통신하여 메일함을 새로 만들어서 그 결과를 가져온 후 넣어야 함
          makeMailbox(e);
        },
      };
    case MODIFY:
      return {
        title: `메일함명(${customCategory[idx].name}) 변경`,
        textContents: '변경할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: (e, name) => {
          if (customCategory.every(category => category.name !== name)) {
            customCategory[idx].name = name;
            setCustomCategory([...customCategory]);
            // 서버와 통신하여 메일함 이름을 바꾸어야 함
            alterMailbox(e);
          }
          setDialogOpen(false);
        },
      };
    case DELETE:
      return {
        title: `메일함(${customCategory[idx].name}) 삭제`,
        textContents: '정말로 삭제하시겠습니까?',
        needTextField: false,
        okBtnHandler: e => {
          setCustomCategory(customCategory.filter((_, index) => idx !== index));
          setDialogOpen(false);
          // 서버와 통신하여 메일함을 삭제해야 함
          deleteMailbox(e);
        },
      };

    default:
      return undefined;
  }
};
