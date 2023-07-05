import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { store } from '../store'

export const getThreadsAsync = createAsyncThunk(
  'forumSlice/getThreads',
  async ({page, limit}) => {
    console.log('see if getThreadsAsync is running')
      const { pages } = store.getState().forum;
      if (!pages[page]) {
        const res = await axios.get(`http://localhost:3001/thread/getThreads?page=${page}&limit=${limit}`)
        const threads = res.data.threads;
        const updated = await fetchPetFromThread(threads);
        return {page, threads: updated};
      } else {
        console.log('the pages existed route');
        return {page, threads: pages[page]}
      }
  }
)

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
    console.log('see result: ', searched);
    return await fetchPetFromThread(searched);
  }
)

const fetchPetFromThread = async (threads) => {
  const petPromises = threads.map((thread) => axios.get(`http://localhost:3001/pet/${thread.pet}`))
  const petResponses = await Promise.all(petPromises);
  const pets = petResponses.map((res) => res.data);
  return threads.map((thread, index) => ({
    ...thread,
    pet: pets[index]
  }));
}