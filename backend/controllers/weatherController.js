const fetch = require('node-fetch');


async function fetchWeather(req, res) {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const tempUnit = req.body.tempUnit;
    console.log('lat', lat);
    console.log('lng', lng);
    console.log('tempUnit', tempUnit);

    let apiURL;

    if (tempUnit === 'fahrenheit') {
        apiURL = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lng + "&hourly=temperature_2m,rain,showers,weathercode,visibility,is_day&daily=weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&windspeed_unit=mph&temperature_unit=fahrenheit&timezone=auto"

    } else {
        apiURL = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lng + "&hourly=temperature_2m,rain,showers,weathercode,visibility,is_day&daily=weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&windspeed_unit=mph&timezone=auto"
    }


    try {
        const response = await fetch(
            apiURL
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}

module.exports = {
    fetchWeather,
};