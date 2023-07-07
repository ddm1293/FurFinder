import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: null,
    avatar: null,
    favoredThreads: null,
    myThreads: null,
    accessToken: null,
    email: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username, avatar, favoredThreads, myThreads, accessToken, email } = action.payload;

            return { id, username, avatar, favoredThreads, myThreads, accessToken, email };
        },
        setAccessToken: (state, action) => {
            return { ...state, accessToken: action.payload };
        },
        logoutUser: (state) => {
            return initialState;
        },
        setAvatar: (state, action) => {
            return { ...state, avatar: action.payload };
        },
        setUserProfile: (state, action) => {
            const { username, email } = action.payload;
            return { username, email };
        }
    }
});

export const { setUser, setAccessToken, logoutUser, setAvatar, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
