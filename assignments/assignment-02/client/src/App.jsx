import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import router from './router/Router.jsx'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
