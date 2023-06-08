import { createSlice } from '@reduxjs/toolkit'
import { threads } from '../mocks/forumMock'

const initialState = {
  threads: threads,
  filteredThreads: []
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    searchThread: (state, action) => {
      state.filteredThreads = state.threads.filter((thread) => thread.title === thread.payload)
    },
    filterThread: (state, action) => {
      if (action.payload === 'all') {
        state.filteredThreads = state.threads
      } else {
        state.filteredThreads = state.threads.filter((thread) => thread.type === action.payload)
      }
    }
  }
})
export default forumSlice.reducer
export const {
  searchThread,
  filterThread
} = forumSlice.actions