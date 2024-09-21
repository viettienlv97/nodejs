import ProductsList from '../components/products/ProductsList'

const Products = () => {
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
      <ProductsList isEdit={false} />
    </>
  )
}

export default Products
