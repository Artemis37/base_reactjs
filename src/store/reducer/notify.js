import { createSlice } from '@reduxjs/toolkit'

const notifyReducer = createSlice({
  name: 'notify',
  initialState: {
    toast: null,
    confirm: null,
  },
  reducers: {
    setToast: (state, action) => {
      return { ...state, toast: action.payload }
    },
    setConfirm: (state, action) => {
      return { ...state, confirm: action.payload }
    },
  },
})

const { actions, reducer } = notifyReducer
export const { setToast, setConfirm } = actions
export default reducer
