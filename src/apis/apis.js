import request from './request'
import controllers from '../constant/controllers'
import { apiUrl } from '../constant/config'

const apis = {}

const getUrl = (url) => `${apiUrl}${url}`
controllers.forEach((controller) => {
  apis[controller.name] = {}
  controller.actions.forEach((action) => {
    apis[controller.name][action.name] = async ({
      method = 'get',
      param = null,
      auth = true,
      data = null,
      formData = null,
      callback = null,
      responseType = 'json',
    }) => {
      let url = getUrl(`${controller.name}/${action.url}`)
      if (param) {
        url += param
      }
      const rs = await request({ url, method, auth, data, callback, responseType, formData })
      return rs
    }
  })
})

export default apis
