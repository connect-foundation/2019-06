import request from './request';

const convertToArray = no => (Array.isArray(no) ? no : [no]);

const update = async (no, props) => {
  const nos = convertToArray(no);
  return request.patch('/mail', { nos, props });
};

const remove = async no => {
  const nos = convertToArray(no);
  return request.delete('/mail', { nos });
};

const get = url => {
  return request.get(url);
};

export default { update, remove, get };
