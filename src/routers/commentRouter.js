import express from 'express';
import threadRouter from './threadRouter.js';

const commentRouter = express.Router();

// TODO:
const createComment = async (req, res) => {
  console.log('Server::createComment');
};

// TODO:
const getComment = async (req, res) => {
  console.log('Server::getComment');
};

// TODO:
const updateComment = async (req, res) => {
  console.log('Server::updateComment');
};

// TODO:
const patchComment = async (req, res) => {
  console.log('Server::patchComment');
};

// TODO:
const deleteThread = async (req, res) => {
  console.log('Server::deleteThread');
};

threadRouter.post('/', createComment);
threadRouter.get('/:id', getComment);
threadRouter.put('/:id', updateComment);
threadRouter.patch('/:id', patchComment);
threadRouter.delete('/:id', deleteThread);

export default commentRouter;
