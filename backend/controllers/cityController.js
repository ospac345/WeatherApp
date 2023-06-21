// Desc: Controller for city data
const fetch = require('node-fetch');

async function searchCities(req, res) {
    const query = req.body.value;
    try {
        const response = await fetch(
            `http://api.geonames.org/searchJSON?q=${encodeURIComponent(query)}&maxRows=20&username=simam202`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch city data' });
    }
}

async function searchCityByCoords(req, res) {
    const lat = req.body.lat;
    const lng = req.body.lng;
    try {
        const response = await fetch(
            `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=simam202`
        );
        const data = await response.json();
        res.json(data);
        console.log(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch city data' });
    }
}

module.exports = {
    searchCities,
    searchCityByCoords,
};
