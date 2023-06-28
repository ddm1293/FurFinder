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
    const searched = res.data.result;
    const petPromises = searched.map((thread) => axios.get(`http://localhost:3001/pet/${thread.pet}`))
    const petResponses = await Promise.all(petPromises);
    const pets = petResponses.map((res) => res.data);
    const threads = searched.map((thread, index) => ({
        ...thread,
        pet: pets[index]
    }))
    return threads;
  }
)
