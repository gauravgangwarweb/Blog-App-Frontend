import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: "651c39c6887fa2d9d4d00c39"
  },
  reducers: {
    setPost: (state, link) => {
      state.post = link.payload
    }
  },
})

export const { setPost } =  postSlice.actions

export default postSlice.reducer