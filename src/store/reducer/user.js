import { createSlice } from '@reduxjs/toolkit'

const userReducer = createSlice({
  name: 'user',
  initialState: { info: {}, permissions: [] },
  reducers: {
    setUserInfo: (state, action) => {
      return { ...state, info: action.payload }
    },
    setPermissions: (state, action) => {
      return { ...state, actions: action.payload }
    },
  },
})
const { actions, reducer } = userReducer
export const { setUserInfo, setPermissions } = actions
export default reducer
