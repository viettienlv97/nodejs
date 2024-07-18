import { createSlice } from '@reduxjs/toolkit'
import { getItem } from '../utils/storage.js'

const authSlice = createSlice({
  name: 'auth',
  initialState: getItem('user', null),
  reducers: {
    setAuth: (_, action) => action.payload,
    clearAuth: () => null
  }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
