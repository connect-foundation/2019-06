import DB from '../../database/index';
import getPaging from '../../libraries/paging';

const DEFAULT_MAIL_QUERY_OPTIONS = {
  category: 0,
  page: 1,
  perPageNum: 100,
};

const getQueryByOptions = ({ userNo, category, perPageNum, page }) => {
  const query = {
    userNo,
    options: {
      raw: false,
    },
    paging: {
      limit: perPageNum,
      offset: (page - 1) * perPageNum,
    },
    mailFilter: {},
  };

  if (category > 0) {
    query.mailFilter.category_no = category;
  }

  return query;
};

const getMailsByOptions = async (userNo, options = {}) => {
  const queryOptions = { ...DEFAULT_MAIL_QUERY_OPTIONS, ...options };
  let { category, page, perPageNum } = queryOptions;
  category = Number(category);
  page = Number(page);
  perPageNum = Number(perPageNum);

  const query = getQueryByOptions({ userNo, category, perPageNum, page });
  const { count: totalCount, rows: mails } = await DB.Mail.findAndCountAllFilteredMail(query);

  const pagingOptions = {
    page,
    perPageNum,
  };
  const pagingResult = getPaging(totalCount, pagingOptions);

  return {
    paging: pagingResult,
    mails,
  };
};

export default { getMailsByOptions };
