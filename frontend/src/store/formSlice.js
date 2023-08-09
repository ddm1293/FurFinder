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
                state.catBreeds = action.payload.catBreeds.map((breed) => {
                    let catBreedUrl;
                    if (breed.name === 'Bengal') {
                        catBreedUrl = 'https://cdn2.thecatapi.com/images/O3btzLlsO.png';
                    } else if (breed.name === 'Devon Rex') {
                        catBreedUrl = 'https://cdn2.thecatapi.com/images/4RzEwvyzz.png';
                    } else if (breed.name === 'European Burmese') {
                        catBreedUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/British_burmese_-_Andel_Alois_at_Cat_show.JPG';
                    } else if (breed.name === 'Korat') {
                        catBreedUrl = 'https://cdn2.thecatapi.com/images/DbwiefiaY.png';
                    } else if (breed.name === 'Malayan') {
                        catBreedUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a1/BrownVarientAsianCat.JPG';
                    } else {
                        catBreedUrl = `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`;
                    }

                    return { name: breed.name, url: catBreedUrl };
                });
                state.dogBreeds = action.payload.dogBreeds.map((breed) => {
                    let dogBreedUrl;
                    if (breed.name === 'American Pit Bull Terrier') {
                        dogBreedUrl = 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg';
                    } else if (breed.name === 'Great Pyrenees') {
                        dogBreedUrl = 'https://cdn2.thedogapi.com/images/B12uzg9V7.png';
                    } else if (breed.name === 'Saint Bernard') {
                        dogBreedUrl = 'https://cdn2.thedogapi.com/images/_Qf9nfRzL.png';
                    } else {
                        dogBreedUrl = `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
                    }

                    return { name: breed.name, url: dogBreedUrl };
                });
            })
            .addCase(getCatDogDataAsync.rejected, (state, action) => {
            });
    }
});

export default formSlice.reducer;
