import commentService from '../services/commentService.js';
import mongoose from 'mongoose';

export const createComment = async (req, res) => {
  try {
    console.log('Server:: create the Comment');
    const id = req.params.threadId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: 'Invalid thread id',
        data: {}
      });
    }
    const comment = await commentService.createComment(id, req.params, req.body);
    res.status(201).json({
      message: 'The comment is created successfully',
      commentCreated: comment
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
    res.status(400).json({
      error: err.message
    });
  }
};

export const getCommentsByThread = async (req, res) => {
  try {
    console.log('Server::Getting comments - running getComments');
    const threadId = req.params.threadId;
    if (!mongoose.Types.ObjectId.isValid(threadId)) {
      return res.status(400).send({
        message: 'Invalid thread id',
        data: {}
      });
    }
    const comments = await commentService.getCommentsByThread(threadId);
    res.status(200).json({
      comments
    });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    console.log('Server::update the comment');
    const id = req.params.id;
    const updated = await commentService.updateComment(id, req.body);
    res.status(200).json({ message: 'Successfully updated', updated });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

export const patchComment = async (req, res) => {
  try {
    console.log('Server::patch the comment');
    const id = req.params.id;
    const patched = await commentService.patchComment(id, req.body);
    res.status(200).json({ message: 'Successfully patched', patched });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    console.log('Server::delete the comment');
    const id = req.params.id;
    await commentService.deleteComment(id);
    res.status(204).json({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};
