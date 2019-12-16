import { Op } from 'sequelize';
import DB from '../../../database/index';
import getPaging from '../../../libraries/paging';
import { DEFAULT_MAIL_QUERY_OPTIONS, WASTEBASKET_NAME, SORT_TYPE } from '../../../constant/mail';

const getQueryByOptions = ({
  userNo,
  perPageNum,
  page,
  sort,
  wastebasketNo,
  subject,
  content,
  from,
  to,
  startDate,
  endDate,
}) => {
  const query = {
    userNo,
    options: {
      raw: false,
    },
    paging: {
      limit: perPageNum,
      offset: (page - 1) * perPageNum,
    },
    mailFilter: {
      category_no: {
        [Op.ne]: wastebasketNo,
      },
    },
    mailTemplateFilter: {},
  };

  if (SORT_TYPE[sort]) {
    query.order = SORT_TYPE[sort];
  }

  if (subject) {
    query.mailTemplateFilter.subject = {
      [Op.substring]: subject,
    };
  }

  if (content) {
    query.mailTemplateFilter.text = {
      [Op.substring]: content,
    };
  }

  if (from) {
    query.mailTemplateFilter.from = {
      [Op.substring]: from,
    };
  }

  if (to) {
    query.mailTemplateFilter.to = {
      [Op.substring]: to,
    };
  }

  if (startDate) {
    const date = new Date(...startDate.split('/'));
    date.setMonth(date.getMonth() - 1);
    query.mailTemplateFilter.createdAt = {
      [Op.gte]: date,
    };
  }

  if (endDate) {
    const date = new Date(...endDate.split('/'));
    date.setMonth(date.getMonth() - 1);
    date.setDate(date.getDate() + 1);
    query.mailTemplateFilter.createdAt = {
      ...query.mailTemplateFilter.createdAt,
      [Op.lt]: date,
    };
  }

  return query;
};

const getPagingInfoAndMails = async ({ page, perPageNum, query }) => {
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

const getWastebasketCategoryNo = async userNo => {
  const { no } = await DB.Category.findOneByUserNoAndName(userNo, WASTEBASKET_NAME);
  return no;
};

const advancedSearch = async (userNo, options = {}) => {
  const queryOptions = { ...DEFAULT_MAIL_QUERY_OPTIONS, ...options };
  const { sort, subject, content, from, to, startDate, endDate } = queryOptions;
  let { page, perPageNum } = queryOptions;

  page = +page;
  perPageNum = +perPageNum;
  const wastebasketNo = await getWastebasketCategoryNo(userNo);
  const query = getQueryByOptions({
    userNo,
    perPageNum,
    page,
    sort,
    wastebasketNo,
    subject,
    content,
    from,
    to,
    startDate,
    endDate,
  });

  const pagingAndMails = await getPagingInfoAndMails({ page, perPageNum, query });
  return pagingAndMails;
};

const generalSearch = async (userNo, options = {}) => {
  const queryOptions = { ...DEFAULT_MAIL_QUERY_OPTIONS, ...options };
  const { sort, searchWord } = queryOptions;
  let { page, perPageNum } = queryOptions;

  page = +page;
  perPageNum = +perPageNum;

  const wastebasketNo = await getWastebasketCategoryNo(userNo);
  const query = getQueryByOptions({
    userNo,
    perPageNum,
    page,
    sort,
    wastebasketNo,
  });

  query.mailTemplateFilter = {
    [Op.or]: [
      { subject: { [Op.substring]: searchWord } },
      { text: { [Op.substring]: searchWord } },
    ],
  };

  const pagingAndMails = await getPagingInfoAndMails({ page, perPageNum, query });
  return pagingAndMails;
};

export default {
  advancedSearch,
  generalSearch,
};
