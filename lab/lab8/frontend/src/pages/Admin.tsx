import ProductsList from '../components/products/ProductsList'

const Admin = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}
      >
        <h2>Products</h2>
      </div>
      <ProductsList isEdit={true} />
    </>
  )
}

export default Admin
