import React from 'react';
import { StarBorder } from '@material-ui/icons';
import req from '../../utils/request';

const [ADD, MODIFY, DELETE] = [0, 1, 2];
const url = '/mail/box';

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
        okBtnHandler: async (e, name) => {
          if (customCategory.every(category => category.name === name)) {
            // TODO: 상단에 에러 메세지 보여주기 (메일함은 이름을 중복해서 만들 수 없습니다)
            return;
          }
          const { isError, data } = await req.post(url, { name });
          if (isError) {
            console.log(isError);
            // TODO: 상단에 에러 메세지 보여주기 (data.message)
            return;
          }
          const { name: createdName, no } = data.createdBox;
          customCategory.push({
            name: createdName,
            icon: <StarBorder fontSize={'small'} />,
            no,
          });
          setDialogOpen(false);
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
