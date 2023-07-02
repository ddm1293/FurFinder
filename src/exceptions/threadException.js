import _ from 'lodash';

export class ThreadDoesNotExistException extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 404;
    this.type = 'ThreadDoesNotExistException';
  }
}

export class InvalidQueryException extends Error {
  constructor (errors) {
    const errMsg = _.join(
      _.map(errors, (err) => `${err.msg}: at: ${err.path} with value being: ${err.value}`),
      ', and ');
    super('Invalid Query Because - ' + errMsg);
    this.errors = errors;
    this.statusCode = 400;
    this.type = 'InvalidQueryException';
  }
}
