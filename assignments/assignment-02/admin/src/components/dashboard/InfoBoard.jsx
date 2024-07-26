import { User, ShoppingCart, DollarSign, CreditCard } from 'react-feather'
import Info from './Info.jsx'

const summary = [
  {
    name: 'Users',
    value: 100,
    icon: {
      border: 'border-danger',
      bg: 'bg-danger-subtle',
      com: (
        <User
          size={16}
          color='red'
        />
      )
    }
  },
  {
    name: 'Orders',
    value: 100,
    icon: {
      border: 'border-success',
      bg: 'bg-success-subtle',
      com: (
        <ShoppingCart
          size={16}
          color='green'
        />
      )
    }
  },
  {
    name: 'Earnings',
    value: '$100',
    icon: {
      border: 'border-warning',
      bg: 'bg-warning-subtle',
      com: (
        <DollarSign
          size={16}
          color='#ffc107'
        />
      )
    }
  },
  {
    name: 'Balance',
    value: '$100',
    icon: {
      border: 'border-primary',
      bg: 'bg-primary-subtle',
      com: (
        <CreditCard
          size={16}
          color='blue'
        />
      )
    }
  }
]

const InfoBoard = () => {
  return (
    <div className='m-4'>
      <div className='row'>
        {summary.map((item, index) => {
          return (
            <div
              className='col-3'
              key={`${index}_${item.name}`}
            >
              <Info item={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default InfoBoard
