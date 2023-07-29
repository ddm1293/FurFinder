import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCommentsAsync = createAsyncThunk(
  'GET_COMMENTS',
  async (threadID) => {
    try {
      const res = await axios.get(`https://furfinder-server.onrender.com/comment/${threadID}/getComments`)
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
      const res = await axios.post(`https://furfinder-server.onrender.com/comment/${threadID}/create`, newComment);
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
      const res = await axios.delete(`https://furfinder-server.onrender.com/comment/${comment._id}`);
      console.log(res, comment._id);
      return comment._id;
    } catch (e) {
      console.log(e);
    }
  }
)
