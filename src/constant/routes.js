import Home from '../pages/Home'

const routes = [
  {
    path: '/',
    exact: true,
    requireLogin: true,
    component: <Home />,
  },
]
export default routes
