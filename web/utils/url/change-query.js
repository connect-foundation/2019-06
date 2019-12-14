import Router from 'next/router';

const VIEW_STRING = {
  WRITE: 'write',
  WRITE_TO_ME: 'write-to-me',
  READ: 'read',
  SEARCH: 'search',
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
  const setQueries = (key, value) => {
    if (value) {
      queries.push(`${key}=${value}`);
    }
  };

  setQueries('category', category);
  setQueries('page', page);
  setQueries('view', view);
  setQueries('mailNo', mailNo);
  setQueries('from', from);
  setQueries('to', to);
  setQueries('subject', subject);
  setQueries('content', content);
  setQueries('startDate', startDate);
  setQueries('endDate', endDate);
  setQueries('sort', sort);
  return queries.join('&');
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

  const href = `${path}?${queries}`;
  const as = `/?${queries}`;
  return Router.push(href, as, { shallow: true });
};

export { changeUrlWithoutRunning, getQueryByOptions, changeView, VIEW_STRING, changeCategory };