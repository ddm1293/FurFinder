import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: null,
    myThreads: [],
    accessToken: null,
    email: null,
    subscription: null
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username, myThreads, accessToken, email, subscription } = action.payload;

            return { id, username, myThreads, accessToken, email, subscription };
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
