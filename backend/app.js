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
// app.use(cors(corsOptions));
app.use(cors({ origin: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Headers', "*");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});


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