import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getApiUrl } from '../utils/getApiUrl'

export const getCommentsAsync = createAsyncThunk(
  'GET_COMMENTS',
  async (threadID) => {
    try {
      const res = await axios.get(getApiUrl(`/comment/${threadID}/getComments`))
      return res.data.comments;
    } catch (e) {
      console.log(e)
    }
  }
)

export const addCommentAsync = createAsyncThunk(
  'POST_COMMENTS',
  async ({ threadID, newComment }) => {
    try {
      const res = await axios.post(getApiUrl(`/comment/${threadID}/create`), newComment);
      console.log(res);
      return res.data.commentCreated;
    } catch (e) {
      console.log(e);
    }
  }
)

export const deleteCommentAsync = createAsyncThunk(
  'DELETE_ITEM',
  async (comment) => {
    try {
      const res = await axios.delete(getApiUrl(`/comment/${comment._id}`));
      console.log(res, comment._id);
      return comment._id;
    } catch (e) {
      console.log(e);
    }
  }
)
