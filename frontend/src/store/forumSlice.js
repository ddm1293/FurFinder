import { createSlice } from '@reduxjs/toolkit'
import { getThreadsAsync, searchThreadsAsync } from '../thunk/forumThunk'

const initialState = {
  pageSizeCard: 8,
  searchResults: [],
  pages: {},
  viewStatus: '',
  displayStatus: 'idle',
  error: null
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    clearSearchResults: (state, action) => {
      state.searchResults = [];
    },
    updateViewStatus: (state, action) => {
      state.viewStatus = action.payload;
    }
  },
  extraReducers(builder){
    builder
      .addCase(searchThreadsAsync.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    })
      .addCase(getThreadsAsync.pending, (state, action) => {
        state.displayStatus = 'loading';
      })
      .addCase(getThreadsAsync.fulfilled, (state, action) => {
        state.displayStatus = 'succeeded';
        state.pages[action.payload.page] = action.payload.threads;
      })
      .addCase(getThreadsAsync.rejected, (state, action) => {
        state.displayStatus = 'failed';
        state.error = action.error.message;
      })
  }
})
export default forumSlice.reducer
export const { clearSearchResults, updateViewStatus } = forumSlice.actions
