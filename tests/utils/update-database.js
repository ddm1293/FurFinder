import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserModel } from '../../src/models/userModel.js';
import { ThreadModel } from '../../src/models/threadModel.js';
import { PetModel } from '../../src/models/petModel.js';
import { CommentModel } from '../../src/models/commentModel.js';
import { faker } from '@faker-js/faker';
import axios from 'axios';

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
  await PetModel.create({
    _id: petProperties.petId,
    name: petProperties.petName,
    species: petProperties.petSpecies,
    breed: petProperties.petBreed,
    type: 'lost-pet-thread', // it appears that every single pet type is 'lost-pet-thread' so far?
    description: petProperties.petDescription,
    threadId: petProperties.threadId,
    ownerId: petProperties.ownerId,
    sex: petProperties.petSex,
    lastSeenTime: petProperties.lastSeenTime
  });
  console.log('Create pet success');
}

async function createThread(threadProperties) {
  const petId = new mongoose.Types.ObjectId();

  await ThreadModel.create({
    _id: threadProperties.threadId,
    title: `${threadProperties.titlePrefix}Lost ${threadProperties.petName} in ${threadProperties.lastSeenLocation} on ${threadProperties.lastSeenDate}!${threadProperties.titleSuffix}`,
    poster: threadProperties.poster,
    kind: threadProperties.kind,
    pet: petId,
    content: `${threadProperties.petName} is a ${threadProperties.petBreed} ${threadProperties.petSpecies} that went missing on ${threadProperties.lastSeenDate} near ${threadProperties.lastSeenLocation}. It is ${threadProperties.petDescription}. If you have any information about ${threadProperties.petName}'s whereabouts, please contact us. We miss it dearly and want to bring it back home safely.`,
    comments: []
  });
  console.log('Create thread success');

  await createPet({
    petId,
    petName: threadProperties.petName,
    petSpecies: threadProperties.petSpecies,
    petBreed: threadProperties.petBreed,
    petSex: threadProperties.petSex,
    petDescription: threadProperties.petDescription,
    threadId: threadProperties.threadId,
    ownerId: threadProperties.poster,
    lastSeenTime: new Date(threadProperties.lastSeenDate)
  });

  // TODO: Perhaps refactor updatePet in case a thread document is delete without deleting the corresponding pet?
}

dotenv.config({ path: '../../.env' });

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(async () => {
    console.log('Successfully connected to MongoDB!');

    const users = await UserModel.find({});
    const catApiRes = await axios.get('https://api.thecatapi.com/v1/breeds');
    const dogApiRes = await axios.get('https://api.thedogapi.com/v1/breeds');
    const catBreeds = catApiRes.data.map((breed) => breed.name);
    const dogBreeds = dogApiRes.data.map((breed) => breed.name);

    for (const user of users) {
      const threadIds = user.myThreads || [];

      for (const threadId of threadIds) {
        const foundThread = await ThreadModel.findById(threadId);

        // new/updated properties
        const petName = faker.person.firstName();
        const petSpecies = ['Cat', 'Dog'][Math.floor(Math.random() * 2)]; // should be capitalized for discriminator
        const petBreed = petSpecies === 'Cat'
          ? catBreeds[Math.floor(Math.random() * catBreeds.length)]
          : dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
        const petSex = ['male', 'female', 'unknown'][Math.floor(Math.random() * 3)];
        const petDescription = `a friendly and ${faker.word.adjective()} ${petSpecies} with a ${faker.color.human()} coat`;
        const lastSeenLocation = faker.location.city();
        const lastSeenDate = faker.date.past().toLocaleDateString();
        const titlePrefix = ['Help please!! ', 'Please Help! ', '救命!! ', ''][Math.floor(Math.random() * 4)];
        const titleSuffix = [
          ` ${Math.floor(Math.random() * 1000) + 1} furPoint wanted`,
          ''
        ][Math.floor(Math.random() * 2)];
        const threadKind = ['LostPetThread', 'WitnessThread'][Math.floor(Math.random() * 2)];
        const threadTitle = threadKind === 'LostPetThread'
          ? `${titlePrefix}Lost ${petName} in ${lastSeenLocation} on ${lastSeenDate}!${titleSuffix}`
          : `${titlePrefix}Saw a ${petSpecies} in ${lastSeenLocation} on ${lastSeenDate}!${titleSuffix}`;
        const threadContent = threadKind === 'LostPetThread'
          ? `${petName} is a ${petBreed} ${petSpecies} that went missing on ${lastSeenDate} near ${lastSeenLocation}. It is ${petDescription}. If you have any information about ${petName}'s whereabouts, please contact us. We miss it dearly and want to bring it back home safely.`
          : `I believe I've found a ${petBreed} ${petSpecies} on ${lastSeenDate} near ${lastSeenLocation}. It is ${petDescription}. Message me if you want more info.`;
        const threadComment = [
          'I hope you find it soon!',
          'Sending positive vibes your way.',
          'Good luck!',
          'Wishing you the best in the search.',
          'My thoughts are with you.',
          'Don\'t lose hope. Many lost pets are reunited with their owners.',
          'Stay strong and keep searching!'
        ][Math.floor(Math.random() * 7)];

        if (foundThread) {
          // update foundThread
          await ThreadModel.findByIdAndUpdate(foundThread._id, {
            title: threadTitle,
            kind: threadKind,
            content: threadContent,
            archived: false
          }, { overwriteDiscriminatorKey: true, new: true });
          console.log('Update thread success');

          // update or create pet
          const foundPet = await PetModel.findById(foundThread.pet);
          if (foundPet) {
            await PetModel.findByIdAndUpdate(foundPet._id, {
              name: petName,
              species: petSpecies,
              breed: petBreed,
              sex: petSex,
              description: petDescription,
              lastSeenTime: new Date(lastSeenDate)
            }, { overwriteDiscriminatorKey: true, new: true });
            console.log('Update pet success');
          } else {
            await createPet({
              petId: foundThread.pet,
              petName,
              petSpecies,
              petBreed,
              petSex,
              petDescription,
              threadId,
              ownerId: user._id,
              lastSeenTime: new Date(lastSeenDate)
            });
          }

          // update comments
          for (const commentId of foundThread.comments) {
            const foundComment = await CommentModel.findById(commentId);

            if (foundComment) {
              await CommentModel.findByIdAndUpdate(
                foundComment._id, { content: threadComment }
              );
              console.log('Update comment success');
            } else {
              await createComment({
                commentId,
                content: threadComment,
                authorId: user._id,
                threadId
              });
            }
          }
        } else {
          await createThread({
            threadId,
            poster: user._id,
            petName,
            petSpecies,
            petBreed,
            petSex,
            petDescription,
            lastSeenLocation,
            lastSeenDate,
            titlePrefix,
            titleSuffix,
            kind: threadKind
          });
        }
      }
    }
  })
  .catch((err) => {
    console.error(err);
  });
