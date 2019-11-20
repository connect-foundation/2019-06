class ErrorField {
  /**
   * @param {String} field filed type
   * @param {*} value
   * @param {String} reason
   */
  constructor(field, value = '', reason) {
    this.field = field;
    this.value = field.substr(0, 2) === 'pw' ? 'secret' : value;
    this.reason = reason;
  }
}

export default ErrorField;
