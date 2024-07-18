import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth.js'
import { hotelListReducer } from './searchedList.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotelList: hotelListReducer
  }
})

export default store
