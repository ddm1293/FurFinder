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

  // afterEach(async () => {
  //   const collections = Object.keys(mongoose.connection.collections);
  //   for (const collectionName of collections) {
  //     const collection = mongoose.connection.collections[collectionName];
  //     await collection.deleteMany();
  //   }
  // });

  describe('GET /thread/:id', () => {
    it('should retrieve a thread', async () => {
      return request(server).get(`/thread/6485808f56ac54964adb7b31`).then((res) => {
        console.log(res.body);
      });
    });
  });
});
