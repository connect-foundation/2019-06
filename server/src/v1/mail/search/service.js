import { Op } from 'sequelize';
import DB from '../../../database/index';
import getPaging from '../../../libraries/paging';

const WASTEBASKET_NAME = '휴지통';

const DEFAULT_MAIL_QUERY_OPTIONS = {
  category: 0,
  page: 1,
  perPageNum: 100,
  sort: 'datedesc',
};

const SORT_TYPE = {
  datedesc: [[DB.MailTemplate, 'createdAt', 'DESC']],
  dateasc: [[DB.MailTemplate, 'createdAt', 'ASC']],
  subjectdesc: [[DB.MailTemplate, 'subject', 'DESC']],
  subjectasc: [[DB.MailTemplate, 'subject', 'ASC']],
  fromdesc: [[DB.MailTemplate, 'from', 'DESC']],
  fromasc: [[DB.MailTemplate, 'from', 'ASC']],
};

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
    mailTemplateFilter: {
      createdAt: {},
    },
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

const getWastebasketCategoryNo = async userNo => {
  const { no } = await DB.Category.findOneByUserNoAndName(userNo, WASTEBASKET_NAME);
  return no;
};

const getMailsByOptions = async (userNo, options = {}) => {
  const queryOptions = { ...DEFAULT_MAIL_QUERY_OPTIONS, ...options };
  const { sort } = queryOptions;
  let { page, perPageNum } = queryOptions;
  const { subject, content, from, to, startDate, endDate } = queryOptions;

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

  const { count: totalCount, rows: mails } = await DB.Mail.findAndCountAllFilteredMail(query);

  const pagingOptions = {
    page,
    perPageNum,
  };
  const pagingResult = getPaging(totalCount, pagingOptions);
  pagingResult.totalCount = totalCount;

  return {
    paging: pagingResult,
    mails,
  };
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

  const { count: totalCount, rows: mails } = await DB.Mail.findAndCountAllFilteredMail(query);
  const pagingOptions = {
    page,
    perPageNum,
  };

  const pagingResult = getPaging(totalCount, pagingOptions);
  pagingResult.totalCount = totalCount;

  return {
    paging: pagingResult,
    mails,
  };
};

export default {
  getMailsByOptions,
  generalSearch,
};
