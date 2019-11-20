/* eslint-disable no-undef */
import should from 'should';
import paging from '../../src/libraries/paging';

describe('Paging Test...', () => {
  it('# 페이징결과를 객체로 반환한다.', () => {
    const totalCount = 10000;
    const options = {
      page: 1,
      pageNum: 100,
    };
    const result = paging(totalCount, options);
    result.should.be.properties('startPage', 'endPage', 'page', 'pageNum', 'totalPage');
  });

  it('# page의 default는 1로 계산된다.', () => {
    const totalCount = 10000;
    const options = {
      pageNum: 100,
    };
    const result = paging(totalCount, options);
    result.page.should.be.equal(1);
  });

  it('# page와 pageNum은 입력된 값대로 반환된다.', () => {
    const totalCount = 10000;
    const options = {
      pageNum: 100,
      page: 5,
    };
    const result = paging(totalCount, options);
    result.page.should.be.equal(5);
    result.pageNum.should.be.equal(100);
  });

  it('# page는 startPage와 endPage 사이의 값이다.', () => {
    const totalCount = 10000;
    const options = {
      pageNum: 100,
      page: 10,
    };
    const result = paging(totalCount, options);
    const { page, startPage, endPage } = result;
    page.should.be.within(startPage, endPage);
  });

  it('# totalCount가 0이면 page, startpage, endpage가 1이다.', () => {
    const totalCount = 0;
    const options = {
      pageNum: 100,
      page: 1,
    };
    const result = paging(totalCount, options);
    const { page, startPage, endPage } = result;
    page.should.be.equals(1);
    startPage.should.be.equals(1);
    endPage.should.be.equals(1);
  });

  it('# totalCount가 101이고 pageNum이 100이면 endPage는 2이다.', () => {
    const totalCount = 101;
    const options = {
      pageNum: 100,
      page: 1,
    };
    const result = paging(totalCount, options);
    const { page, endPage } = result;
    page.should.be.equals(1);
    endPage.should.be.equals(2);
  });

  it('# totalCount가0이면 totalPage는 1이다.', () => {
    const totalCount = 0;
    const options = {
      pageNum: 100,
      page: 1,
    };
    const result = paging(totalCount, options);
    const { totalPage } = result;
    totalPage.should.be.equal(1);
  });

  it('# totalCount는 음수면 totalpage는 1이다.', () => {
    const totalCount = -1;
    const options = {
      pageNum: 100,
      page: 1,
    };
    const result = paging(totalCount, options);
    const { totalPage } = result;
    totalPage.should.be.equal(1);
  });
});
