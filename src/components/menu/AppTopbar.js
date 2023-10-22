import { classNames } from 'primereact/utils'
import AppMenu from './AppMenu'
import history from '../../history'
import { appName } from '../../constant/config'
import ChangePassword from './ChangePassword'

const AppTopbar = (props) => {
  const {
    onMenuButtonClick,
    items,
    menuMode,
    colorScheme,
    menuActive,
    activeInlineProfile,
    onSidebarMouseOver,
    onSidebarMouseLeave,
    onToggleMenu,
    onMenuClick,
    onRootMenuItemClick,
    onMenuItemClick,
    onChangeActiveInlineMenu,
    topbarMenuActive,
    onTopbarItemClick,
  } = props
  return (
    <>
      <div className="layout-topbar">
        <div className="layout-topbar-left">
          <button type="button" className="topbar-menu-button p-link" onClick={onMenuButtonClick}>
            <i className="pi pi-bars" />
          </button>

          <button type="button" className="logo p-link" onClick={() => history.push('/')}>
            <img src="/assets/icon/icon.png" alt="logo" />
          </button>

          <b className="ml-2">{appName}</b>
        </div>

        <AppMenu
          model={items}
          menuMode={menuMode}
          colorScheme={colorScheme}
          menuActive={menuActive}
          activeInlineProfile={activeInlineProfile}
          onSidebarMouseOver={onSidebarMouseOver}
          onSidebarMouseLeave={onSidebarMouseLeave}
          toggleMenu={onToggleMenu}
          onChangeActiveInlineMenu={onChangeActiveInlineMenu}
          onMenuClick={onMenuClick}
          onRootMenuItemClick={onRootMenuItemClick}
          onMenuItemClick={onMenuItemClick}
        />

        <div className="layout-topbar-right">
          <ul className="layout-topbar-right-items">
            <li
              id="profile"
              className={classNames('profile-item', {
                'active-topmenuitem': topbarMenuActive,
              })}
            >
              <button type="button" className="p-link" onClick={onTopbarItemClick}>
                <img src="/assets/layout/images/avatar.png" alt="profile" />
              </button>

              <ul className="fadeInDown">
                <li role="menuitem">
                  <button type="button" className="p-link" onClick={() => history.push('/logout')}>
                    <i className="pi pi-fw pi-sign-out" />
                    <span>Logout</span>
                  </button>
                  <ChangePassword />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AppTopbar
