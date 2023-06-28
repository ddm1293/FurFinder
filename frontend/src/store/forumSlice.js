import { createSlice } from '@reduxjs/toolkit'
import { threads } from '../mocks/forumMock'
import { searchThreadsAsync } from '../thunk/searchThunk'

const initialState = {
  searchResults: [],
  threads: threads,
  filteredThreads: []
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
  },
  extraReducers(builder){
    builder.addCase(searchThreadsAsync.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    })
  }
})
export default forumSlice.reducer
