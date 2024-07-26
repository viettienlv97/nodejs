import Transaction from '../model/Transaction.js'
import Room from '../model/Room.js'
import { responseSuccess, responseFail } from '../utils/response.js'
import { Types } from 'mongoose'

const getAllRooms = (req, res) => {
  Room.find()
    .then((rooms) => responseSuccess(res, rooms))
    .catch((err) => {
      console.log('getAllRooms', err)
      responseFail(res, 404, 'Error')
    })
}

const getAvailableRoomsByDate = (req, res) => {
  const { hotelId, startDate, endDate } = req.body

  const start = new Date(startDate)
  const end = new Date(endDate)

  // console.log(start - end)

  Transaction.find({
    hotel: hotelId,
    $or: [
      { startDate: { $gte: start, $lte: end } },
      { endDate: { $gte: start, $lte: end } },
      {
        $and: [
          {
            startDate: { $lte: start }
          },
          {
            endDate: { $gte: end }
          }
        ]
      }
    ]
  })
    .select('rooms')
    .then((transactions) => {
      if (transactions.length === 0) return responseSuccess(res, [])

      let allRooms = []
      transactions.forEach((tran) => (allRooms = [...allRooms, ...tran.rooms]))

      responseSuccess(res, allRooms)
    })
}

export default { getAvailableRoomsByDate, getAllRooms }
