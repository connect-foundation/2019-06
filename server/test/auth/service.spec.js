/* eslint-disable no-undef */
import should from 'should';
import chai from 'chai';

import service from '../../src/v1/auth/service';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

describe('Auth Service Test', () => {
  before(async () => {
    await DB.sequelize.sync({ force: true });
    await mock();
  });

  it('로그인 정보가 올바를 경우 유저 정보를 반환한다.', async () => {
    const id = 'rooot';
    const password = '12345678';

    const { no } = await service.localLogin({ id, password });

    no.should.an.instanceof(Number);
  });

  it('로그인시 아이디가 올바를지 않을 경우 에러를 던진다.', async () => {
    const id = 'rooott';
    const password = '123478';

    await should(service.localLogin({ id, password })).be.rejected();
  });

  it('로그인시 비밀번호가 올바를지 않을 경우 에러를 던진다.', async () => {
    const id = 'rooot';
    const password = '1234789';

    await should(service.localLogin({ id, password })).be.rejected();
  });
});
