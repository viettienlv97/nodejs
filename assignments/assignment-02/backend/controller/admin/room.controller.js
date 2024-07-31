import Room from '../../model/Room.js'
import Transaction from '../../model/Transaction.js'

import { responseSuccess, responseFail } from '../../utils/response.js'

const getAllRooms = (req, res) => {
  Room.find()
    .then((rooms) => responseSuccess(res, rooms))
    .catch((err) => responseFail(res, 404, err?.message))
}

const getRoomDetail = (req, res) => {
  const { roomId } = req.params
  if (!roomId) return responseFail(res, 400, 'Missing roomId param')

  Room.findById(roomId)
    .then((room) =>
      room
        ? responseSuccess(res, room)
        : responseFail(res, 404, 'Not found room')
    )
    .catch((err) => responseFail(res, 500, err.message))
}

const postNewRoom = (req, res) => {
  const { title, desc, roomNumbers, price, maxPeople } = req.body

  const newRoom = new Room({
    title,
    desc,
    roomNumbers,
    price,
    maxPeople,
    createdAt: new Date()
  })
  newRoom
    .save()
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 404, err?.message))
}

const postUpdateRoom = (req, res) => {
  const { roomId } = req.params
  const { title, desc, roomNumbers, price, maxPeople } = req.body

  Room.updateOne(
    { _id: roomId },
    {
      $set: {
        title,
        desc,
        roomNumbers,
        price,
        maxPeople,
        updatedAt: new Date()
      }
    }
  )
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 500, err.message))
}

const deleleRoom = (req, res) => {
  const { roomId } = req.params

  if (!roomId) return responseFail(res, 400, 'Missing roomId param')

  Transaction.find()
    .then((trans) => {
      const filtered = trans.filter((tran) => {
        const room = tran.rooms.find((room) => room._id === roomId)
        if (!room || room.roomNumbers.length === 0) return false
        return true
      })

      if (filtered.length > 0) throw new Error('This room has Transaction.')

      return Room.findByIdAndDelete(roomId)
    })
    .then((result) => responseSuccess(res, result))
    .catch((err) => responseFail(res, 404, err?.message))
}

export default {
  getAllRooms,
  getRoomDetail,
  postNewRoom,
  deleleRoom,
  postUpdateRoom
}
