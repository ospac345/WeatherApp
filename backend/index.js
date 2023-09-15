const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
const path = require('path');


const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://weather-wise-906a8dd90dac.herokuapp.com']

const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin)
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable")
            callback(null, true)
        } else {
            console.log("Origin rejected")
            callback(new Error('Not allowed by CORS'))
        }
    }
}


const cors = require('cors');
app.use(cors(corsOptions))

app.use(express.static(path.resolve(__dirname, "./frontend/weather-app/build")));


const router = require('./routes/routes');
app.use(router);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Server started on port 3001. Ctrl^c to quit.");
});