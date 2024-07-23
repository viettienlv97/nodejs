import { createSlice } from '@reduxjs/toolkit'

const bookedRoomsSlice = createSlice({
  name: 'bookedRooms',
  initialState: [],
  reducers: {
    setBookedRooms: (_, { payload }) => payload
  }
})

export const bookedRoomsActions = bookedRoomsSlice.actions
export const bookedRoomsReducer = bookedRoomsSlice.reducer
