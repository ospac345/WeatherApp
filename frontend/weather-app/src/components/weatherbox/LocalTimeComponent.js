import React, { useState, useEffect } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { WiDaySunny, WiMoonWaningCrescent5 } from 'react-icons/wi';

const LocalTimeComponent = ({ time_zone, isDay }) => {
    const [localTime, setLocalTime] = useState('');
    const [gmtOffset, setGmtOffset] = useState('');

    useEffect(() => {
        const timeZone = time_zone;

        // Function to update the local time and GMT offset
        const updateLocalTime = () => {
            const now = new Date();
            const formattedTime = formatInTimeZone(now, timeZone, 'HH:mm:ss');
            const gmtOffSetValue = formatInTimeZone(now, timeZone, 'zzz');
            setLocalTime(formattedTime);
            setGmtOffset(gmtOffSetValue);
        };


        // Update the local time initially
        updateLocalTime();

        // Update the local time every second (adjust interval as needed)
        const intervalId = setInterval(updateLocalTime, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [time_zone]);

    // Add class names for day and night icons based on the 'isDay' prop
    const iconClassName = isDay ? 'day-icon' : 'night-icon';

    return (
        <div style={{ display: 'flex' }}>
            {gmtOffset && <div className='current-weather-box-digital-clock-GMT-box'>{gmtOffset}</div>}
            <div className={iconClassName}>{isDay ? <WiDaySunny /> : <WiMoonWaningCrescent5 />}</div>
            <div className='current-weather-box-digital-clock'>{localTime}</div>
        </div>
    );
};

export default LocalTimeComponent;
