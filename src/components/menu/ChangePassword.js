import { useState } from 'react'
import { Button } from 'primereact/button'
import { useSelector } from 'react-redux'
import userProcessor from '../../processor/userProcessor'

const ChangePassword = () => {
  const [data, setData] = useState({})
  const [error, setError] = useState({})
  const toast = useSelector((store) => store.notify.toast)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const required = ['password', 'newPassword']
  const fields = ['password', 'newPassword']
  const name = { password: 'Mật khẩu cũ', newPassword: 'Mật khẩu mới' }
  const save = async () => {
    const newError = {}
    required.forEach((key) => {
      if (!fields.find((i) => key === i)) {
        return
      }
      if (data[key] === '' || data[key] === undefined || data[key] === null) {
        newError[key] = `Trường ${name[key] || key} là bắt buộc!`
      }
    })
    setError(newError)
    if (Object.keys(newError).length === 0) {
      const rs = await userProcessor.changePassword(data)
      toast({ type: rs.isSuccess ? 'success' : 'error', message: rs.data })
    }
  }
  const footer = () => (
    <div className="flex justify-content-end w-full mt-2">
      <Button
        label="Huỷ"
        className="p-button-secondary mr-2"
        onClick={() => {
          if (toggle) toggle()
        }}
      />
      <Button
        onClick={() => {
          save()
        }}
        label="Lưu"
      />
    </div>
  )
  return (
    <>
      <Modal width="60%" visible={visible} toggle={toggle} footer={footer}>
        <div className="mt-2">
          <Upsert
            header="Chỉnh sửa thông tin người dùng"
            values={data}
            setValues={setData}
            error={error}
            fields={fields}
            name={name}
            types={{ password: 'password', newPassword: 'password' }}
            required={required}
          />
        </div>
      </Modal>

      <button type="button" className="p-link" onClick={toggle}>
        <i className="pi pi-cog pi-fw" />
        <span>Đổi mật khẩu</span>
      </button>
    </>
  )
}
export default ChangePassword
