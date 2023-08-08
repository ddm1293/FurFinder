/* This script updates the database specified by process.env.MONGODB_CONNECTION_STRING using the current models for threads, pets, and comments. */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserModel } from '../../src/models/userModel.js';
import { ThreadModel } from '../../src/models/threadModel.js';
import { PetModel } from '../../src/models/petModel.js';
import { CommentModel } from '../../src/models/commentModel.js';
import { faker } from '@faker-js/faker';
import axios from 'axios';

const catApiRes = await axios.get('https://api.thecatapi.com/v1/breeds');
const dogApiRes = await axios.get('https://api.thedogapi.com/v1/breeds');
const catBreeds = catApiRes.data.map((breed) => ({
  name: breed.name,
  imageId: breed.reference_image_id
}));
const dogBreeds = dogApiRes.data.map((breed) => ({
  name: breed.name,
  imageId: breed.reference_image_id
}));

async function createComment({ commentId, content, authorId, threadId }) {
  await CommentModel.create({
    _id: commentId,
    content,
    author: {
      id: authorId
    },
    threadId
  });
  console.log('Create comment success');
}

async function createPet(petProperties) {
  const shouldCreatePetImage = petProperties.threadType === 'lostPetThread'
    ? true
    : [true, false, false][Math.floor(Math.random() * 3)];
  let petPic;

  if (shouldCreatePetImage) {
    const petBreeds = petProperties.petSpecies === 'Cat'
      ? catBreeds
      : dogBreeds;
    const petBreedId = petBreeds.find((breed) => breed.name === petProperties.petBreed).imageId;
    const petPicUrl = petProperties.petSpecies === 'Cat'
      ? `https://cdn2.thecatapi.com/images/${petBreedId}.jpg`
      : `https://cdn2.thedogapi.com/images/${petBreedId}.jpg`;

    try {
      const response = await axios({ method: 'get', url: petPicUrl, responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');

      petPic = [{
        data: buffer,
        contentType: 'image/jpeg'
      }];
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log('Forbidden, but continuing on');
      } else {
        console.error(error);
      }
    }
  }

  await PetModel.create({
    _id: petProperties.petId,
    name: petProperties.petName,
    species: petProperties.petSpecies,
    breed: petProperties.petBreed,
    sex: petProperties.petSex,
    description: petProperties.petDescription,
    threadId: petProperties.threadId,
    threadType: petProperties.threadType,
    color: {
      dominantColor: petProperties.petDominantColor
    },
    ownerId: petProperties.ownerId,
    sizeCategory: petProperties.petSizeCategory,
    lastSeenTime: petProperties.lastSeenTime,
    lastSeenLocation: petProperties.lastSeenLocation,
    ...(petPic && { pic: petPic })
  });
  console.log('Create pet success');
}

async function createThread(threadProperties, users) {
  const petId = new mongoose.Types.ObjectId();

  await ThreadModel.create({
    _id: threadProperties.threadId,
    title: threadProperties.threadTitle,
    poster: threadProperties.poster,
    threadType: threadProperties.threadType,
    pet: petId,
    content: threadProperties.threadContent,
    comments: [],
    favoriteCount: threadProperties.threadFavoriteCount
  });
  console.log('Create thread success');

  await createPet({
    petId,
    petName: threadProperties.petName,
    petSpecies: threadProperties.petSpecies,
    petBreed: threadProperties.petBreed,
    petSex: threadProperties.petSex,
    petDescription: threadProperties.petDescription,
    petDominantColor: threadProperties.petDominantColor,
    petSizeCategory: threadProperties.petSizeCategory,
    threadId: threadProperties.threadId,
    threadType: threadProperties.threadType,
    ownerId: threadProperties.poster,
    lastSeenTime: new Date(threadProperties.lastSeenDate),
    lastSeenLocation: threadProperties.lastSeenLocation
  });

  const shouldCreateComment = [true, false][Math.floor(Math.random() * 2)];
  if (shouldCreateComment) {
    const commentId = new mongoose.Types.ObjectId();
    const content = [
      'Sending positive vibes your way.',
      'Good luck!',
      'Wishing you the best in the search.',
      'My thoughts are with you.',
      'Stay strong and keep searching!'
    ][Math.floor(Math.random() * 5)];
    const authorId = users.map((user) => user._id)[Math.floor(Math.random() * users.length)];
    const threadId = threadProperties.threadId;

    await createComment({ commentId, content, authorId, threadId });
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

dotenv.config({ path: '../../.env' });

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(async () => {
    console.log('Successfully connected to MongoDB!');

    await ThreadModel.deleteMany({});
    await PetModel.deleteMany({});
    await CommentModel.deleteMany({});
    console.log('Reset collection success');

    const userAndThreadIds = [];
    const threadFavoriteCounts = {};
    const users = await UserModel.find({});
    for (const user of users) {
      const threadIds = user.myThreads || [];
      userAndThreadIds.push(...threadIds.map((threadId) => ({
        userId: user._id,
        threadId
      })));

      const favoredThreads = user.favoredThreads || [];
      for (const threadId of favoredThreads) {
        if (threadId.toString() in threadFavoriteCounts) {
          threadFavoriteCounts[threadId.toString()]++;
        } else {
          threadFavoriteCounts[threadId.toString()] = 1;
        }
      }
    }

    for (const userAndThreadId of userAndThreadIds) {
      // new pet properties
      const petName = faker.person.firstName();
      const petSpecies = ['Cat', 'Dog'][Math.floor(Math.random() * 2)];
      const petBreed = petSpecies === 'Cat'
        ? catBreeds[Math.floor(Math.random() * catBreeds.length)].name
        : dogBreeds[Math.floor(Math.random() * dogBreeds.length)].name;
      const petSex = ['male', 'female', 'unknown'][Math.floor(Math.random() * 3)];
      const petDescription = `a friendly and ${faker.word.adjective()} ${petSpecies} with a ${faker.color.human()} coat`;
      const petDominantColor = {
        r: randomNumber(0, 255),
        g: randomNumber(0, 255),
        b: randomNumber(0, 255)
      };
      const petSizeCategory = [0, 1, 2][Math.floor(Math.random() * 3)];
      const lastSeenCity = faker.location.city();
      const lastSeenDate = faker.date.past().toLocaleDateString();
      const lastSeenLocation = {
        type: 'Point',
        coordinates: [randomNumber(-123.263754, -122.890771), randomNumber(49.241829, 49.266554)]
      };

      // new thread properties
      const titlePrefix = ['Help please!! ', 'Please Help! ', '救命!! ', ''][Math.floor(Math.random() * 4)];
      const titleSuffix = [
        ` ${Math.floor(Math.random() * 1000) + 1} furPoint wanted`,
        ''
      ][Math.floor(Math.random() * 2)];
      const threadType = ['lostPetThread', 'witnessThread'][Math.floor(Math.random() * 2)];
      const threadTitle = threadType === 'lostPetThread'
        ? `${titlePrefix}Lost ${petName} in ${lastSeenCity} on ${lastSeenDate}!${titleSuffix}`
        : `${titlePrefix}Saw a ${petSpecies} in ${lastSeenCity} on ${lastSeenDate}!${titleSuffix}`;
      const threadContent = threadType === 'lostPetThread'
        ? `${petName} is a ${petBreed} ${petSpecies} that went missing on ${lastSeenDate} near ${lastSeenCity}. It is ${petDescription}. If you have any information about ${petName}'s whereabouts, please contact us. We miss it dearly and want to bring it back home safely.`
        : `I believe I've found a ${petBreed} ${petSpecies} on ${lastSeenDate} near ${lastSeenCity}. It is ${petDescription}. Message me if you want more info.`;
      const threadFavoriteCount = userAndThreadId.threadId.toString() in threadFavoriteCounts
        ? threadFavoriteCounts[userAndThreadId.threadId.toString()]
        : 0;

      await createThread({
        threadId: userAndThreadId.threadId,
        poster: userAndThreadId.userId,
        petName,
        petSpecies,
        petBreed,
        petSex,
        petDescription,
        petDominantColor,
        petSizeCategory,
        lastSeenDate,
        lastSeenLocation,
        threadTitle,
        threadType,
        threadContent,
        threadFavoriteCount
      }, users);
    }
  })
  .catch((err) => {
    console.error(err);
  });
