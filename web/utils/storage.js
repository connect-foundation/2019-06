export const getUser = window => {
  const data = window.sessionStorage.getItem('user');

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};
