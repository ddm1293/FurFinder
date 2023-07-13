import { createSlice } from '@reduxjs/toolkit'
import { fetchDataPointsAsync } from '../thunk/mapViewThunk'

const initialState = {
  dataPoints: []
}

const mapViewSlice = createSlice({
  name: 'mapView',
  initialState,
  extraReducers(builder){
    builder
      .addCase(fetchDataPointsAsync.fulfilled, (state, action) => {
        state.dataPoints = action.payload;
      })
  }
})

export default mapViewSlice.reducer
