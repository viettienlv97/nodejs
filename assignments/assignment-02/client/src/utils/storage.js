export const getItem = (key, initial) => {
  const item = localStorage.getItem(key)
  return JSON.parse(item) ?? initial
}

export const setItem = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload))
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
}
