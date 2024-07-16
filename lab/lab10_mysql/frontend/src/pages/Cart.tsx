import Cartlist from '../components/cart/Cartlist'

const Cart = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}
      >
        <h2>Cart</h2>
      </div>
      <Cartlist />
    </>
  )
}

export default Cart
