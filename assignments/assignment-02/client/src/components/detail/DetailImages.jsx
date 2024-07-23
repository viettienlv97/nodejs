const DetailImages = ({ detail }) => {
  return (
    <div className='row mt-3'>
      {detail.photos.map((photo, idx) => {
        return (
          <div
            className='col-4 mb-4'
            key={idx}
          >
            <img
              src={photo}
              alt=''
              height={300}
              className='w-100'
            />
          </div>
        )
      })}
    </div>
  )
}

export default DetailImages
