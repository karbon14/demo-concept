const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const PORT = process.env.PORT || 3000

let messages = []

// socket.io server
io.on('connection', socket => {
  socket.on('message', data => {
    messages.push(data)
    socket.broadcast.emit('message', data)
  })

  socket.on('removeMessage', ({ type, account }) => {
    messages = messages.filter(_ => _[type] !== account)
  })
})

nextApp.prepare().then(() => {
  app.get('/messages', (req, res) => {
    const {
      query: { account, isScribe }
    } = req

    const filteredMessages = messages.filter(
      m => m[isScribe === 'true' ? 'selectedScribe' : 'approvedUser'] === account
    )

    res.json(filteredMessages)
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
  })
})
