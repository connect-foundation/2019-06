import request from '../../utils/request';
import { errorParser } from '../../utils/error-parser';

const [ADD, MODIFY, DELETE] = [0, 1, 2];
const url = '/mail/box/';
const nameRegex = /^[0-9a-zA-Z가-힣 ]{1,20}$/;

const [SNACKBAR_ERROR, SNACKBAR_SUCCESS] = ['error', 'success'];
const duplicateErrorMsg = '메일함은 이름을 중복해서 만들 수 없습니다.';
const lengthErrorMsg = '메일함 이름은 최대 20자를 넘을 수 없습니다.';
const regexErrorMsg = '메일함은 완성된 한글, 영문, 숫자로만 이루어질 수 있습니다.';
const successToAddMsg = '메일함이 성공적으로 추가되었습니다.';
const successToModifyMsg = '메일함이 성공적으로 수정되었습니다.';
const successToDeleteMsg = '메일함이 성공적으로 삭제되었습니다.';

const [ERROR, SUCCESS] = [true, false];
const getSnackbarState = (isError, contentText) => ({
  open: true,
  variant: isError ? SNACKBAR_ERROR : SNACKBAR_SUCCESS,
  contentText,
});

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
            setSnackbarState(getSnackbarState(ERROR, duplicateErrorMsg));
            return;
          }
          if (name.length > 20) {
            setSnackbarState(getSnackbarState(ERROR, lengthErrorMsg));
            return;
          }
          if (!nameRegex.test(name)) {
            setSnackbarState(getSnackbarState(ERROR, regexErrorMsg));
            return;
          }
          const { isError, data } = await request.post(url, { name });
          if (isError) {
            const { message } = errorParser(data);
            setSnackbarState(getSnackbarState(ERROR, message));
            return;
          }
          const { name: createdName, no } = data.createdBox;
          customCategory.push({
            name: createdName,
            no,
          });
          setSnackbarState(getSnackbarState(SUCCESS, successToAddMsg));
          setDialogOpen(false);
        },
      };
    case MODIFY:
      return {
        title: `메일함(${customCategory[idx].name}) 변경`,
        textContents: '변경할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: async (name, setSnackbarState) => {
          if (customCategory.find(category => category.name === name)) {
            setSnackbarState(getSnackbarState(ERROR, duplicateErrorMsg));
            return;
          }
          if (name.length > 20) {
            setSnackbarState(getSnackbarState(ERROR, lengthErrorMsg));
            return;
          }
          if (!nameRegex.test(name)) {
            setSnackbarState(getSnackbarState(ERROR, regexErrorMsg));
            return;
          }
          const { isError, data } = await request.patch(url + customCategory[idx].no, {
            oldName: customCategory[idx].name,
            newName: name,
          });
          if (isError) {
            const { message } = errorParser(data);
            setSnackbarState(getSnackbarState(ERROR, message));
            return;
          }
          customCategory[idx].name = name;
          dispatch(setCustomCategory({ categories: customCategory }));
          setSnackbarState(getSnackbarState(SUCCESS, successToModifyMsg));
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
          const { isError, data } = await request.delete(url + no + query);
          if (isError) {
            const { message } = errorParser(data);
            setSnackbarState(getSnackbarState(ERROR, message));
            return;
          }
          dispatch(
            setCustomCategory({ categories: customCategory.filter((_, index) => idx !== index) }),
          );
          setSnackbarState(getSnackbarState(SUCCESS, successToDeleteMsg));
          setDialogOpen(false);
        },
      };

    default:
      return undefined;
  }
};
