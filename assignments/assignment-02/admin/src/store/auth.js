import { createSlice } from '@reduxjs/toolkit'
import {
  getItem,
  setItem,
  removeItem
} from '../../../client/src/utils/storage.js'

const authSlice = createSlice({
  name: 'auth',
  initialState: getItem('user', null),
  reducers: {
    setAuth: (_, { payload }) => {
      setItem('user', payload)
      return payload
    },
    clearAuth: () => {
      removeItem('user')
      return null
    }
  }
})

export const { setAuth, clearAuth } = authSlice.actions
export const authReducer = authSlice.reducer
