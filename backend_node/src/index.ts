import express from 'express'
import cors from 'cors'
import http from 'http'
import path from 'path'

const port = process.env.PORT || 4000
// create express app
const app = express()
export const server = http.createServer(app)
export const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})
require('./sockets/socket')
// import routes
import apiRouter from './routes/api.routes'

// middleware
const publicPath = path.resolve(__dirname, 'public')
app.use(express.static(publicPath))
app.use(cors())
app.use(express.json())

// routes
app.use('/api', apiRouter)
// app.listen(port)
server.listen(port)
console.log(`Express server has started on port ${port}`)
