import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header>
        <nav>
          <Link to={'/'}>Enter User</Link> | <Link to={'/users'}>Users</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
