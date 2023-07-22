import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { WiDaySunny, WiMoonWaningCrescent5 } from 'react-icons/wi';

const LocalTimeComponent = ({ time_zone, isDay }) => {
    const [localTime, setLocalTime] = useState('');

    useEffect(() => {
        const timeZone = time_zone;

        // Function to update the local time
        const updateLocalTime = () => {
            const now = new Date();
            const localTime = utcToZonedTime(now, timeZone);
            const formattedTime = format(localTime, 'HH:mm:ss');
            setLocalTime(formattedTime);
        };

        // Update the local time initially
        updateLocalTime();

        // Update the local time every second (adjust interval as needed)
        const intervalId = setInterval(updateLocalTime, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [time_zone]);

    // Add class names for day and night icons based on the 'isDay' prop
    const dayIconClassName = isDay ? 'day-icon' : 'night-icon';
    const nightIconClassName = isDay ? 'night-icon' : 'day-icon';

    return (
        <div style={{ display: 'flex' }}>
            <div className={dayIconClassName}>{isDay ? <WiDaySunny /> : <WiMoonWaningCrescent5 />}</div>
            <div className='current-weather-box-digital-clock'>{localTime}</div>
        </div>
    );
};

export default LocalTimeComponent;


