import { useLocation } from 'react-router-dom'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Dropdown } from 'primereact'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import store from '../../store/store'

const AppBreadcrumb = (props) => {
  const location = useLocation()
  const khoaThiId = useSelector((item) => item.khoaThi.id)
  const khoaThis = useSelector((item) => item.khoaThi.datas)
  const getKhoaThi = async () => {
    const rs = await khoaThiProcessor.getAll()
    store.dispatch(setKhoaThis(rs))
    if (rs.length > 0) {
      store.dispatch(setKhoaThiId(rs[0].id))
    }
  }

  useEffect(() => {
    if (location.pathname === '/') getKhoaThi()
  }, [location.pathname])

  const { routes, onMenuButtonClick } = props
  const activeRoute = routes.filter((route) => {
    return route.path === location.pathname
  })

  let items

  if (location.pathname === '/') {
    items = [{ label: 'Trang chủ' }]
  } else if (!activeRoute.length) {
    items = [{ label: '' }, { label: '' }]
  } else {
    items = [{ label: activeRoute[0].parentName }, { label: activeRoute[0].name }]
  }

  const isStatic = () => {
    return props.menuMode === 'static'
  }
  const { pinActive } = props
  const isDesktop = () => {
    return window.innerWidth > 991
  }
  return (
    <div className="layout-breadcrumb-container pt-0 flex flex-column">
      <div className={`${!isDesktop() ? 'pl-0' : pinActive ? 'pl-5' : 'pl-2'} w-full`}>
        <img src="/assets/header.jpg" className="w-full" alt="" />
      </div>
      <div className="layout-breadcrumb-left-items w-full">
        {isStatic() && (
          <button type="button" className="menu-button p-link" onClick={onMenuButtonClick}>
            <i className="pi pi-bars" />
          </button>
        )}

        <div className="flex justify-content-between w-full">
          <BreadCrumb model={items} className="layout-breadcrumb" />
          {location.pathname === '/' && (
            <Dropdown
              onChange={(e) => store.dispatch(setKhoaThiId(e.value))}
              className="mr-5"
              optionValue="id"
              optionLabel="name"
              value={khoaThiId}
              options={khoaThis}
              tooltip="Khoá thi"
              tooltipOptions={{ position: 'top' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AppBreadcrumb
