import request, {} from 'supertest';
import { createServer } from '../../src/utils/serverSetup.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

describe('Test thread APIs', () => {
  let server;

  beforeAll(async () => {
    server = await createServer(process.env.TEST_PORT, process.env.MONGODB_TESTING_STRING);
  });

  afterAll((done) => {
    mongoose.connection.close().then(() => {
      server.close(done);
    });
  });

  afterEach(async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    }
  });

  describe('GET /thread/:id', () => {
    it('should get an error when the thread does not exist', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get(`/thread/${id}`);
      expect(res.status).toBe(404);
      expect(res.body.error.errorType).toBe('ThreadDoesNotExistException');
    });

    it('should get the thread successfully', async () => {
      const threadId = await createThread({
        title: 'Help! my cat is lost',
        content: 'Please help me find my cat named maomao.',
        poster: await createUser({
          username: 'UserForTest',
          email: 'email@test.com',
          password: 'testing'
        }),
        pet: {
          name: 'xiaomao',
          sex: 'male',
          lastSeenTime: '2023-06-01T10:00:00.000Z'
        }
      });
      const res = await request(server).get(`/thread/${threadId}`);
      expect(res.status).toBe(200);
      expect(res.body.thread._id).toBe(threadId);
    });
  });

  describe('GET /thread/userId/:id', () => {
    it('should get the threads by a given user successfully', async () => {
    });

    it('should fail to get the threads by a non-existent user', async () => {
    });
  });

  describe('GET /thread/getThreads', () => {
    it('should get first 10 threads', async () => {
    });

    it('should get the second 10 threads', async () => {
    });
  });

  describe('POST /thread', () => {
    let userId;

    beforeAll(async () => {
      userId = await createUser({
        username: 'UserForTest',
        email: 'email@test.com',
        password: 'testing'
      });
    });

    it('should create a thread successfully', async () => {
      const body = {
        title: 'Help! my cat is lost',
        content: 'Please help me find my cat named maomao.',
        poster: userId,
        pet: {
          name: 'xiaomao',
          sex: 'male',
          lastSeenTime: '2023-06-01T10:00:00.000Z'
        }
      };
      const res = await request(server).post('/thread').send(body).set('Accept', 'application/json');
      console.log(res.body);
      expect(res.body.petCreated.name).toBe('xiaomao');
      expect(res.body.petCreated.ownerId).toBe(userId);
      expect(res.body.threadCreated.poster).toBe(userId);
      expect(res.body.threadCreated.title).toBe('Help! my cat is lost');
      expect(res.body.threadCreated.pet).toBe(res.body.petCreated._id);
    });

    it('should be able to update user\'s thread history: creating two threads', async () => {
    });
  });

  describe('PUT /thread/:id', () => {
    it('should successfully update a thread', async () => {
    });

    it('should fail if the thread does not exist', async () => {

    });
  });

  describe('PATCH /thread/:id', () => {
    it('should successfully patch a thread', async () => {
    });

    it('should fail to patch if the thread does not exist', async () => {

    });
  });

  describe('PATCH /thread/archive/:id', () => {
    it('should successfully archive a thread', async () => {
    });

    it('should fail to archive if the thread does not exist', async () => {

    });
  });

  describe('DELETE /thread/:id', () => {
    it('should successfully delete a thread', async () => {
    });

    it('should fail to delete if the thread does not exist', async () => {

    });
  });

  async function createUser(body) {
    const res = await request(server).post('/user/auth/register').send(body).set('Accept', 'application/json');
    return res.body.newUser._id;
  }

  async function createThread(body) {
    const res = await request(server).post('/thread').send(body).set('Accept', 'application/json');
    return res.body.threadCreated._id;
  }
});
