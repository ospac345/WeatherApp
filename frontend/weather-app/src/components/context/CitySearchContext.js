import React, { useState, createContext } from 'react';
import { localhostURL } from '../../constants/constants';

export const CitySearchContext = createContext();

const CitySearchProvider = (props) => {
    const [suggestions, setSuggestions] = useState([]);
    const [myLocationValue, setMyLocationValue] = useState(null);

    const fetchSuggestions = async (input) => {
        try {
            const response = await fetch(localhostURL + '/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value: input }),
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    setSuggestions([...data.geonames]);
                } else {
                    setSuggestions([]);
                }
            } else {
                throw new Error('Request failed');
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };

    const myLocationHandleClick = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const requestData = {
                lat: latitude,
                lng: longitude,
            };

            fetch(localhostURL + "/api/coords", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json(); // Parse the response data as JSON
                    } else {
                        throw new Error("Failed to send coordinates");
                    }
                })
                .then((data) => {
                    // Use the data received back from the server
                    setSuggestions([data.geonames[0]]);
                    setMyLocationValue(data.geonames[0]);
                    // Process the data or update the state as needed
                })
                .catch((error) => {
                    console.error("Error sending coordinates:", error);
                });
        }
        function error() {
            alert("Unable to retrieve your location")
            console.log("Unable to retrieve your location");
        }
    };


    return (
        <CitySearchContext.Provider value={{ suggestions, fetchSuggestions, myLocationValue, myLocationHandleClick }}>
            {props.children}
        </CitySearchContext.Provider>
    );
}

export default CitySearchProvider;

