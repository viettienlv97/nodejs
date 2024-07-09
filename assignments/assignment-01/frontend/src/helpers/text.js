export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str
  }
  const truncated = str.substr(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  // If there's no space, return the truncated string as is.
  if (lastSpaceIndex === -1) {
    return truncated
  }

  return truncated.substr(0, lastSpaceIndex) + '...'
}
