const getQueryByOptions = ({ category, page, sort }) => {
  const query = [];

  if (category > 0) {
    query.push(`category=${category}`);
  }

  if (page > 0) {
    query.push(`page=${page}`);
  }

  if (sort === 'dateasc') {
    query.push('sort=dateasc');
  }

  return query.join('&');
};

export default getQueryByOptions;
