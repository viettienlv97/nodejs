const Info = ({ item }) => {
  return (
    <div className='border border-1 rounded-3 position-relative p-2 shadow'>
      <div className=' upper text-gray fw-bold'>{item.name}</div>
      <div className='fs-4 mt-3 mb-4'>{item.value}</div>
      <div
        className={`${item.icon.bg} ${item.icon.border} position-absolute bottom-0 end-0 border border-1 d-flex align-items-center p-1 m-2 rounded-1`}
      >
        {item.icon.com}
      </div>
    </div>
  )
}

export default Info
