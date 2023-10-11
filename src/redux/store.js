import { configureStore } from '@reduxjs/toolkit'
import utilsReducer from './reducers/utilsSlice'
import postReducer from './reducers/postSlice'

export default configureStore({
  reducer: {
    utils: utilsReducer,
    post: postReducer
  },
})