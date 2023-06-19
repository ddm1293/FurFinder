import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import threadRouter from '../routers/threadRouter.js';
import userRouter from '../routers/userRouter.js';
import commentRouter from '../routers/commentRouter.js';

export function createServer(port, dbUrl) {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/thread', threadRouter);
  app.use('/user', userRouter);
  app.use('/comment', commentRouter);

  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`SERVER STARTED!!! port: ${port}`);
      resolve(server);
    });

    mongoose.connect(dbUrl).then(() => {
      console.log('Successfully connected to MongoDB!');
    })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        server.close(() => {
          reject(err);
        });
      });
  });
}
