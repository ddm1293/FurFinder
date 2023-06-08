import ThreadService from '../services/threadService.js';

// TODO:
export const createThread = async (req, res) => {
  try {
    const thread = await ThreadService.createThread(req.body);
    res.status(200).json({ body: req.body, thread });
  } catch (err) {}
};

// TODO:
export const getThread = async (req, res) => {
  console.log('Server::getThread');
};

// TODO:
export const getThreadsByUser = async (req, res) => {
  console.log('Server::getThreadsByUser');
};

// TODO:
export const getThreads = async (req, res) => {
  try {
    console.log('Server::getThreads');
    const { page, limit } = req.query;
    const threads = await ThreadService.getThreads(page, limit);
    const totalThreads = await ThreadService.totalNumber();
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalThreads / limit),
      threads
    });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

// TODO:
export const updateThread = async (req, res) => {
  console.log('Server::updateThread');
};

// TODO:
export const patchThread = async (req, res) => {
  console.log('Server::patchThread');
};

// TODO:
export const archiveThread = async (req, res) => {
  console.log('Server::archiveThread');
};

// TODO:
export const deleteThread = async (req, res) => {
  console.log('Server::deleteThread');
};
