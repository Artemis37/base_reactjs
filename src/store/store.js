import { configureStore } from '@reduxjs/toolkit'
import loading from './reducer/loading'
import notify from './reducer/notify'
import user from './reducer/user'

const store = configureStore({
  reducer: {
    loading,
    notify,
    user
  },
})
export default store
