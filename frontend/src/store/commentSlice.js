import { createSlice} from '@reduxjs/toolkit'
import { addCommentAsync, deleteCommentAsync, getCommentsAsync } from '../thunk/commentThunk'

const initialState = {
  commentList: [],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.commentList.push(action.payload);
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        state.commentList = state.commentList.filter((item) => item.id !== action.payload);
      })
  }
})

export default commentSlice.reducer