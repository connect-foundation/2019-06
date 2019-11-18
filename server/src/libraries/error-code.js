class ErrorCode {
  constructor({ status, message, code }) {
    this.status = status;
    this.message = message;
    this.code = code;
  }

  /**
   * @param {Number} status
   * @param {String} message
   * @param {String} code
   */
  static createErrorCode(status, message, code) {
    return new ErrorCode({ status, message, code });
  }
}

const $ = ErrorCode.createErrorCode;

const ERROR_CODE = {
  PAGE_NOT_FOUND: $(404, 'PAGE NOT FOUND', 'COMMON001'),
  INVALID_INPUT_VALUE: $(400, 'INVALID INPUT VALUE', 'COMMON002'),
  SESSION_HAS_EXPIRED: $(401, '세션이 만료되었습니다.', 'COMMON003'),
  CONNECTION_HAS_LOST: $(401, '연결이 끊겼습니다.', 'COMMON004'),
  INTERNAL_SERVER_ERROR: $(500, 'Internal Server Error', 'COMMON005'),
  PRIVATE_PATH: $(404, 'PAGE NOT FOUND', 'COMMON006'), // 403대신 404로 응답함으로써 PRIVATE을 보장한다.
  FORBIDDEN: $(403, '권한이 없습니다.', 'COMMON007'),
  UNAUTHORIZED: $(401, '로그인 후 이용해 주세요.', 'COMMON008'),
  INVALID_LOGIN_ID_OR_PASSWORD: $(
    401,
    '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
    'LOGIN001',
  ),
  ID_DUPLICATION: $(409, '이미 사용중인 아이디 입니다.', 'JOIN001'),
  EMAIL_DUPLICATION: $(409, '이미 가입에 사용한 이메일 입니다.', 'JOIN002'),
  IS_NOT_ALLOW_EXTENSION: $(400, '허용하지 않는 확장자입니다.', 'UPLOAD001'),
};

export default ERROR_CODE;
