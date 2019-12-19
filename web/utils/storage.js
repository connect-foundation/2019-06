const getUser = () => {
  const data = window.sessionStorage.getItem('user');

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

const setUser = user => {
  window.sessionStorage.setItem('user', JSON.stringify(user));
};

const clearAll = () => {
  window.sessionStorage.clear();
};

export default {
  getUser,
  setUser,
  clearAll,
};
