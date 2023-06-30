import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createThreadAsync = createAsyncThunk(
  'thread/create',
  async (threadData) => {
    const response = await axios.post('http://localhost:3001/thread', threadData);
    console.log('response', response.data.threadCreated);
    return response.data.threadCreated;
  }
);

export const getThreadAsync = createAsyncThunk(
  'thread/get',
  async (threadId) => {
    const response = await axios.get(`http://localhost:3001/thread/${threadId}`);
    // console.log('response', response.data);
    return response.data;
  }
);

export const deleteThreadAsync = createAsyncThunk(
  'thread/delete',
  async (threadId) => {
    await axios.delete(`http://localhost:3001/thread/${threadId}`);
    return threadId;
  }
);