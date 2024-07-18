import { createSlice } from '@reduxjs/toolkit'
// import { getItem } from '../utils/storage.js'

const hotelListSlice = createSlice({
  name: 'hotelList',
  initialState: null,
  reducers: {
    setAuth: (_, action) => action.payload,
    clearAuth: () => null
  }
})

export const hotelListActions = hotelListSlice.actions
export const hotelListReducer = hotelListSlice.reducer
