import apis from '../apis/apis'
import store from '../store/store'
import { setToken } from '../utils/security'
import history from '../history'
import { isLoading, isNotLoading } from '../store/reducer/loading'

const userProcessor = {}
userProcessor.getByTruong = async () => {
  const rs = await apis.User.GetAllTruongUser({})
  return rs.isSuccess ? rs.data : []
}
userProcessor.getByKhoaThi = async () => {
  const rs = await apis.User.GetAll({})
  return rs.isSuccess ? rs.data : []
}
userProcessor.login = async (data) => {
  const rs = await apis.User.Login({
    method: 'post',
    data,
    auth: false,
  })
  if (!rs.isSuccess) {
    return rs
  }
  setToken(rs.data.token)
  const link = await userProcessor.getUserActions()
  await userProcessor.getUserInfo()
  history.push(
    !!history.location.state && history.location.state[0] !== '/login'
      ? history.location.state[0]
      : link,
  )
  store.dispatch(isNotLoading())
  return rs
}

userProcessor.getUserInfo = async () => {
  const rs = await apis.User.UserInfo({})
  if (rs.isSuccess) store.dispatch(setUserInfo(rs.data))
}

userProcessor.resetPassword = async (id) => {
  const rs = await apis.User.ResetPassword({
    param: `/${id}`,
    method: 'post',
    responseType: 'text',
  })
  return rs
}

userProcessor.getUserActions = async () => {
  store.dispatch(isLoading())
  const rs = await apis.User.Permission({})
  if (rs.isSuccess) store.dispatch(setActions(rs.data))
  store.dispatch(isNotLoading())
  return '/'
}

userProcessor.getByPermission = async (code) => {
  const rs = await apis.User.GetByPermission({ param: `/${code}` })
  return rs.isSuccess ? rs.data : []
}
userProcessor.getAll = async () => {
  const rs = await apis.User.GetAll({})
  return rs.isSuccess ? rs.data : []
}

userProcessor.changePassword = async (data) => {
  const rs = await apis.User.ChangePassword({ method: 'post', responseType: 'text', data })
  return rs
}

userProcessor.upsert = async (data) => {
  let rs
  if (data.id) {
    rs = await apis.User.Update({ method: 'post', responseType: 'text', data })
  } else {
    rs = await apis.User.Create({ method: 'post', responseType: 'text', data })
  }
  return rs
}

userProcessor.delete = async (id) => {
  const rs = await apis.User.Delete({ method: 'post', responseType: 'text', param: `/${id}` })
  return rs
}

export default userProcessor
