import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchPetFromThread } from './thunkHelper'

export const fetchDataPointsAsync = createAsyncThunk(
  'mapViewSlice/fetchDataPoints',
  async () => {
    const res = await axios.get('/thread/getAllThreads');
    const threads = res.data.threads;
    return await fetchPetFromThread(threads);
  }
)
