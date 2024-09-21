import { createSlice } from '@reduxjs/toolkit'
import { User } from './interface'
import { setItem, removeItem, getItem } from '../utils/storage'
import constant from '../utils/constant'

const initialState: User | null = getItem(constant.USER, null)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (_, actions) => {
      setItem(constant.USER, actions.payload)
      return actions.payload
    },
    clearAuth: () => {
      removeItem(constant.USER)
      return null
    }
  }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer
