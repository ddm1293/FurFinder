export class UserAlreadyExistException extends Error {
  constructor(msg) {
    super(msg);
    this.type = 'UserAlreadyExistException';
  }
}

export class UserDoesNotExistException extends Error {
  constructor(msg) {
    super(msg);
    this.type = 'UserDoesNotExistException';
  }
}
