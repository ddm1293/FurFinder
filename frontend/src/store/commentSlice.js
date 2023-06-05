import { createSlice } from "@reduxjs/toolkit";

/** mock user */
const createComment = (comment) => {
    const time = new Date().toISOString().substring(0, 19);
    return {
        id: 1,
        body: comment,
        userID: "123",
        userName: "User" + Math.random().toString(36).substring(2, 5), // generate random id
        createdAt: time.substring(0, 10) + " " + time.substring(11, 19)
    }
}

const commentSlice = createSlice({
    name: "comments",
    initialState: [],
    reducers: {
        addComment: (state, action) => {
            const newComment = createComment(action.payload);
            state.push(newComment);
        },
    }
});

export default commentSlice.reducer;
export const {addComment} = commentSlice.actions;