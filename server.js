const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// socket.io server
io.on('connection', socket => {
  socket.on('message', data => socket.broadcast.emit('message', data))
})

nextApp.prepare().then(() => {
  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(3000, err => {
    if (err) throw err
  })
})
