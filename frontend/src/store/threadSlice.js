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
          .addCase(getThreadAsync.fulfilled, (state, action) => {
            const existingThread = state.threadList.find(thread => thread._id === action.payload.thread._id);

            if (existingThread) {
              state.threadList = state.threadList.map(thread =>
                thread._id === action.payload.thread._id ? action.payload.thread : thread);
            } else {
              state.threadList.push(action.payload.thread);
            }
          })
          .addCase(deleteThreadAsync.fulfilled, (state, action) => {
              state.threadList = state.threadList.filter((thread) => thread.id !== action.payload);
          })
    },
});

export default threadSlice.reducer;
