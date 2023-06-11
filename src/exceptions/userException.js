export class UserAlreadyExistException extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'UserAlreadyExistException';
  }
}
