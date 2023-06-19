import { createSlice} from '@reduxjs/toolkit'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {},
})

export default commentSlice.reducer
// export const { addComment } = commentSlice.actions