const PAGE_LIST_NUM = 10;

/**
 * @param {Number} totalCount 메일함에있는 메일
 * @param {Object} options
 * @param {Number} options.page 현재 페이지
 * @param {Number} options.pageNum 한페이지당 출력할 갯수
 * @returns {Object} paging result
 */

function paging(totalCount, options = {}) {
  const pageNum = options.pageNum || 100;
  let page = options.page || 1;

  const totalPage = Math.ceil(totalCount / pageNum) || 1;

  if (totalPage < page) {
    page = totalPage;
  }

  const startPage = Math.floor((page - 1) / PAGE_LIST_NUM) * PAGE_LIST_NUM + 1;
  let endPage = startPage + PAGE_LIST_NUM - 1;
  endPage = endPage > totalPage ? totalPage : endPage;
  return { startPage, endPage, page, pageNum, totalPage };
}

export default paging;
