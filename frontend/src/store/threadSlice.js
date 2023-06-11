// using redux to mock the thread data

import { createSlice } from "@reduxjs/toolkit";
import { threadMock } from "../mocks/threadMock";

const threadSlice = createSlice({
    name: "thread",
    initialState: threadMock,
    reducers: {}
});

export default threadSlice.reducer;