import { createServer } from '../../src/utils/serverSetup.js';
import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

export async function setupTestServer() {
  return await createServer(process.env.TEST_PORT, process.env.MONGODB_TESTING_STRING);
}

export async function disconnectTestDatabase() {
  await mongoose.connection.close();
}

export async function createTestUser(server, userDetails) {
  const res = await request(server)
    .post('/user/auth/register')
    .send(userDetails)
    .set('Accept', 'application/json');
  return res.body.newUser._id;
}

export async function cleanupDatabaseCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}
