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
      const threadId = await setUpAThread();
      const res = await request(server).get(`/thread/${threadId}`);
      expect(res.status).toBe(200);
      expect(res.body.thread._id).toBe(threadId);
    });
  });

  describe('POST /thread', () => {
    let userId;

    beforeAll(async () => {
      userId = await setUpAUser();
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
  });

  async function setUpAUser() {
    const body = {
      username: 'UserForTest',
      email: 'email@test.com',
      password: 'testing'
    };
    const res = await request(server).post('/user/auth/register').send(body).set('Accept', 'application/json');
    return res.body.newUser._id;
  }

  async function setUpAThread() {
    const body = {
      title: 'Help! my cat is lost',
      content: 'Please help me find my cat named maomao.',
      poster: await setUpAUser(),
      pet: {
        name: 'xiaomao',
        sex: 'male',
        lastSeenTime: '2023-06-01T10:00:00.000Z'
      }
    };

    const res = await request(server).post('/thread').send(body).set('Accept', 'application/json');
    return res.body.threadCreated._id;
  }
});
