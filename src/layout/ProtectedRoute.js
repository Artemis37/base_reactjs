import { Redirect, Route, withRouter } from 'react-router'
import { useSelector } from 'react-redux'
import { getToken } from '../utils/security'

function ProtectedRoute(props) {
  const permissions = useSelector((state) => state.user.permissions)
  const { route } = props
  const isLogin = getToken()
  const havePermission =
    !permissions ||
    !route.component.props.requirePermission ||
    permissions.find((item) => item.code === route.component.props.requirePermission) !== undefined
  return (
    <Route
      path={route.path}
      exact={route.exact}
      permission={route}
      render={() =>
        !isLogin ? (
          <Redirect from={route.path} to={{ pathname: '/login', state: route.path }} />
        ) : !havePermission ? (
          <Redirect from={route.path} to={{ pathname: '/accessDenied', state: route.path }} />
        ) : (
          route.component
        )
      }
    />
  )
}

export default withRouter(ProtectedRoute)
