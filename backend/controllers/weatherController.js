const fetch = require('node-fetch');


async function fetchWeather(req, res) {
    const lat = req.body.lat;
    const lng = req.body.lng;
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lng + "&hourly=temperature_2m,rain,showers,weathercode,visibility,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&windspeed_unit=mph&timezone=auto"
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