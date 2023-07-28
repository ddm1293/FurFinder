import request, {} from 'supertest';
import dotenv from 'dotenv';
import {
  cleanupDatabaseCollections,
  createTestUser,
  disconnectTestDatabase,
  setupTestServer
} from '../utils/testUtils.js';
import {
  describe,
  expect,
  it,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll
} from '@jest/globals';

dotenv.config();

describe('Test thread APIs', () => {
  let server;
  let userId;

  beforeAll(async () => {
    server = await setupTestServer();
  });

  beforeEach(async () => {
    userId = await createTestUser(server, {
      username: 'UserForTest',
      email: 'email@test.com',
      password: 'testing'
    });
  });

  afterAll(async () => {
    await disconnectTestDatabase();
    server.close();
  });

  afterEach(cleanupDatabaseCollections);

  describe('GET /thread/search', () => {
    it('invalid query - empty keyword', async () => {
      const res = await request(server).get('/thread/search?keyword=');
      expect(res.status).toBe(400);
      expect(res.body.errors[0].msg).toBe('Keyword must not be empty');
      expect(res.body.errorType).toBe('InvalidQueryException');
    });

    it('invalid query - has searchOn without keyword', async () => {
      const res = await request(server).get('/thread/search?searchOn=title');
      expect(res.status).toBe(400);
      expect(res.body.errorMessage).toContain('SearchOn should not exist when keyword does not exist');
      expect(res.body.errorType).toBe('InvalidQueryException');
    });

    it('invalid query - searchOn is not legal', async () => {
      const res = await request(server).get('/thread/search?keyword=Cat&searchOn=pet');
      expect(res.status).toBe(400);
      expect(res.body.errorMessage).toContain('Invalid or duplicate values in searchOn parameter');
      expect(res.body.errorType).toBe('InvalidQueryException');
      expect(res.body.errors[0].path).toBe('searchOn');
      expect(res.body.errors[0].value).toBe('pet');
    });

    it('invalid query - searchOn is duplicated', async () => {
      const res = await request(server).get('/thread/search?keyword=Cat&searchOn=title,title');
      expect(res.status).toBe(400);
      expect(res.body.errorMessage).toContain('Invalid or duplicate values in searchOn parameter');
      expect(res.body.errorType).toBe('InvalidQueryException');
      expect(res.body.errors[0].path).toBe('searchOn');
      expect(res.body.errors[0].value).toBe('title,title');
    });

    it('invalid query - threadType does not exist', async () => {
      const res = await request(server).get('/thread/search?keyword=Cat&searchOn=title');
      expect(res.status).toBe(400);
      expect(res.body.errorType).toBe('InvalidQueryException');
      expect(res.body.errors[0].path).toBe('threadType');
      expect(res.body.errorMessage).toContain('threadType must exist');
    });

    it('invalid query - threadType is not legal', async () => {
      const res = await request(server).get('/thread/search?keyword=Cat&searchOn=title&threadType=abc');
      expect(res.status).toBe(400);
      expect(res.body.errorType).toBe('InvalidQueryException');
      expect(res.body.errors[0].path).toBe('threadType');
      expect(res.body.errors[0].value).toBe('abc');
      expect(res.body.errorMessage).toContain('threadType can be either lostPetThread or witnessThread');
    });
  });
});
