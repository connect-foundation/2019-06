const [ADD, MODIFY, DELETE] = [0, 1, 2];

const makeMailbox = e => {};

const alterMailbox = e => {};

const deleteMailbox = e => {};

export const getDialogData = (type, categories, idx, setDialogOpen) => {
  switch (type) {
    case ADD:
      return {
        title: '메일함 추가',
        textContents: '추가할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: (e, inputValue) => {
          makeMailbox(e);
          // 서버와 통신하여 메일함을 새로 만들어서 그 결과를 가져온 후 넣어야 함
        },
      };
    case MODIFY:
      return {
        title: `메일함명(${categories[idx].name}) 변경`,
        textContents: '변경할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: (e, inputValue) => {
          if (categories.every(category => category.name !== inputValue)) {
            categories[idx].name = inputValue;
            // 서버와 통신하여 메일함 이름을 바꾸어야 함
          }
          setDialogOpen(false);
        },
      };
    case DELETE:
      return {
        title: `메일함(${categories[idx].name}) 삭제`,
        textContents: '정말로 삭제하시겠습니까?',
        needTextField: false,
        okBtnHandler: e => {
          // 서버와 통신하여 메일함을 삭제해야 함
          deleteMailbox(e);
        },
      };

    default:
      return undefined;
  }
};
