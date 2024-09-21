export const responseSuccess = (res, data) =>
  res.status(200).send({
    success: true,
    data
  })

export const responseFail = (res, status, message) =>
  res.status(status).send({
    success: false,
    message
  })
