import { Button } from 'primereact/button'
import { appName } from '../constant/config'
import history from '../history'

export default function AccessDenied() {
  return (
    <div className="exception-body accessdenied">
      <div className="exception-panel">
        <h3>Truy cập bị từ chối</h3>
        <p>Bạn không có quyền vào trang nay.</p>
        <Button type="button" label="Trở lại trang chủ" onClick={() => history.push('/')} />
      </div>
      <div className="exception-footer align-items-center">
        <img src="/assets/icon/icon.png" className="exception-logo" alt="exception-logo" />
        <h4 className="app-name">{appName}</h4>
      </div>
    </div>
  )
}
