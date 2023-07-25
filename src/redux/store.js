import { configureStore } from '@reduxjs/toolkit'
import utilsReducer from './reducers/utilsSlice'

export default configureStore({
  reducer: {
    utils: utilsReducer,
  },
})