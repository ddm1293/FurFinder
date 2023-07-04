export class UserAlreadyExistException extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 409;
    this.type = 'UserAlreadyExistException';
  }
}

export class UserDoesNotExistException extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = 404;
    this.type = 'UserDoesNotExistException';
  }
}
