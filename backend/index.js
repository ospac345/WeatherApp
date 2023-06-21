const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());


const router = require('./routes/routes');
app.use(router);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Server started on port 3001. Ctrl^c to quit.");
});