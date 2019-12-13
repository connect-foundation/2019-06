import Router from 'next/router';

const VIEW_STRING = {
  WRITE: 'write',
  'WRITE-TO-ME': 'write-to-me',
  READ: 'read',
};

const SORTING_CRITERIA = {
  datedesc: 'sort=datedesc',
  dateasc: 'sort=dateasc',
  subjectdesc: 'sort=subjectdesc',
  subjectasc: 'sort=subjectasc',
  fromdesc: 'sort=fromdesc',
  fromasc: 'sort=fromasc',
};

const changeView = view => {
  changeUrlWithoutRunning({ view });
};

const changeCategory = categoryNo => {
  changeUrlWithoutRunning({ category: categoryNo });
};

const getQueryByOptions = ({ category, page, view, mailNo, sort }) => {
  const queries = [];

  if (category > 0) {
    queries.push(`category=${category}`);
  }

  if (page > 0) {
    queries.push(`page=${page}`);
  }

  if (view) {
    queries.push(`view=${view}`);
  }

  if (view === VIEW_STRING.READ) {
    queries.push(`mailNo=${mailNo}`);
  }

  if (SORTING_CRITERIA[sort]) {
    queries.push(SORTING_CRITERIA[sort]);
  }

  return queries;
};

/**
 * @param {Object} options
 * @param {Number} options.category
 * @param {Number} options.page
 * @param {String} options.view
 * @param {Number} options.mailNo
 * @param {String} options.sort
 */
const changeUrlWithoutRunning = options => {
  const queries = getQueryByOptions(options);
  if (queries.length === 0) {
    return Router.push('/', '/', { shallow: true });
  }

  const nextUrl = queries.join('&');
  const href = `/?${nextUrl}`;
  const as = href;
  return Router.push(href, as, { shallow: true });
};

export { changeUrlWithoutRunning, getQueryByOptions, changeView, VIEW_STRING, changeCategory };
