import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import formReducer from "./formSlice";
import threadReducer from "./threadSlice";
import commentReducer from "./commentSlice";

const store = configureStore({
    // naming the threads with "s" to avoid some IDE error message
    reducer: {
        user: userReducer,
        form: formReducer,
        threads: threadReducer,
        comments: commentReducer,
    },
});

export default store;
