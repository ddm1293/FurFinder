export class CommentDoesNotExistException extends Error {
  constructor(msg) {
    super(msg);
    this.type = 'CommentDoesNotExistException';
  }
}