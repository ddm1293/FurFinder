// using redux to mock the form data

import { createSlice } from "@reduxjs/toolkit";
import { formMock } from "../mocks/formMock";

const formSlice = createSlice({
    name: "form",
    initialState: formMock,
    reducers: {}
});

export default formSlice.reducer;