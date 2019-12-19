import Router from 'next/router';

const VIEW = {
  WRITE: 'write',
  WRITE_TO_ME: 'write-to-me',
  READ: 'read',
  SEARCH: 'search',
  LIST: 'list',
};

const changeView = view => {
  changeUrlWithoutRunning({ view });
};

const changeCategory = ({ categoryNo, perPageNum }) => {
  changeUrlWithoutRunning({ category: categoryNo, perPageNum });
};

const getRequestPathByQuery = ({ searchLevel }) => {
  let path = '/mail';
  if (!searchLevel) {
    return path;
  }
  path += '/search';
  path += searchLevel === 'advanced' ? '/advanced' : '/general';
  return path;
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
  searchLevel,
  searchWord,
  mailIndex,
  perPageNum,
}) => {
  const queries = [];
  const setQueries = (key, value) => {
    if (value || value === 0) {
      queries.push(`${key}=${value}`);
    }
  };

  setQueries('view', view);
  setQueries('searchLevel', searchLevel);
  setQueries('searchWord', searchWord);
  setQueries('mailNo', mailNo);
  setQueries('category', category);
  setQueries('page', page);
  setQueries('from', from);
  setQueries('to', to);
  setQueries('subject', subject);
  setQueries('content', content);
  setQueries('startDate', startDate);
  setQueries('endDate', endDate);
  setQueries('sort', sort);
  setQueries('mailIndex', mailIndex);
  setQueries('perPageNum', perPageNum);
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
 * @param {String} options.searchLevel
 * @param {Number} options.perPageNum
 * @param {String} path
 */
const changeUrlWithoutRunning = (options = {}, path = '/') => {
  const queries = getQueryByOptions(options);
  if (queries.length === 0) {
    return Router.push(path, path, { shallow: true });
  }

  const href = `${path}?${queries}`;
  const as = `/?${queries}`;
  return Router.push(href, as, { shallow: true });
};

export {
  VIEW,
  changeUrlWithoutRunning,
  getRequestPathByQuery,
  getQueryByOptions,
  changeView,
  changeCategory,
};
