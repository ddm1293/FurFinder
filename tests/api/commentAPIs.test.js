import request, {} from 'supertest';
import { createServer } from '../../src/utils/serverSetup.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

describe('Test comment APIs', () => {
  let server;

  beforeAll(async () => {
    server = await createServer(process.env.TEST_PORT, process.env.MONGODB_TESTING_STRING);
  });

  let userId;
  let thread;

  beforeEach(async () => {
    userId = await createUser({
      username: 'UserForTest',
      email: 'email@test.com',
      password: 'testing'
    });
    thread = await createThread({
      title: 'Test title',
      poster: userId,
      pet: {
        name: 'test_pet',
        sex: 'unknown',
        lastSeenTime: '2023-06-01T10:00:00.000Z'
      },
      comments: [],
      content: 'test content',
      archived: false
    });
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

  describe('GET /comment/:id', () => {
    it('should get the comment successfully', async () => {
      const comment = await createComment({
        content: 'I saw your cat !!!',
        author: { id: userId },
        threadId: thread
      });
      const commentId = comment.commentId._id;
      const res = await request(server).get(`/comment/${commentId}`);
      expect(res.status).toBe(200);
      expect(res.body.comment._id).toBe(commentId);
      expect(res.body.comment.content).toBe('I saw your cat !!!');
    });

    it('should get an error when the comment does not exist', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get(`/comment/${id}`);
      expect(res.status).toBe(404);
      expect(res.body.error.errorType).toBe('CommentDoesNotExistException');
    });
  });

  describe('GET /comment/:threadId/getComments', () => {
    it('should get the comments by a given threadId successfully', async () => {
      const first = await createComment({
        content: 'first test !!!',
        author: { id: userId },
        threadId: thread
      });

      const second = await createComment({
        content: 'second test !!!',
        author: { id: userId },
        threadId: thread
      });

      const res = await request(server).get(`/comment/${thread}/getComments`);
      console.log(res.body);
      expect(res.status).toBe(200);
      expect(res.body.comments).toEqual([first.commentId._id, second.commentId_id]);
    });

    it('should fail to get the comments by a non-existent thread', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get(`/comment/${id}/getComments`);
      console.log(res.body);
      expect(res.status).toBe(404);
      expect(res.body.error.errorType).toBe('ThreadDoesNotExistException');
    });
  });

  // it should create a comment under a thread successfully
  describe('POST /comment/:threadId/create', () => {
    it('should create a comment under a thread successfully', async () => {
      const body = {
        content: 'I saw it.',
        author: { id: userId },
        threadId: thread
      };
      const res = await request(server).post(`/comment/${thread}/create`).send(body).set('Accept', 'application/json');
      expect(res.status).toBe(201);
      expect(res.body.commentCreated.poster).toBe(userId);
      expect(res.body.commentId.content).toBe('I saw it.');
      expect(res.body.commentCreated._id).toBe(thread);
    });
  });

  // it should successfully update a comment
  describe('PUT /comment/:id', () => {
    it('should successfully update a comment', async () => {
      const comment = await createComment({
        content: 'test !!!',
        author: { id: userId },
        threadId: thread
      });
      const commentid = comment.commentId._id;
      const prevRes = await request(server).get(`/comment/${comment.commentId._id}`);
      expect(prevRes.body.comment.content).toBe('test !!!');

      const body = {
        content: 'Updated test',
        author: { id: userId },
        threadId: thread
      };
      const res = await request(server).put(`/comment/${commentid}`).send(body).set('Accept', 'application/json');
      console.log(res);
      expect(res.status).toBe(200);
      // expect(res.body.comment.content).toBe('Updated test');
      // expect(res.body.comment.threadId).toBe(prevRes.body.comment.threadId);
    });

    it('should fail if the comment does not exist', async () => {
      const id = new mongoose.Types.ObjectId();
      const body = {
        content: 'Update test',
        author: { id: userId },
        threadId: thread
      };

      const res = await request(server).put(`/comment/${id}`).send(body).set('Accept', 'application/json');
      expect(res.status).toBe(404);
      expect(res.body.error.errorType).toBe('CommentDoesNotExistException');
    });
  });

  describe('PATCH /comment/:id', () => {
    it('should successfully patch a thread', async () => {
      const comment = await createComment({
        content: 'comment to test !!!',
        author: { id: userId },
        threadId: thread
      });
      const commentid = comment.commentId._id;
      const prevRes = await request(server).get(`/comment/${commentid}`);
      expect(prevRes.status).toBe(200);
      // expect(prevRes.body.comment.content).toBe('comment to test !!!');

      const res = await request(server)
        .patch(`/comment/${commentid}`)
        .send({ content: 'Updated Content' })
        .set('Accept', 'application/json');
      console.log(res);
      expect(res.status).toBe(200);
      // expect(res.body.patched.content).toBe('Updated Content');
      // expect(res.body.patched._id).toBe(prevRes.body.comment._id);
    });

    it('should fail to patch if the comment does not exist', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server)
        .patch(`/comment/${id}`)
        .send({ content: 'Updated Content' })
        .set('Accept', 'application/json');
      expect(res.status).toBe(404);
      expect(res.body.error.errorType).toBe('CommentDoesNotExistException');
    });
  });

  describe('DELETE /comment/:id', () => {
    it('should successfully delete a comment', async () => {
      const comment = await createComment({
        content: 'comment to test !!!',
        author: { id: userId },
        threadId: thread
      });
      const commentid = comment.commentId._id;
      const prevRes = await request(server).get(`/comment/${commentid}`);
      console.log(prevRes);
      expect(prevRes.status).toBe(200);
      // expect(prevRes.body.comment._id).toBe(commentid);
      // expect(prevRes.body.comment.content).toBe('comment to test !!!');

      const res = await request(server).delete(`/comment/${commentid}`);
      console.log(res);
      expect(res.status).toBe(204);

      const postRes = await request(server).get(`/comment/${commentid}`);
      console.log(postRes);
      expect(postRes.status).toBe(404);
      expect(postRes.body.error.errorType).toBe('CommentDoesNotExistException');
    });

    it('should fail to delete if the comment does not exist', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).delete(`/comment/${id}`);
      expect(res.status).toBe(404);
      expect(res.body.error.errorType).toBe('CommentDoesNotExistException');
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

  async function createComment(body) {
    const res = await request(server).post(`/comment/${body.threadId}/create`).send(body).set('Accept', 'application/json');
    return res.body;
  }
});
