import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: null,
    avatar: null,
    favoredThreads: null,
    myThreads: null,
    accessToken: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username, avatar, favoredThreads, myThreads, accessToken } = action.payload;

            return { id, username, avatar, favoredThreads, myThreads, accessToken };
        },
        logoutUser: (state) => {
            return initialState;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
