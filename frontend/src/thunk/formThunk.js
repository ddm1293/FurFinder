import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCatDogDataAsync = createAsyncThunk(
  'get',
  async () => {
    try {
      const catApiRes = await axios.get('https://api.thecatapi.com/v1/breeds');
      const dogApiRes = await axios.get('https://api.thedogapi.com/v1/breeds');

      return { catBreeds: catApiRes.data, dogBreeds: dogApiRes.data };
    } catch (e) {
      console.log(e);
    }
  }
);
