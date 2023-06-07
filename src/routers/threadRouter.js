import express from 'express';
import { ThreadModel } from '../models/thread.js';

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
const getThreadsByUser = async (req, res) => {
  console.log('Server::getThreadsByUser');
};

// TODO:
const getAllThreads = async (req, res) => {
  try {
    console.log('Server::getAllThreads');
    res.status(200).json({

    });
  } catch (err) {

  }
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

threadRouter.post('/', createThread);
threadRouter.get('/:id', getThread);
threadRouter.get('/userId/:id', getThreadsByUser);
threadRouter.get('/getAllThreads', getAllThreads);
threadRouter.put('/:id', updateThread);
threadRouter.patch('/:id', patchThread);
threadRouter.put('/:id/archive', archiveThread);
threadRouter.delete('/:id', deleteThread);

export default threadRouter;
