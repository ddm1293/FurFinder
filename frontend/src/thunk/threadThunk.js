import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createThreadAsync = createAsyncThunk(
  'thread/create',
  async (threadData) => {
    // convert threadData object to FormData
    // TODO: investigate why when only input pet name and pet species/breed this won't work
    const formData = new FormData();
    for (const key in threadData) {
      if (threadData.hasOwnProperty(key)) {
        if (key === 'pic') {
          // append multiple files to the FormData object
          for (const file of threadData[key]) {
            formData.append(key, file.originFileObj, file.originFileObj.name);
          }
        } else if (key === 'lastSeenLocation') {
          formData.append(key, JSON.stringify(threadData[key]));
        } else {
          // append other fields to the FormData object
          formData.append(key, threadData[key]);
        }
      }
    }
    console.log('see result');
    for (const pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const response = await axios.post('/thread', formData);
    console.log('response', response.data.threadCreated);
    return response.data.threadCreated;
  }
);

export const getThreadAsync = createAsyncThunk(
  'thread/get',
  async (threadId) => {
    const response = await axios.get(`/thread/${threadId}`);
    // console.log('response', response.data);
    return response.data;
  }
);

export const deleteThreadAsync = createAsyncThunk(
  'thread/delete',
  async (threadId) => {
    await axios.delete(`/thread/${threadId}`);
    return threadId;
  }
);

export const updateThreadAsync = createAsyncThunk(
  'thread/update',
  async ({ threadId, updateData }) => {
    // console.log('threadID from thunk: ', threadId);
    // console.log('updateData from thunk: ', updateData);
    const response = await axios.put(`/thread/${threadId}`, updateData);
    return response.data.updated;
  }
);
