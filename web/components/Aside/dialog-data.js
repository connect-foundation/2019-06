const [ADD, MODIFY, DELETE] = [0, 1, 2];

export const getDialogData = (type, category) => {
  switch (type) {
    case ADD:
      return {
        title: '메일함 추가',
        textContents: '추가할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: null,
      };
    case MODIFY:
      return {
        title: `메일함명(${category.name}) 변경`,
        textContents: '변경할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: null,
      };
    case DELETE:
      return {
        title: `메일함(${category.name}) 삭제`,
        textContents: '정말로 삭제하시겠습니까?',
        needTextField: false,
        okBtnHandler: null,
      };

    default:
      return undefined;
  }
};
