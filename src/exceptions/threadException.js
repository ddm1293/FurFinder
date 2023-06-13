export class ThreadDoesNotExistException extends Error {
  constructor(msg) {
    super(msg);
    this.type = 'ThreadDoesNotExistException';
  }
}
