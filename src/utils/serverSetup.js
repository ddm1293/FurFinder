import express from 'express';
import credentials from '../middleware/credentials.js';
import cors from 'cors';
import corsOptions from './corsOptions.js';
import cookieParser from 'cookie-parser';
import verifyJWT from '../middleware/verifyJwt.js';
import authRouter from '../routers/authRouter.js';
import threadRouter from '../routers/threadRouter.js';
import userRouter from '../routers/userRouter.js';
import commentRouter from '../routers/commentRouter.js';
import mongoose from 'mongoose';

export function createServer(port, dbUrl) {
  const app = express();

  app.use(express.json());

  app.use(credentials);
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use('/auth', authRouter);
  // app.use(verifyJWT);
  app.use('/thread', threadRouter);
  app.use('/user', userRouter);
  app.use('/comment', commentRouter);

  // const server = app.listen(port, () => console.log('SERVER STARTED!!!'));
  //
  // mongoose.connect(dbUrl);
  //
  // const db = mongoose.connection;
  //
  // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  // db.once('open', function () {
  //   console.log('Successfully connected to MongoDB!');
  // });
  //
  // return server;
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`SERVER STARTED!!! port: ${port}`);
      resolve(server);
    });

    mongoose.connect(dbUrl).then(() => {
      console.log('Successfully connected to MongoDB!');
    }).catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      server.close(() => {
        reject(err);
      });
    });
  });
}
