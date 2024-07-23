import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import { authReducer } from './auth.js'
import { hotelListReducer } from './searchedList.js'
import { bookingReducer } from './booking.js'
import { bookedRoomsReducer } from './bookedRooms.js'

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  // console.log('dispatching', action)
  // console.log('previous state', storeAPI.getState())
  let result = next(action)
  // console.log('next state', storeAPI.getState())
  return result
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotelList: hotelListReducer,
    booking: bookingReducer,
    bookedRooms: bookedRoomsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware)
})

export default store
