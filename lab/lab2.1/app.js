import http from 'http'

const server = http.createServer((req, res) => {
  const url = req.url
  const usersArr = ['Viet Tien']
  if (url === '/') {
    res.write(`
      <html>
        <head>
        <title>Lab 2.1</title>
        </head>
        <body>
          <form action="/users" method="POST">
            <input type="text" name="user"><button>Click</button>
          </form>
        </body>
      </html>
    `)
    return res.end()
  }

  if (url === '/add-user') {
    res.write(`
      <html>
        <head>
        <title>Lab 2.1</title>
        </head>
        <body>
          <form action="/users" method="POST">
            <label for="user">Add user</label>
            <input id="user" type="text" name="user"><button>Click</button>
          </form>
        </body>
      </html>
    `)
    return res.end()
  }

  if (url === '/users' && req.method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    })
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString()
      const user = parseBody.split('=')[1]
      if (user) usersArr.push(user)
      const list = usersArr.map((user) => `<li>${user}</li>`).join('')
      res.write(`
        <html>
          <head>
          <title>Lab 2.1</title>
          </head>
          <body>
            <ul>${list}</ul>
          </body>
        </html>
        `)

      return res.end()
    })
  }

  if (url === '/create-user') {
  }
})

server.listen(3000)
