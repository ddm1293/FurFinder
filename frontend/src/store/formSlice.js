import { createSlice } from "@reduxjs/toolkit";
import { getCatDogDataAsync } from '../thunk/formThunk';

const formSlice = createSlice({
    name: "form",
    initialState: {
        catBreeds: [],
        dogBreeds: [],
    },
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(getCatDogDataAsync.fulfilled, (state, action) => {
                state.catBreeds = action.payload.catBreeds.map((breed) => ({
                    name: breed.name, url: `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
                }));
                state.dogBreeds = action.payload.dogBreeds.map((breed) => ({
                    name: breed.name, url: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
                }));
            })
            .addCase(getCatDogDataAsync.rejected, (state, action) => {
            });
    }
});

export default formSlice.reducer;
