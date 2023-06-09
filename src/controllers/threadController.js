import ThreadService from '../services/threadService.js';

export const createThread = async (req, res) => {
  try {
    console.log('Server::Creating a thread - running createThread');
    const thread = await ThreadService.createThread(req.body);
    res.status(200).json({
      message: 'The thread is created successfully',
      petCreated: res.petCreated,
      threadCreated: thread
    });
  } catch (err) {
    console.error(err);
    res.status(400).send('Error Creating this thread');
  }
};

export const getThread = async (req, res) => {
  try {
    console.log('Server::Getting a thread - running getThread');
    const id = req.params.id;
    const thread = await ThreadService.getThread(id);
    res.status(200).json({ thread });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

// TODO:
export const getThreadsByUser = async (req, res) => {
  console.log('Server::getThreadsByUser');
};

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
