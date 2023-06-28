import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createThreadAsync = createAsyncThunk(
  'thread/create',
  async (threadData) => {
    // convert threadData object to FormData
    const formData = new FormData();
    for (const key in threadData) {
      if (threadData.hasOwnProperty(key)) {
        if (key === 'pet-pic') {
          // append the file to the FormData object
          formData.append(key, threadData[key][0].originFileObj, threadData[key][0].originFileObj.name);
        } else {
          // append other fields to the FormData object
          formData.append(key, threadData[key]);
        }
      }
    }

    const response = await axios.post('http://localhost:3001/thread', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
