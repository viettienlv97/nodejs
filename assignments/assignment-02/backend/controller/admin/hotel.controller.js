import Hotel from '../../model/Hotel.js'
import Transaction from '../../model/Transaction.js'
import { responseFail, responseSuccess } from '../../utils/response.js'

const postAddHotel = (req, res) => {
  const {
    name,
    type,
    city,
    address,
    distance,
    title,
    description,
    price,
    photos,
    rooms,
    feature
  } = req.body

  const hotel = new Hotel({
    name,
    title,
    type,
    city,
    address,
    distance,
    desc: description,
    cheapestPrice: price,
    photos,
    rooms,
    featured: feature,
    rating: 4
  })
  hotel
    .save()
    .then((result) => responseSuccess(res, result))
    .catch((err) => {
      console.log('postAddHotel', err)
      responseFail(res, 404, 'Error')
    })
}

const getHotels = (req, res) => {
  Hotel.find()
    .then((hotels) => responseSuccess(res, hotels))
    .catch((err) => {
      console.log('getHotels', err)
      responseFail(res, 404, 'Cannot get Hotels')
    })
}

const deleteById = (req, res) => {
  const { hotelId } = req.params
  if (!hotelId) return responseFail(res, 400, 'Missing hotelId param')
  let deleteHotel
  Hotel.findById(hotelId)
    .then((hotel) => {
      if (!hotel) throw new Error('Not found hotel')

      deleteHotel = hotel
      return Transaction.find({ hotel: hotelId })
    })
    .then((transactions) => {
      if (transactions.length === 0) return deleteHotel.deleteOne()
      else throw new Error('Hotel has transaction')
    })
    .then((result) => responseSuccess(res, result))
    .catch((err) => {
      responseFail(res, 404, err?.message)
    })
}

export default { deleteById, getHotels, postAddHotel }
