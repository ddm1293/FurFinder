import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,
    avatar: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { userName, avatar } = action.payload;

            state.userName = userName;
            state.avatar = avatar;
        },
        logoutUser: (state) => {
            state.username = null;
            state.avatar = null;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
