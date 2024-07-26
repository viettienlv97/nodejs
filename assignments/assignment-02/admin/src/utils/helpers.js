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
