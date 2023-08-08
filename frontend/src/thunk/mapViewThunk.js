import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchPetFromThread } from './thunkHelper'
import { getApiUrl } from '../utils/getApiUrl'

export const fetchDataPointsAsync = createAsyncThunk(
  'mapViewSlice/fetchDataPoints',
  async () => {
    const res = await axios.get(getApiUrl('/thread/getAllThreads'));
    const threads = res.data.threads;
    return await fetchPetFromThread(threads);
  }
)
