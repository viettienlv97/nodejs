import AddProductForm from '../components/addproduct/AddProductForm'

const AddProduct = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h3>Add Product</h3>
      <AddProductForm />
    </div>
  )
}

export default AddProduct
