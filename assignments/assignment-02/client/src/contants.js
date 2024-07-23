export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST'
}

export const CITIES = [
  { name: 'Ha Noi', image: 'hanoi.jpg' },
  { name: 'Ho Chi Minh', image: 'hcm.jpg' },
  { name: 'Da Nang', image: 'danang.jpg' }
]

export const TYPES = [
  {
    name: 'Hotels',
    type: 'hotel',
    image: './images/type_1.webp'
  },
  {
    name: 'Apartments',
    type: 'apartment',
    image: './images/type_2.jpg'
  },
  {
    name: 'Resorts',
    type: 'resort',
    image: './images/type_3.jpg'
  },
  {
    name: 'Villas',
    type: 'villa',
    image: './images/type_4.jpg'
  },
  {
    name: 'Cabins',
    type: 'cabin',
    image: './images/type_5.jpg'
  }
]

export const TRANSACTION_STATUS = {
  BOOKED: 'Booked',
  CHECKIN: 'Checkin',
  CHECKOUT: 'Checkout'
}

export const API_URL = import.meta.env.VITE_API_URL
