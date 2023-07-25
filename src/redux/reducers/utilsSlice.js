import { createSlice } from '@reduxjs/toolkit'

export const utilsSlice = createSlice({
  name: 'utils',
  initialState: {
    login: false,
    register: true
  },
  reducers: {
    login: (state, link) => {
      state.login = link.payload
    },
    register: (state) => {
        state.register = !state.register
    }
  },
})

export const { login, register } =  utilsSlice.actions

export default utilsSlice.reducer