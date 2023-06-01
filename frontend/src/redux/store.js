import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import formReducer from "./formSlice";
import threadReducer from "./threadSlice";

const store = configureStore({
    // naming the threads with "s" to avoid some IDE error message
    reducer: {
        user: userReducer,
        form: formReducer,
        threads: threadReducer,
    },
});

export default store;