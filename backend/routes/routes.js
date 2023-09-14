const express = require("express");
const router = express.Router();
const controller = require("../controllers/weatherController");
const cityController = require("../controllers/cityController");


router.post("/api", cityController.searchCities);
router.post("/api/coords", cityController.searchCityByCoords);
router.post("/api/weather", controller.fetchWeather);
router.post("/api/airquality", controller.fetchAirQuality);

router.use(function (req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 NOT found.');
});

router.use(function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

module.exports = router;