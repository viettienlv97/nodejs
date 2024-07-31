export const getDate = (date) => {
  const yyyy = date.getFullYear()
  let mm = date.getMonth() + 1
  let dd = date.getDate()
  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`
  return `${dd}/${mm}/${yyyy}`
}

export const countDate = ({ startDate, endDate }) => {
  const timeDifference = endDate.getTime() - startDate.getTime()
  const count = timeDifference / (1000 * 3600 * 24) + 1

  return count
}

export const mapHotelData = (data, rooms) => {
  const photos = data.images
    .split(',')
    .map((photo) => (photo ? photo.trim() : undefined))
    .filter((p) => p)
  data.photos = photos
  data.rooms = rooms.map((room) => room.value)
  data.featured = data.feature === 'true' ? true : false
  data.distance = +data.distance
  data.cheapestPrice = +data.price
  data.desc = data.description
}

export const mapRoomData = (data) => {
  data.roomNumbers = data.rooms
    .split(',')
    .map((number) => (number ? number.trim() : undefined))
    .filter((n) => n)
  data.price = +data.price
  data.maxPeople = +data.maxPeople
  data.desc = data.description
}
