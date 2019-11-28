const SORTING_CRITERIA = {
  datedesc: 'sort=datedesc',
  dateasc: 'sort=dateasc',
  subjectdesc: 'sort=subjectdesc',
  subjectasc: 'sort=subjectasc',
  fromdesc: 'sort=fromdesc',
  fromasc: 'sort=fromasc',
};

const getQueryByOptions = ({ category, page, sort }) => {
  const query = [];

  if (category > 0) {
    query.push(`category=${category}`);
  }

  if (page > 0) {
    query.push(`page=${page}`);
  }

  if (SORTING_CRITERIA[sort]) {
    query.push(SORTING_CRITERIA[sort]);
  }

  return query.join('&');
};

export default getQueryByOptions;
