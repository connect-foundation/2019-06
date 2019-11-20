class ErrorResponse {
  /**
   * @param {ErrorCode} errorCode instance
   * @param {ErrorField[]} fieldErrors
   */
  constructor(errorCode, fieldErrors = []) {
    this.errorCode = errorCode;
    this.fieldErrors = Array.isArray(fieldErrors) ? fieldErrors : [fieldErrors];
  }
}

export default ErrorResponse;
