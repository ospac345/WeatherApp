const fetch = require('node-fetch');


async function fetchWeather(req, res) {
    try {
        const { lat, lng, tempUnit } = req.body;

        if (!lat || !lng || !tempUnit) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        let apiURL;

        if (tempUnit === 'fahrenheit') {
            apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,rain,relativehumidity_2m,apparent_temperature,weathercode,visibility,precipitation_probability,uv_index,is_day&daily=weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&windspeed_unit=mph&temperature_unit=fahrenheit&timezone=auto`;
        } else {
            apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,rain,relativehumidity_2m,apparent_temperature,weathercode,visibility,precipitation_probability,uv_index,is_day&daily=weathercode,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&windspeed_unit=mph&timezone=auto`;
        }

        const response = await fetch(apiURL);

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.reason) {
                return res.status(response.status).json({ error: 'Failed to fetch weather data', reason: errorData.reason });
            }
            throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}

async function fetchAirQuality(req, res) {
    try {
        const { lat, lng } = req.body;

        if (!lat || !lng) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const apiURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,dust,european_aqi,european_aqi_pm2_5,european_aqi_pm10`;

        const response = await fetch(apiURL);

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.reason) {
                return res.status(response.status).json({ error: 'Failed to fetch air quality data', reason: errorData.reason });
            }
            throw new Error(`Failed to fetch air quality data. Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch air quality data' });
    }
}

module.exports = {
    fetchWeather,
    fetchAirQuality,
};