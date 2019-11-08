import ERROR_CODE from './error-code';

class NotFoundException {
  constructor() {
    this.errorCode = ERROR_CODE.PAGE_NOT_FOUND;
  }
}

export default new NotFoundException();
