import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const list = [
  {
    name: 'Shop',
    link: '/'
  },
  {
    name: 'Products',
    link: '/products'
  },
  {
    name: 'Cart',
    link: '/cart'
  },
  {
    name: 'Orders',
    link: '/orders'
  },
  {
    name: 'Add Product',
    link: '/add-product'
  },
  {
    name: 'Admin Products',
    link: '/admin'
  }
]

const Navbar = () => {
  return (
    <header>
      <nav>
        <ul className={styles.navList}>
          {list.map((item) => {
            return (
              <li key={item.name}>
                <NavLink
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : undefined}`
                  }
                  to={item.link}
                >
                  {item.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
