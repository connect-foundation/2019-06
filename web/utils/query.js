const getQueryByOptions = ({ category, page }) => {
  const query = [];

  if (category > 0) {
    query.push(`category=${category}`);
  }

  if (page > 0) {
    query.push(`page=${page}`);
  }
  return query.join('&');
};

export default getQueryByOptions;
