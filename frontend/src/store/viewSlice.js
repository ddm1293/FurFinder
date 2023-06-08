import { createSlice } from '@reduxjs/toolkit'
import { threads } from '../mocks/viewMock'

const initialState = {
  threads: threads,
  filteredThreads: []
}

const viewSlice = createSlice({
  name: 'viewthread',
  initialState,
  reducers: {
    searchThread: (state, action) => {
      state.filteredThreads = state.threads.filter((thread) => thread.title === thread.payload)
    },
    filterThread: (state, action) => {
      state.filteredThreads = state.threads.filter((thread) => thread.type === action.payload)
    }
  }
})
export default viewSlice.reducer
export const {
  searchThread,
  filterThread
} = viewSlice.actions