import request from 'supertest';
import { app } from '../../src/index.js';
describe('Test thread APIs', () => {
  describe('GET /thread/:id', () => {
    it('should retrieve a thread', (done) => {
      request(app).get(`/thread/6485808f56ac54964adb7b31`).expect(200, done);
    });
  });
});
