import express from 'express';

const threadRouter = express.Router();

// TODO:
const createThread = async (req, res) => {
  console.log('Server::createThread');
};

// TODO:
const getThread = async (req, res) => {
  console.log('Server::getThread');
};

// TODO:
const updateThread = async (req, res) => {
  console.log('Server::updateThread');
};

// TODO:
const patchThread = async (req, res) => {
  console.log('Server::patchThread');
};

// TODO:
const archiveThread = async (req, res) => {
  console.log('Server::archiveThread');
};

// TODO:
const deleteThread = async (req, res) => {
  console.log('Server::deleteThread');
};

threadRouter.post('/thread/:id/:kind', createThread);
threadRouter.get('/thread/:id', getThread);
threadRouter.put('/thread/:id', updateThread);
threadRouter.patch('/thread/:id', patchThread);
threadRouter.put('/thread/:id/archive', archiveThread);
threadRouter.delete('/thread/:id', deleteThread);

export default threadRouter;
