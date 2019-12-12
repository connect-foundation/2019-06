import Router from 'next/router';

const VIEW_STRING = {
  WRITE: 'write',
  'WRITE-TO-ME': 'write-to-me',
  READ: 'read',
};

const changeView = view => {
  changeUrlWithoutRunning({ view });
};

const changeCategory = categoryNo => {
  changeUrlWithoutRunning({ category: categoryNo });
};

const changeUrlWithoutRunning = ({ category, page, view, mailNo }) => {
  const queries = [];
  if (category && category !== 0) {
    queries.push(`category=${category}`);
  }

  if (page) {
    queries.push(`page=${page}`);
  }

  if (view) {
    queries.push(`view=${view}`);
  }

  if (view === VIEW_STRING.READ) {
    queries.push(`mailNo=${mailNo}`);
  }

  if (queries.length === 0) {
    return Router.push('/', '/', { shallow: true });
  }

  const nextUrl = queries.join('&');
  const href = `/?${nextUrl}`;
  const as = href;
  Router.push(href, as, { shallow: true });
};

export { changeUrlWithoutRunning, changeView, VIEW_STRING, changeCategory };
