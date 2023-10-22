import { appName } from '../../constant/config'

const AppFooter = () => {
  return (
    <div className="layout-footer">
      <div className="footer-logo-container align-items-center">
        <img id="footer-logo" src="/assets/icon/icon.png" alt="atlantis-layout" />
        {<span className="app-name">{appName}</span>}
        {
          // <span className="app-name">Phần mềm quản lý văn bằng</span>
        }
      </div>
      <span className="copyright">&#169; Một sản phẩm của VNPT</span>
    </div>
  )
}

export default AppFooter
