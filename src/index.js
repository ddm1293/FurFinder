import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import threadRouter from './routers/threadRouter.js';
import userRouter from './routers/userRouter.js';
import commentRouter from './routers/commentRouter.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/thread', threadRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);

app.listen(3001, () => console.log('SERVER STARTED!!!'));

mongoose.connect('mongodb+srv://makemake1293:Oops1293!@furfinder.61gyfvo.mongodb.net/?retryWrites=true&w=majority');
