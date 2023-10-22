import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Toast } from 'primereact'
import { setToast, setConfirm } from './store/reducer/notify'
import PublicLayout from './layout/PublicLayout'
import * as SecurityUtils from './utils/security'
import Login from './pages/Login'
import './css/all.scss'
import Loading from './pages/Loading'
import AccessDenied from './pages/AccessDenied'
import store from './store/store'

function App() {
  const loading = useSelector((state) => state.loading)
  const [visible, setVisible] = useState(false)
  const [confirmation, setConfirmation] = useState({ action: null, body: '' })
  const toast = useRef()
  const toggle = () => setVisible(!visible)

  useEffect(() => {
    store.dispatch(
      setToast((data) =>
        toast.current.show({
          severity: data.type,
          summary: data.message,
          detail: '',
          life: 800,
        }),
      ),
    )

    store.dispatch(
      setConfirm((data) => {
        toggle()
        if (data) setConfirmation(data)
      }),
    )

    // userProcessor.getUserInfo()
    // userProcessor.getUserActions()
  }, [])

  return (
    <>
      <Toast ref={toast} />
      {/* <Confirmation
        visible={visible}
        toggle={toggle}
        onClick={(confirm) => {
          if (confirm && confirmation.action) {
            confirmation.action()
          }
          toggle()
        }}
        header="Xác nhận"
        body={confirmation.body}
      /> */}

      {loading ? (
        <Loading />
      ) : (
        <Switch>
          <Route
            path="/logout"
            exact
            render={() => {
              SecurityUtils.removeToken()
              localStorage.clear()
              return <Redirect from="/logout" to="/login" />
            }}
          />
          <Route path="/accessDenied" component={AccessDenied} />
          <Route path="/login" component={Login} />
          <Route path="/" component={PublicLayout} />
        </Switch>
      )}
    </>
  )
}

export default withRouter(App)
