import ThreadService from '../services/threadService.js';
import { matchedData } from 'express-validator';

export const createThread = async (req, res, next) => {
  try {
    console.log('Server::Creating a thread - running createThread');
    const thread = await ThreadService.createThread(req.body, res);
    res.status(200).json({
      message: 'The thread is created successfully',
      petCreated: res.petCreated,
      threadCreated: thread
    });
  } catch (err) {
    next(err);
  }
};

export const getThread = async (req, res, next) => {
  try {
    console.log('Server::Getting a thread - running getThread');
    const id = req.params.id;
    const thread = await ThreadService.getThread(id);
    res.status(200).json({ thread });
  } catch (err) {
    next(err);
  }
};

export const getThreadsByUserId = async (req, res, next) => {
  try {
    console.log('Server::getThreadsByUser');
    const threads = await ThreadService.getThreadsOfUserById(req.params.id);
    res.status(200).json({ message: 'Successfully find the threads', threads });
  } catch (err) {
    next(err);
  }
};

export const getThreads = async (req, res, next) => {
  try {
    console.log('Server::Getting threads - running getThreads');
    const { page, limit } = req.query;
    const threads = await ThreadService.getThreads(page, limit);
    res.status(200).json({
      currentPage: page,
      threads
    });
  } catch (err) {
    next(err);
  }
};

export const getTotalThreadNumber = async (req, res, next) => {
  try {
    console.log('Server::Getting total thread number - running getTotalThreadNumber');
    const totalThreads = await ThreadService.totalNumber();
    res.status(200).json(totalThreads);
  } catch (err) {
    next(err);
  }
};

export const updateThread = async (req, res, next) => {
  try {
    console.log('Server::Updating a thread - running updateThread');
    const id = req.params.id;
    const updated = await ThreadService.updateThread(id, req.body);
    res.status(200).json({ message: 'Successfully updated', updated });
  } catch (err) {
    next(err);
  }
};

export const patchThread = async (req, res, next) => {
  try {
    console.log('Server::Patching a thread - running patchThread');
    const id = req.params.id;
    const patched = await ThreadService.patchThread(id, req.body);
    res.status(200).json({ message: 'Successfully patched', patched });
  } catch (err) {
    next(err);
  }
};

export const archiveThread = async (req, res, next) => {
  try {
    console.log('Server::Archiving a thread - running archiveThread');
    const id = req.params.id;
    const archived = await ThreadService.archiveThread(id);
    res.status(200).json({ message: 'Successfully archived', archived });
  } catch (err) {
    next(err);
  }
};

export const deleteThread = async (req, res, next) => {
  try {
    console.log('Server::Deleting a thread - running deleteThread');
    const id = req.params.id;
    const deleted = await ThreadService.deleteThread(id);
    res.status(200).json({ message: 'Successfully deleted', deleted });
  } catch (err) {
    next(err);
  }
};

export const searchThreads = async (req, res, next) => {
  try {
    console.log('Server::Searching a thread - running searchThreads');
    const data = matchedData(req);
    console.log('matchedData', data);
    const searched = await ThreadService.searchThreads(data);
    res.status(200).json({
      message: 'Successfully found the threads',
      found: searched.length,
      result: searched
    });
  } catch (err) {
    next(err);
  }
};
