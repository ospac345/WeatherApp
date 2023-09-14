// Desc: Controller for city data
const fetch = require('node-fetch');

async function searchCities(req, res) {
    const query = req.body.value;
    try {
        const response = await fetch(
            `http://api.geonames.org/searchJSON?q=${encodeURIComponent(query)}&maxRows=5&username=simam202`
        );

        if (!response.ok) {
            // Handle non-successful HTTP status codes (e.g., 404, 401)
            if (response.status === 404) {
                res.status(404).json({ error: 'City not found' });
            } else if (response.status === 401) {
                res.status(401).json({ error: 'Unauthorized access to the API' });
            } else {
                res.status(response.status).json({ error: 'Failed to fetch city data' });
            }
            return;
        }

        const data = await response.json();
        if (data.status && data.status.message) {
            // Handle API-specific errors (if the API returns error information)
            res.status(400).json({ error: `API error: ${data.status.message}` });
        } else {
            res.json(data);
        }
    } catch (error) {
        // Log the actual error for debugging
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function searchCityByCoords(req, res) {
    const lat = req.body.lat;
    const lng = req.body.lng;
    try {
        const response = await fetch(
            `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=simam202`
        );

        if (!response.ok) {
            // Handle non-successful HTTP status codes (e.g., 404, 401)
            if (response.status === 404) {
                res.status(404).json({ error: 'City not found' });
            } else if (response.status === 401) {
                res.status(401).json({ error: 'Unauthorized access to the API' });
            } else {
                res.status(response.status).json({ error: 'Failed to fetch city data' });
            }
            return;
        }

        const data = await response.json();
        if (data.status && data.status.message) {
            // Handle API-specific errors (if the API returns error information)
            res.status(400).json({ error: `API error: ${data.status.message}` });
        } else {
            res.json(data);
        }
    } catch (error) {
        // Log the actual error for debugging
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    searchCities,
    searchCityByCoords,
};
