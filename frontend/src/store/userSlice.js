import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: null,
    favoredThreads: null,
    myThreads: null,
    accessToken: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username, favoredThreads, myThreads, accessToken } = action.payload;

            return { id, username, favoredThreads, myThreads, accessToken };
        },
        setAccessToken: (state, action) => {
            return { ...state, accessToken: action.payload };
        },
        logoutUser: (state) => {
            return initialState;
        }
    }
});

export const { setUser, setAccessToken, logoutUser } = userSlice.actions;
export default userSlice.reducer;
