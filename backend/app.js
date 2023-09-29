const express = require('express');
const app = express();
const user = require('./Routes/UserRoute.js')
const notes = require('./Routes/NotesRoute')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')



// const corsOptions={
//   origin:
//   [
//     "https://myapp-frontend-hhxo.onrender.com/",
//     "http://localhost:3000/"
//   ]

// }
// app.use(
//   cors({
//     origin: [


//     ],
//     credentials: true,
//     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//     allowedHeaders: [
//       'Access-Control-Allow-Origin',
//       'Content-Type',
//       'Authorization',
//     ],
//   })
// )




app.use(express.json())
app.use(cookieparser())
app.use(bodyparser.urlencoded({ extended: true }))


app.use('/api/v1', user)
app.use('/api/v1', notes)

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));





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