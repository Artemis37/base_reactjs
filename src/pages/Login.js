import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useSelector } from 'react-redux'
import userProcessor from '../processor/userProcessor'
import { appName } from '../constant/config'

export default function Login() {
  const [user, setUser] = useState({ userName: '', password: '' })
  const toast = useSelector((store) => store.notify.toast)
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = async () => {
    if (!user.password || !user.userName) {
      toast({ type: 'error', message: 'Tài khoản mật khẩu không được để trống' })
      return
    }
    const rs = await userProcessor.login(user)
    if (!rs.isSuccess) toast({ type: 'error', message: rs.data })
  }
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <>
      <div className="login-body">
        <div className="flex flex-column align-items-center w-full">
          {/* <img src="/assets/header.jpg" className="w-full" alt="" /> */}
          <div className="login-panel p-fluid px-0" style={{ paddingTop: 150 }}>
            <div className="flex flex-column align-items-center">
              <div className="flex align-items-center mb-5 logo-container w-20rem">
                <img src="/assets/icon/icon.png" className="login-logo" alt="login-logo" />
                <h3 className="mt-3 pl-2 app-name">{appName}</h3>
              </div>
              <div className="w-20rem">
                <div className="form-container">
                  <span className="p-input-icon-left">
                    <i className="pi pi-envelope" />
                    <InputText
                      value={user.userName}
                      type="text"
                      placeholder="Tài khoản"
                      name="userName"
                      onChange={handleChange}
                      onKeyDown={onPressEnter}
                    />
                  </span>
                  <span className="p-input-icon-left">
                    <i className="pi pi-key" />
                    <InputText
                      value={user.password}
                      type="password"
                      placeholder="Mật khẩu"
                      name="password"
                      onChange={handleChange}
                      onKeyDown={onPressEnter}
                    />
                  </span>
                </div>
              </div>
              <div className="button-container w-20rem">
                <Button type="button" label="Đăng nhập" onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
