import { Link } from 'react-router-dom'
import Search from './Search'
import { useSelector } from 'react-redux'

const Header = () => {
  //hooks
  const authUser = useSelector((state) => state.auth)

  //render
  return (
    <header className='bg-secondary position-relative pt-3 mb-5'>
      <div className='container text-light pb-10'>
        <h1>A lifetime of discounts? It's Genius.</h1>
        <p>
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free account
        </p>
        {!authUser && (
          <Link to={'/login'}>
            <button className='bg-primary border-none text-light p-2'>
              Sign in / Register
            </button>
          </Link>
        )}
      </div>
      <Search />
    </header>
  )
}

export default Header
