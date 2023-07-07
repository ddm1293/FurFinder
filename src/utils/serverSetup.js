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
import petRouter from '../routers/petRouter.js';
import { PetModel } from '../models/petModel.js';

export function createServer(port, dbUrl) {
  const app = express();

  app.use(express.json());

  app.use(credentials);
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use('/auth', authRouter);
  // app.use(verifyJWT); // add this middleware wherever a route needs to be protected
  app.use('/user', userRouter);
  app.use('/thread', threadRouter);
  app.use('/comment', commentRouter);
  app.use('/pet', petRouter);

  // app.put('/testUpdatePet', async (req, res) => {
  //   console.log(req.body);
  //   const petId = req.body._id;
  //   const newSpecies = req.body.species;
  //
  //   console.log(`Updating petId ${petId} with species ${newSpecies}`);
  //
  //   const updatedPet = await PetModel.findByIdAndUpdate(petId, { species: newSpecies }, { new: true });
  //
  //   console.log('UpdatedPet from backend: ', updatedPet);
  //
  //   res.json(updatedPet);
  // });

  app.put('/testUpdatePet', async (req, res) => {
    console.log(req.body);
    const petId = req.body._id;
    const petData = req.body.data;

    console.log(`Updating petId ${petId} with species ${petData}`);

    const updatedPet = await PetModel.findByIdAndUpdate(petId, petData, { overwriteDiscriminatorKey: true, new: true });

    console.log('UpdatedPet from backend: ', updatedPet);

    res.json(updatedPet);
  });

  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`SERVER STARTED!!! port: ${port}`);
      resolve(server);
    });

    mongoose.connect(dbUrl
    ).then(() => {
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
