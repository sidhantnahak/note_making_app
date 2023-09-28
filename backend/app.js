const express = require('express');
const app = express();
const user = require('./Routes/UserRoute.js')
const notes = require('./Routes/NotesRoute')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')


app.use(cors())


app.use(express.json())
app.use(cookieparser())
app.use(bodyparser.urlencoded({ extended: true }))


app.use('/api/v1', cors(corsOptionsDelegate), user)
app.use('/api/v1', cors(corsOptionsDelegate), notes)


app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  return res.status(status).json({
    success: false,
    status: status,
    message,
  })
})


module.exports = app