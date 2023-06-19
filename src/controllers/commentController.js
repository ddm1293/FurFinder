import commentService from '../services/commentService.js';
import { handleError } from '../exceptions/handleError.js';
import { CommentDoesNotExistException } from '../exceptions/commentException.js';
import { ThreadDoesNotExistException } from '../exceptions/threadException.js';
export const createComment = async (req, res) => {
  try {
    console.log('Server:: create the Comment');
    const threadId = req.params.threadId;
    console.log(threadId);
    const comment = await commentService.createComment(threadId, req.body);
    res.status(201).json({
      message: 'The comment is created successfully',
      commentCreated: comment,
      commentId: comment.comments.slice(-1)[0]
    });
  } catch (err) {
    console.error(err);
    res.status(400).send('Cannot create this comment');
  }
};

export const getComment = async (req, res) => {
  try {
    console.log('Server::get the comment');
    const id = req.params.id;
    const comment = await commentService.getComment(id);
    res.status(200).json({ comment });
  } catch (err) {
    handleError(err, res, CommentDoesNotExistException, 404);
  }
};

export const getCommentsByThread = async (req, res) => {
  try {
    console.log('Server::Getting comments - running getComments');
    const threadId = req.params.threadId;
    const comments = await commentService.getCommentsByThread(threadId);
    res.status(200).json({ message: 'Successfully find the comments', comments });
  } catch (err) {
    handleError(err, res, ThreadDoesNotExistException, 404);
  }
};

export const updateComment = async (req, res) => {
  try {
    console.log('Server::update the comment');
    const id = req.params.id;
    const updated = await commentService.updateComment(id, req.body);
    res.status(200).json({ message: 'Successfully updated', updated });
  } catch (err) {
    handleError(err, res, CommentDoesNotExistException, 404);
  }
};

export const patchComment = async (req, res) => {
  try {
    console.log('Server::patch the comment');
    const id = req.params.id;
    const patched = await commentService.patchComment(id, req.body);
    res.status(200).json({ message: 'Successfully patched', patched });
  } catch (err) {
    handleError(err, res, CommentDoesNotExistException, 404);
  }
};

export const deleteComment = async (req, res) => {
  try {
    console.log('Server::delete the comment');
    const id = req.params.id;
    const deleted = await commentService.deleteComment(id);
    res.status(204).json({ message: 'Successfully deleted', deleted });
  } catch (err) {
    handleError(err, res, CommentDoesNotExistException, 404);
  }
};
