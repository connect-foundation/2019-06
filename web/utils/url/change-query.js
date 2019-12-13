import Router from 'next/router';

const VIEW_STRING = {
  WRITE: 'write',
  'WRITE-TO-ME': 'write-to-me',
  READ: 'read',
  SEARCH: 'search',
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

const getQueryByOptions = ({
  category,
  page,
  view,
  mailNo,
  sort,
  subject,
  content,
  startDate,
  endDate,
  from,
  to,
}) => {
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
  } else if (view === 'search') {
    if (from) {
      queries.push(`from=${from}`);
    }
    if (to) {
      queries.push(`to=${to}`);
    }
    if (subject) {
      queries.push(`subject=${subject}`);
    }
    if (content) {
      queries.push(`content=${content}`);
    }
    if (startDate) {
      queries.push(`startDate=${startDate}`);
    }
    if (endDate) {
      queries.push(`endDate=${endDate}`);
    }
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
 * @param {String} options.subject
 * @param {String} options.content
 * @param {String} options.from
 * @param {String} options.to
 * @param {String} options.startDate
 * @param {String} options.endDate
 * @param {String} path
 */
const changeUrlWithoutRunning = (options, path = '/') => {
  const queries = getQueryByOptions(options);
  if (queries.length === 0) {
    return Router.push(path, path, { shallow: true });
  }

  const nextUrl = queries.join('&');
  const href = `${path}?${nextUrl}`;
  const as = `/?${nextUrl}`;
  return Router.push(href, as, { shallow: true });
};

export { changeUrlWithoutRunning, getQueryByOptions, changeView, VIEW_STRING, changeCategory };
