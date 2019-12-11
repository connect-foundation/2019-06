import request from './request';

const convertNumberToArray = no => {
  if (!Array.isArray(no)) {
    return [no];
  }
  return no;
};

const update = async (no, props) => {
  const nos = convertNumberToArray(no);
  return request.patch('/mail', { nos, props });
};

const remove = async no => {
  const nos = convertNumberToArray(no);
  return request.delete('/mail', { nos });
};

const get = async url => {
  return request.get(url);
};

export default { update, remove, get };
