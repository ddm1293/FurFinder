import commentService from '../services/commentService.js';
import { sendEmail } from '../services/sendEmail.js';

export const createComment = async (req, res, next) => {
  try {
    console.log('Server:: create the Comment');
    const threadId = req.params.threadId;
    console.log(threadId);
    const { comment, thread, threadPoster } = await commentService.createComment(threadId, req.body);
    // const emailTemplate =
    //   `<html>
    //       <body>
    //         <p>Your received a new comment!</p>
    //         <p>Check out your thread:
    //           <a href="http://localhost:3000/threads/${thread._id}">"${thread.title}"</a>
    //         </p>
    //       </body>
    //     </html>
    //   `;
    // const email = sendEmail(
    //   threadPoster.useremail,
    //   'New Comment',
    //   '',
    //   emailTemplate
    // );
    // const response = res.status(201).json({
    //   message: 'The comment is created successfully',
    //   commentCreated: comment,
    //   commentId: comment._id
    // });
    //
    // await Promise.all([email, response]); // execute both sendEmail and response creation in parallel

    res.status(201).json({
      message: 'The comment is created successfully',
      commentCreated: comment,
      commentId: comment._id
    });
  } catch (err) {
    next(err);
  }
};

export const getComment = async (req, res, next) => {
  try {
    console.log('Server::get the comment');
    const id = req.params.id;
    const comment = await commentService.getComment(id);
    res.status(200).json({ comment });
  } catch (err) {
    next(err);
  }
};

export const getCommentsByThread = async (req, res, next) => {
  try {
    console.log('Server::Getting comments - running getComments');
    const threadId = req.params.threadId;
    const comments = await commentService.getCommentsByThread(threadId);
    res.status(200).json({ message: 'Successfully find the comments', comments });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    console.log('Server::update the comment');
    const id = req.params.id;
    const updated = await commentService.updateComment(id, req.body);
    res.status(200).json({ message: 'Successfully updated', updated });
  } catch (err) {
    next(err);
  }
};

export const patchComment = async (req, res, next) => {
  try {
    console.log('Server::patch the comment');
    const id = req.params.id;
    const patched = await commentService.patchComment(id, req.body);
    res.status(200).json({ message: 'Successfully patched', patched });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    console.log('Server::delete the comment');
    const id = req.params.id;
    const deleted = await commentService.deleteComment(id);
    res.status(204).json({ message: 'Successfully deleted', deleted });
  } catch (err) {
    next(err);
  }
};
