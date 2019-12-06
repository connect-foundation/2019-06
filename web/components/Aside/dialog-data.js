import request from '../../utils/request';
import { errorParser } from '../../utils/error-parser';
import { SNACKBAR_VARIANT, getSnackbarState } from '../Snackbar';

const [ADD, MODIFY, DELETE] = [0, 1, 2];
const url = '/mail/box/';
const nameRegex = /^[0-9a-zA-Z가-힣 ]{1,20}$/;

const SNACKBAR_MSG = {
  ERROR: {
    DUPLICATE: '메일함은 이름을 중복해서 만들 수 없습니다.',
    LENGTH: '메일함 이름은 최대 20자를 넘을 수 없습니다.',
    REGEX: '메일함은 완성된 한글, 영문, 숫자로만 이루어질 수 있습니다.',
  },
  SUCCESS: {
    ADD: '메일함이 성공적으로 추가되었습니다.',
    MODIFY: '메일함이 성공적으로 수정되었습니다.',
    DELETE: '메일함이 성공적으로 삭제되었습니다.',
  },
};

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
        okBtnHandler: async (name, handleSnackbarState, setDialogOkButtonDisableState) => {
          let errorMessage = '';
          if (!errorMessage && customCategory.find(category => category.name === name)) {
            errorMessage = SNACKBAR_MSG.ERROR.DUPLICATE;
          }
          if (!errorMessage && name.length > 20) {
            errorMessage = SNACKBAR_MSG.ERROR.LENGTH;
          }
          if (!errorMessage && !nameRegex.test(name)) {
            errorMessage = SNACKBAR_MSG.ERROR.REGEX;
          }
          if (errorMessage) {
            dispatch(handleSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, errorMessage)));
            return;
          }
          setDialogOkButtonDisableState(true);
          const { isError, data } = await request.post(url, { name });
          if (isError) {
            const { message } = errorParser(data);
            dispatch(handleSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, message)));
            setDialogOkButtonDisableState(false);
            return;
          }
          const { name: createdName, no } = data.createdBox;
          customCategory.push({
            name: createdName,
            no,
          });
          dispatch(
            handleSnackbarState(
              getSnackbarState(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.ADD),
            ),
          );
          setDialogOpen(false);
        },
      };
    case MODIFY:
      return {
        title: `메일함(${customCategory[idx].name}) 변경`,
        textContents: '변경할 메일함 이름을 적어주세요',
        needTextField: true,
        okBtnHandler: async (name, handleSnackbarState, setDialogOkButtonDisableState) => {
          let errorMessage = '';
          if (!errorMessage && customCategory.find(category => category.name === name)) {
            errorMessage = SNACKBAR_MSG.ERROR.DUPLICATE;
          }
          if (!errorMessage && name.length > 20) {
            errorMessage = SNACKBAR_MSG.ERROR.LENGTH;
          }
          if (!errorMessage && !nameRegex.test(name)) {
            errorMessage = SNACKBAR_MSG.ERROR.REGEX;
          }
          if (errorMessage) {
            dispatch(handleSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, errorMessage)));
            return;
          }
          setDialogOkButtonDisableState(true);
          const { isError, data } = await request.patch(url + customCategory[idx].no, {
            oldName: customCategory[idx].name,
            newName: name,
          });
          if (isError) {
            const { message } = errorParser(data);
            dispatch(handleSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, message)));
            setDialogOkButtonDisableState(false);
            return;
          }
          customCategory[idx].name = name;
          dispatch(setCustomCategory({ categories: customCategory }));
          dispatch(
            handleSnackbarState(
              getSnackbarState(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.MODIFY),
            ),
          );
          setDialogOpen(false);
        },
      };
    case DELETE:
      return {
        title: `메일함(${customCategory[idx].name}) 삭제`,
        textContents: '정말로 삭제하시겠습니까?',
        needTextField: false,
        okBtnHandler: async (_, handleSnackbarState, setDialogOkButtonDisableState) => {
          setDialogOkButtonDisableState(true);
          const { no, name } = customCategory[idx];
          const query = `?name=${name}`;
          const { isError, data } = await request.delete(url + no + query);
          if (isError) {
            const { message } = errorParser(data);
            dispatch(handleSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, message)));
            setDialogOkButtonDisableState(false);
            return;
          }
          dispatch(
            setCustomCategory({ categories: customCategory.filter((_, index) => idx !== index) }),
          );
          dispatch(
            handleSnackbarState(
              getSnackbarState(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.DELETE),
            ),
          );
          setDialogOpen(false);
        },
      };

    default:
      return undefined;
  }
};
