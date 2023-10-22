import history from '../history'
import { getToken, removeToken } from '../utils/security'

const request = async ({
  url,
  method = 'get',
  auth = false,
  data = null,
  formData = null,
  callback = null,
  responseType = 'json',
}) => {
  let response
  const headers = formData
    ? new Headers()
    : {
        'Content-Type': 'application/json; charset=UTF-8',
      }
  let paramsObj = ''
  if (auth) {
    const token = getToken()
    if (formData) {
      headers.append('Authorization', `Bearer ${token}`)
    } else {
      headers.Authorization = `Bearer ${token}`
    }
  }
  if (data) {
    paramsObj = formData ? data : JSON.stringify(data)
  }
  const requestOptions = { method, headers }
  if (method !== 'get') {
    requestOptions.body = paramsObj
  }
  await fetch(url, requestOptions)
    .then(async (rs) => {
      if (rs.status === 200) {
        return rs[responseType]()
      }
      if (rs.status === 401) {
        removeToken()
        if (history.location.pathname) {
          history.push('/login', [history.location.pathname])
        } else history.replace()
      }
      const text = await rs.text()
      throw text || 'Đã có lỗi xảy ra'
    })
    .then((rs) => {
      if (callback) callback(rs)
      response = { isSuccess: true, data: rs }
    })
    .catch((ex) => {
      response = { isSuccess: false, data: ex }
    })
  return response
}

export default request
