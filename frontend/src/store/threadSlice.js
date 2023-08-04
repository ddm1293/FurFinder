import { createSlice } from '@reduxjs/toolkit';
import { createThreadAsync, getThreadAsync, deleteThreadAsync } from '../thunk/threadThunk'

const threadSlice = createSlice({
    name: 'threads',
    initialState: { threadList: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(createThreadAsync.fulfilled, (state, action) =>{
              state.threadList.push(action.payload);
          })
          // .addCase(getThreadAsync.fulfilled, (state, action) => {
          //     state.threadList = state.threadList.map(thread =>
          //       thread.id === action.payload.id ? action.payload : thread);
          // })
          .addCase(getThreadAsync.fulfilled, (state, action) => {
            // check if the thread already exists in the state
            const existingThread = state.threadList.find(thread => thread._id === action.payload.thread._id);

            if (existingThread) {
              // if the thread exists, replace it
              state.threadList = state.threadList.map(thread =>
                thread._id === action.payload.thread._id ? action.payload.thread : thread);
            } else {
              // if the thread doesn't exist, add it
              state.threadList.push(action.payload.thread);
            }
          })
          .addCase(deleteThreadAsync.fulfilled, (state, action) => {
              state.threadList = state.threadList.filter((thread) => thread.id !== action.payload);
          })
    },
});

export default threadSlice.reducer;
