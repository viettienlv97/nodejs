import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/HomePage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<p className='text-light'>Loading ...</p>}>
        <HomePage />
      </Suspense>
    )
  },
  {
    path: '/search',
    element: (
      <Suspense fallback={<p className='text-light'>Loading ...</p>}>
        <SearchPage />
      </Suspense>
    )
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
