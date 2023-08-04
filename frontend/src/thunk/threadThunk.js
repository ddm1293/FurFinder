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
        const value = threadData[key] !== undefined ? threadData[key] : "";
        if (key === 'pic') {
          // append multiple files to the FormData object
          for (const file of value) {
            formData.append(key, file.originFileObj, file.originFileObj.name);
          }
        } else if (key === 'lastSeenLocation' || key === 'homeAddress') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'dominantColor' || key === 'secondaryColor') {
          formData.append(key, JSON.stringify(value));
        } else {
          // append other fields to the FormData object
          formData.append(key, value);
        }
      }
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
