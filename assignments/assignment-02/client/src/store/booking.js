import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  info: null,
  payment: null,
  dateRanges: {
    startDate: null,
    endDate: null
  },
  dateCount: 0,
  hotel: null,
  hotelRooms: [],
  total: 0
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addInfo: (state, { payload }) => {
      state.info = payload
    },
    setDateRanges: (state, { payload }) => {
      state.dateRanges = payload
    },
    setDateCount: (state, { payload: count }) => {
      state.dateCount = count
    },
    setHotel: (state, { payload }) => {
      state.hotel = payload
    },
    setHotelRooms: (state, { payload }) => {
      state.hotelRooms = payload
    },
    countTotal: (state) => {
      const currentState = current(state)

      const roomPrice = currentState.hotelRooms.reduce((prev, current) => {
        return prev + current.price * current.roomNumbers.length
      }, 0)
      const total = state.dateCount * roomPrice
      state.total = total
    },
    setPayment: (state, { payload }) => {
      state.payment = payload
    }
  }
})

export const bookingActions = bookingSlice.actions
export const bookingReducer = bookingSlice.reducer
