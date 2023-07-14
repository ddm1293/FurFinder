import ThreadService from '../services/threadService.js';
import PetService from '../services/petService.js';
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

export const getAllThreads = async (req, res, next) => {
  try {
    console.log('Server::Getting all threads - running getAllThreads');
    const threads = await ThreadService.getAllThreads();
    const totalNumber = await ThreadService.totalNumber();
    res.status(200).json({
      totalNumber,
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
    // console.log('req: ', req);
    const threadId = req.params.id;
    const formBody = req.body;
    console.log('threadId: ', threadId);
    console.log('formBody: ', formBody);

    // Separate thread data and pet data
    const threadData = {
      title: formBody.title,
      content: formBody.content,
      threadType: formBody.threadType
    };

    const geoPoint = formBody.lastSeenLocation;
    const lastSeenLocation = {
      type: 'Point',
      coordinates: [geoPoint.lng, geoPoint.lat]
    };
    const petData = {
      name: formBody.name,
      species: formBody.species,
      breed: formBody.breed,
      id: formBody.id,
      threadType: formBody.threadType,
      description: formBody.description,
      sex: formBody.sex,
      lastSeenTime: formBody.lastSeenTime,
      pic: formBody.pic,
      lastSeenLocation
    };

    console.log('Pet data: ', petData);
    // Update thread
    const updatedThread = await ThreadService.updateThread(threadId, threadData);
    console.log('UpdatedThread from backend: ', updatedThread);

    // Update pet
    const petId = updatedThread.pet; // assuming the pet id is available here
    const updatedPet = await PetService.updatePet(petId, petData);
    console.log('UpdatedPet from backend: ', updatedPet);

    res.status(200).json({ message: 'Successfully updated', updated: updatedThread });
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

export const favoriteThread = async (req, res) => {
  try {
    console.log('Server::favorite a thread - running favoriteThread');
    const id = req.params.id;
    const userId = req.params.userId;
    // const userId = req.body;
    console.log(req);
    const favorite = await ThreadService.favoriteThread(id, userId);
    res.status(200).json({ message: 'Successfully favorite or unfavorite', favorite });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err.message
    });
  }
};
