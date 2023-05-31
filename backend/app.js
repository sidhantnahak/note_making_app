const express = require('express');
const app = express();
const user = require('./Routes/UserRoute.js')
const notes = require('./Routes/NotesRoute')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyparser = require('body-parser')

app.use(express.json())
app.use(cors())
app.use(cookieparser())
app.use(bodyparser.urlencoded({ extended: true }))

// app.use("uploads",express.static("./uploads"))
// app.use("/files",express.static,("./public/files"))

app.use(
    cors({
        origin: [
            ' https://note-making-app.onrender.com',
            'http://localhost:3000',
            'https://cerulean-piroshki-7da264.netlify.app'
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

var allowlist = [
    'https://note-making-app.onrender.com',
    'https://cerulean-piroshki-7da264.netlify.app'
]
var corsOptionsDelegate = function (req, callback) {
    var corsOptions
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use('/api/v1', cors(corsOptionsDelegate), user)
app.use('/api/v1', cors(corsOptionsDelegate), notes)

app.set("trust proxy", 1);


app.use('/', (req, res) => {
    res.send({
        message: "Hello sidhant",
        sucess: true
    })
})

module.exports = app