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
  NOT_ALLOWED_BY_CORS: $(401, '허용되지 않는 도메인입니다.', 'DW3A7Z'),
  INTERNAL_SERVER_ERROR: $(500, 'Internal Server Error', 'COMMON005'),
  PRIVATE_PATH: $(404, 'PAGE NOT FOUND', 'COMMON006'), // 403대신 404로 응답함으로써 PRIVATE을 보장한다.
  FORBIDDEN: $(403, '권한이 없습니다.', 'COMMON007'),
  UNAUTHORIZED: $(401, '로그인 후 이용해 주세요.', 'COMMON008'),
  INVALID_LOGIN_ID_OR_PASSWORD: $(
    401,
    '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
    'LOGIN001',
  ),
  NOT_ALLOWED_PREVIEW_EXTENSION: $(400, '미리보기를 지원하지 않는 확장자 입니다.', 'fdq31cd'),
  EMAIL_NOT_FOUND: $(404, '가입된 적 없는 이메일 입니다.', 'COMMON009'),
  LOGIN_ID_OR_EMAIL_NOT_FOUND: $(
    404,
    '가입하지 않은 아이디이거나, 가입에 사용하지 않은 이메일 입니다.',
    'COMMON010',
  ),
  MAILBOX_NOT_FOUND: $(404, '존재하지 않는 메일함 입니다.', 'COMMON011'),
  MAILBOX_EXCEED_NAME: $(400, '메일함 이름은 최대 20글자입니다.', 'COMMON012'),
  INVALID_DATE: $(400, '유효하지 않는 날짜 정보입니다.', 'COMMON013'),
  ID_DUPLICATION: $(409, '이미 사용중인 아이디 입니다.', 'JOIN001'),
  SUB_EMAIL_DUPLICATION: $(409, '이미 가입에 사용한 이메일 입니다.', 'JOIN002'),
  ID_OR_SUB_EMAIL_DUPLICATION: $(409, '아이디 혹은 이메일을 이미 사용하였습니다.', 'JOIN003'),

  FAIL_TO_SEND_MAIL: $(500, '메일 전송에 실패하였습니다.', 'MAIL001'),
  FAIL_TO_SAVE_MAIL: $(500, '메일을 데이터베이스에 저장하는데 실패하였습니다.', 'MAIL002'),
  MAIL_NOT_FOUND: $(404, '존재하지 않는 메일 입니다.', 'MAIL003'),

  CATEGORY_NOT_FOUND: $(404, '존재하지 않는 카테고리 입니다.', 'CATEGORY001'),

  IS_NOT_ALLOW_EXTENSION: $(400, '허용하지 않는 확장자입니다.', 'UPLOAD001'),
  FAIL_TO_SAVE_ATTACHMENT: $(
    500,
    '첨부파일을 데이터베이스에 저장하는데 실패하였습니다.',
    'UPLOAD002',
  ),
};

export default ERROR_CODE;
