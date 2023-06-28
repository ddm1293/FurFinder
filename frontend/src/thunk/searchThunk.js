import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const searchThreadsAsync = createAsyncThunk(
  'forumSlice/searchThreads',
  async (params) => {
      const baseUrl = 'http://localhost:3001/thread/search';
      let url = new URL(baseUrl);
      for (const key in params) {
          if (params[key] !== undefined) {
              url.searchParams.append(key, params[key]);
          }
      }
      const searchUrl = url.toString();
      console.log(searchUrl);
      const res = await axios.get(searchUrl);
      console.log(res.data.result);
      return res.data.result;
  }
)
