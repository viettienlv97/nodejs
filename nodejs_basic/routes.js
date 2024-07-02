const fs = require('fs')

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>Hello World!!</p>')
    res.end()
  } else if (url === '/test') {
    res.setHeader('Content-Type', 'text/html')
    res.write(`
      <html>
        <head>
          <title>Web server</title>
        </head>
        <body>
          <form method="POST" action="/message">
            <input type="text" name="message" placeholder="Send message to server">
            <button>Send</button>
          </form>
        </body>
      `)
    res.end()
  } else if (url === '/message' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      console.log(chunk)
      body.push(chunk)
    })

    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString()
      const message = parseBody.split('=')[1]
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
      })
    })
  }
}

module.exports = requestHandler
