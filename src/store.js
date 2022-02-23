import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import loginButtonSlice from './features/loginButton/loginButtonSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    loggedIn: loginButtonSlice
  },
})