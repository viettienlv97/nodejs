import EditProductForm from '../components/addproduct/EditProductForm'
const AddProduct = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h3>Edit Product</h3>
      <EditProductForm />
    </div>
  )
}

export default AddProduct
