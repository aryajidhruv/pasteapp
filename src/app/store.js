import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '../redux/pasteSlice'  // ✅ adjust path as per your folders

export const store = configureStore({
  reducer: {
    paste: pasteReducer,  // <- here is where you register your slice
  },
})
