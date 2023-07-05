import ThreadService from '../services/threadService.js';
import PetService from '../services/petService.js';
import { ThreadDoesNotExistException } from '../exceptions/threadException.js';
import { handleError } from '../exceptions/handleError.js';
import { UserDoesNotExistException } from '../exceptions/userException.js';

export const createThread = async (req, res) => {
  try {
    console.log('Server::Creating a thread - running createThread');
    console.log('Server::Creating a thread req: ', req);

    const threadData = {
      title: req.body['thread-title'],
      kind: req.body['select-thread-type'],
      poster: req.body.poster,
      pet: req.body.pet, // The pet id we just created and saved in req.body.pet
      content: req.body['thread-main-content'],
      comments: [], // Initialize with an empty array if comments are not passed in req.body
      archived: false // Initialize as false, or you could set this based on req.body if applicable
    };

    const thread = await ThreadService.createThread(threadData);

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
    handleError(err, res, ThreadDoesNotExistException, 404);
  }
};

export const getThreadsByUserId = async (req, res) => {
  try {
    console.log('Server::getThreadsByUser');
    const threads = await ThreadService.getThreadsOfUserById(req.params.id);
    res.status(200).json({ message: 'Successfully find the threads', threads });
  } catch (err) {
    handleError(err, res, UserDoesNotExistException, 404);
  }
};

export const getThreads = async (req, res) => {
  try {
    console.log('Server::Getting threads - running getThreads');
    const { page, limit } = req.query;
    const threads = await ThreadService.getThreads(page, limit);
    const totalThreads = await ThreadService.totalNumber();
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalThreads / limit),
      threads
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err.message
    });
  }
};

export const updateThread = async (req, res) => {
  try {
    console.log('Server::Updating a thread - running updateThread');
    // console.log('req: ', req);
    const threadId = req.params.id;
    const formBody = req.body;
    console.log('threadId: ', threadId);
    console.log('formBody: ', formBody);

    // Separate thread data and pet data
    const threadData = {
      title: formBody['thread-title'],
      content: formBody['thread-main-content'],
      kind: formBody['select-thread-type']
    };

    const petData = {
      name: formBody['pet-name'],
      species: formBody['pet-species'],
      breed: formBody['pet-breed'],
      id: formBody.id,
      type: formBody['select-thread-type'],
      description: formBody.description,
      sex: formBody['pet-sex'],
      lastSeenTime: formBody['missing-date'],
      pic: formBody['pet-pic']
    };

    // Update thread
    const updatedThread = await ThreadService.updateThread(threadId, threadData);
    console.log('UpdatedThread from backend: ', updatedThread);

    // Update pet
    const petId = updatedThread.pet; // assuming the pet id is available here
    const updatedPet = await PetService.updatePet(petId, petData);
    console.log('UpdatedPet from backend: ', updatedPet);

    res.status(200).json({ message: 'Successfully updated', updated: updatedThread });
  } catch (err) {
    handleError(err, res);
  }
};

export const patchThread = async (req, res) => {
  try {
    console.log('Server::Patching a thread - running patchThread');
    const id = req.params.id;
    const patched = await ThreadService.patchThread(id, req.body);
    res.status(200).json({ message: 'Successfully patched', patched });
  } catch (err) {
    handleError(err, res, ThreadDoesNotExistException, 404);
  }
};

export const archiveThread = async (req, res) => {
  try {
    console.log('Server::Archiving a thread - running archiveThread');
    const id = req.params.id;
    const archived = await ThreadService.archiveThread(id);
    res.status(200).json({ message: 'Successfully archived', archived });
  } catch (err) {
    handleError(err, res, ThreadDoesNotExistException, 404);
  }
};

export const deleteThread = async (req, res) => {
  try {
    console.log('Server::Deleting a thread - running deleteThread');
    const id = req.params.id;
    const deleted = await ThreadService.deleteThread(id);
    res.status(200).json({ message: 'Successfully deleted', deleted });
  } catch (err) {
    handleError(err, res, ThreadDoesNotExistException, 404);
  }
};
