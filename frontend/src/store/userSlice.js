// using redux to mock the user data

import { createSlice } from "@reduxjs/toolkit";
import { userMock } from "../mocks/userMock";

const userSlice = createSlice({
    name: "user",
    initialState: userMock,
    reducers: {}
});

export default userSlice.reducer;