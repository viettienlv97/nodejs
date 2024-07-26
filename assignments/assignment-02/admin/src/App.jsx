import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import router from './router/Router.jsx'
import store from './store/store.js'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
