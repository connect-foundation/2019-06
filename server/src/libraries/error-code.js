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

  USER_NOT_FOUND: $(404, '없는 아이디 입니다.', 'LOGIN001'),
  INVALID_LOGIN_PASSWORD: $(400, '비밀번호가 일치하지 않습니다.', 'LOGIN002'),
  ALREADY_LOGGED_IN: $(409, '이미 로그인되어 있습니다.', 'LOGIN003'),

  ID_DUPLICATION: $(409, '이미 사용중인 아이디 입니다.', 'JOIN001'),
  EMAIL_DUPLICATION: $(409, '이미 가입에 사용한 이메일 입니다.', 'JOIN002'),

  FAIL_TO_SEND_MAIL: $(500, '메일 전송에 실패하였습니다.', 'MAIL001'),
  FAIL_TO_SAVE_MAIL: $(500, '메일을 데이터베이스에 저장하는데 실패하였습니다.', 'MAIL002'),

  IS_NOT_ALLOW_EXTENSION: $(400, '허용하지 않는 확장자입니다.', 'UPLOAD001'),
  FAIL_TO_SAVE_ATTACHMENT: $(
    500,
    '첨부파일을 데이터베이스에 저장하는데 실패하였습니다.',
    'UPLOAD002',
  ),
};

export default ERROR_CODE;
