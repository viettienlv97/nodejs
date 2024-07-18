import Hotel from '../model/Hotel.js'
import { responseFail, responseSuccess } from '../utils/response.js'
import { normalizeText, normalizeName } from 'normalize-text'

const getCities = (_, res) => {
  Hotel.find().then((hotels) => {
    const cities = []

    hotels.forEach((h) => {
      const cityIndex = cities.findIndex((c) => c.name === h.city)
      if (cityIndex === -1) {
        cities.push({
          name: h.city,
          count: 1
        })
      } else {
        cities[cityIndex].count += 1
      }
    })

    responseSuccess(res, cities)
  })
}

const getTypes = (_, res) => {
  Hotel.find().then((hotels) => {
    const types = []

    hotels.forEach((h) => {
      const typeIndex = types.findIndex((type) => type.type === h.type)
      if (typeIndex === -1) {
        types.push({
          type: h.type,
          count: 1
        })
      } else {
        types[typeIndex].count += 1
      }
    })

    responseSuccess(res, types)
  })
}

const getFeatured = (_, res) => {
  Hotel.find().then((hotels) => {
    const featured = hotels.filter((h) => h.featured)

    responseSuccess(res, featured)
  })
}

const getAllHotel = (req, res) => {
  Hotel.find()
    .then((hotels) => responseSuccess(res, hotels))
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

const getHotelDetail = (req, res) => {
  const { hotelId } = req.params
  if (!hotelId) return responseFail(res, 404, 'Not found Hotel')

  Hotel.findById(hotelId)
    .then((hotel) => {
      if (!hotel) return responseFail(res, 404, 'Not found hotel')

      return responseSuccess(res, hotel)
    })
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

const getHotelDetailWithRoom = (req, res) => {
  const { hotelId } = req.params

  Hotel.findById(hotelId)
    .populate('rooms')
    .then((hotel) => responseSuccess(res, hotel))
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

const postSearchHotel = (req, res) => {
  const { destination, searchOption } = req.body
  if (!destination) return responseFail(res, 400, 'Missing destination param')

  const nDestination = normalizeName(
    normalizeText(destination).replace('đ', 'd')
  )

  Hotel.find({ city: nDestination })
    .populate('rooms')
    .then((hotels) => {
      let filtered
      if (searchOption.room) {
        filtered = hotels.filter((hotel) => {
          let count = 0
          hotel.rooms.forEach((room) => (count += room.roomNumbers.length))
          return count >= searchOption.room
        })
      }
      if (searchOption.minPrice) {
        filtered = filtered.filter(
          (hotel) => hotel.cheapestPrice >= searchOption.minPrice
        )
      }

      if (searchOption.maxPrice) {
        filtered = filtered.filter(
          (hotel) => hotel.cheapestPrice <= searchOption.maxPrice
        )
      }

      if (searchOption.adult || searchOption.children) {
        let peoples = (searchOption.adult ?? 0) + (searchOption.children ?? 0)
        filtered = filtered.filter((hotel) => {
          hotel.rooms.forEach((room) => {
            room.roomNumbers.forEach(
              (r) => (peoples = peoples - room.maxPeople)
            )
          })
          return peoples <= 0
        })
      }

      if (filtered) return responseSuccess(res, filtered)

      responseSuccess(res, hotels)
    })
    .catch((err) => {
      console.log(err)
      responseFail(res, 500, 'Server error')
    })
}

export default {
  getCities,
  getAllHotel,
  getTypes,
  getFeatured,
  getHotelDetail,
  getHotelDetailWithRoom,
  postSearchHotel
}
