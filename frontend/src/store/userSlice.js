import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    avatar: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { username, avatar } = action.payload;

            return { username, avatar };
        },
        logoutUser: (state) => {
            return initialState;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
