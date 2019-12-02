import request from '../../utils/request';

const [ADD, MODIFY, DELETE] = [0, 1, 2];
const url = '/mail/box/';
const nameRegex = /^[0-9a-zA-Z가-힣 ]{1,20}$/;

const [SNACKBAR_ERROR, SNACKBAR_SUCCESS] = ['error', 'success'];
const duplicateErrorMsg = '메일함은 이름을 중복해서 만들 수 없습니다.';
const lengthErrorMsg = '메일함 이름은 최대 20자를 넘을 수 없습니다.';
const regexErrorMsg = '메일함은 완성된 한글, 영문, 숫자로만 이루어질 수 있습니다.';
const serverErrorMsg = '';
const successToAddMsg = '메일함이 성공적으로 추가되었습니다.';
const successToModifyMsg = '메일함이 성공적으로 수정되었습니다.';

export const getDialogData = (
  type,
  customCategory,
  idx,
  setDialogOpen,
  setCustomCategory,
  dispatch,
) => {
  switch (type) {
    case ADD:
      return {
        title: '메일함 추가',
        textContents: '추가할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: async (name, setSnackbarState) => {
          if (customCategory.find(category => category.name === name)) {
            setSnackbarState({
              open: true,
              variant: SNACKBAR_ERROR,
              contentText: duplicateErrorMsg,
            });
            return;
          }
          if (name.length > 20) {
            setSnackbarState({
              open: true,
              variant: SNACKBAR_ERROR,
              contentText: lengthErrorMsg,
            });
            return;
          }
          if (!nameRegex.test(name)) {
            setSnackbarState({
              open: true,
              variant: SNACKBAR_ERROR,
              contentText: regexErrorMsg,
            });
            return;
          }
          const { isError, data } = await request.post(url, { name });
          if (isError) {
            setSnackbarState({
              open: true,
              variant: SNACKBAR_ERROR,
              contentText: '서버와 통신에 실패하였습니다. 관리자에게 문의해주세요.',
            });
            return;
          }
          const { name: createdName, no } = data.createdBox;
          customCategory.push({
            name: createdName,
            no,
          });
          setSnackbarState({
            open: true,
            variant: SNACKBAR_SUCCESS,
            contentText: successToAddMsg,
          });
          setDialogOpen(false);
        },
      };
    case MODIFY:
      return {
        title: `메일함명(${customCategory[idx].name}) 변경`,
        textContents: '변경할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: async (name, setSnackbarState) => {
          if (customCategory.find(category => category.name === name)) {
            // TODO: 상단에 에러 메세지 보여주기 (메일함은 이름을 중복해서 만들 수 없습니다)
            setSnackbarState({
              open: true,
              variant: SNACKBAR_ERROR,
              contentText: duplicateErrorMsg,
            });
            return;
          }
          if (name.length > 20) {
            // TODO: 상단에 에러 메세지 보여주기 (메일함은 최대 20자를 넘을 수 없습니다)
            setSnackbarState({
              open: true,
              variant: SNACKBAR_ERROR,
              contentText: lengthErrorMsg,
            });
            return;
          }
          if (!nameRegex.test(name)) {
            // TODO: 상단에 에러 메세지 보여주기 (메일함은 완성된 한글, 영문, 숫자로만 이루어질 수 있습니다)
            setSnackbarState({
              open: true,
              variant: SNACKBAR_ERROR,
              contentText: regexErrorMsg,
            });
            return;
          }
          const { isError } = await request.patch(url + customCategory[idx].no, {
            oldName: customCategory[idx].name,
            newName: name,
          });
          if (isError) {
            console.log(isError);
            // TODO: 상단에 에러 메세지 보여주기 (data.message)
            setSnackbarState({
              open: true,
              variant: SNACKBAR_ERROR,
              contentText: '서버와 통신에 실패하였습니다. 관리자에게 문의해주세요.',
            });
            return;
          }
          customCategory[idx].name = name;
          dispatch(setCustomCategory({ categories: customCategory }));
          setSnackbarState({
            open: true,
            variant: SNACKBAR_ERROR,
            contentText: successToModifyMsg,
          });
          setDialogOpen(false);
        },
      };
    case DELETE:
      return {
        title: `메일함(${customCategory[idx].name}) 삭제`,
        textContents: '정말로 삭제하시겠습니까?',
        needTextField: false,
        okBtnHandler: async (_, setSnackbarState) => {
          const { no, name } = customCategory[idx];
          const query = `?name=${name}`;
          const { isError } = await request.delete(url + no + query);
          if (isError) {
            console.log(isError);
            // TODO: 상단에 에러 메세지 보여주기 (data.message)
            return;
          }
          dispatch(
            setCustomCategory({ categories: customCategory.filter((_, index) => idx !== index) }),
          );
          setDialogOpen(false);
        },
      };

    default:
      return undefined;
  }
};
