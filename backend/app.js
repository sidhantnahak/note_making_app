const express = require('express');
const app = express();
const user = require('./Routes/UserRoute.js')
const notes = require('./Routes/NotesRoute')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')

app.use(express.json())
// app.use(cors())
app.use(cookieparser())
app.use(bodyparser.urlencoded({ extended: true }))

// app.use("uploads",express.static("./uploads"))
// app.use("/files",express.static,("./public/files"))

app.use(
    cors({
        origin: [
            ' https://note-making-app.onrender.com',
            'http://localhost:3000',
            'https://rainbow-froyo-081e09.netlify.app/'
        ],
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Access-Control-Allow-Origin',
            'Content-Type',
            'Authorization',
        ],
    })
)

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", process.env.DOMAIN_URL);
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     next();
//   });



// var allowlist = [
//     'https://note-making-app.onrender.com',
//     'http://localhost:3000',
//     'https://rainbow-froyo-081e09.netlify.app/'
// ]
// var corsOptionsDelegate = function (req, callback) {
//     var corsOptions
//     if (allowlist.indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//     } else {
//         corsOptions = { origin: false } // disable CORS for this request
//     }
//     callback(null, corsOptions) // callback expects two parameters: error and options
// }

app.use('/api/v1',  user)
app.use('/api/v1', notes)

app.set("trust proxy", 1);


app.use('/', (req, res) => {
    res.send({
        message: "Hello sidhant",
        sucess: true
    })
})

module.exports = app