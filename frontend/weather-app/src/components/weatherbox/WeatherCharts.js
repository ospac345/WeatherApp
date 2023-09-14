import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useTheme } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';


const WeatherCharts = () => {
    const weatherData = useSelector(state => state.weather.weatherData);
    const theme = useTheme();
    const selectedCity = useSelector(state => state.weather.selectedCity);
    const [selectedValue, setSelectedValue] = useState('Feels Like');


    Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        zoomPlugin,
        TimeScale,
    );

    const labels = weatherData.hourly.time.map((date, index) => {
        return date;
    });

    const chartDataFeelsLike = {
        labels,
        datasets: [
            {
                label: 'Feels Like',
                data: weatherData.hourly.apparent_temperature,
                fill: false,
                backgroundColor: '#247d99',
                borderColor: '#247d99',
                yAxisID: 'yAxisFeelsLike',
                pointStyle: 'circle',
                pointRadius: 2,
                pointBorderColor: '#247d99'
            },
        ]
    }

    const chartDataHumidity = {
        labels,
        datasets: [
            {
                label: 'Humidity',
                data: weatherData.hourly.relativehumidity_2m,
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                yAxisID: 'yAxisHumidity',
            },
        ]
    }

    const chartDataRain = {
        labels,
        datasets: [
            {
                label: 'Rain',
                data: weatherData.hourly.rain,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                yAxisID: 'yAxisRain',
            },
        ]
    }

    const chartDataVisibility = {
        labels,
        datasets: [
            {
                label: 'Visibility',
                data: weatherData.hourly.visibility,
                fill: false,
                backgroundColor: '#dbc234',
                borderColor: 'rgba(255, 205, 86, 0.2)',
                yAxisID: 'yAxisVisibility',
            }
        ]
    }

    const [chartData, setChartData] = useState(chartDataFeelsLike);



    useEffect(() => {
        switch (selectedValue) {
            case 'Feels Like':
                setChartData(chartDataFeelsLike);
                break;
            case 'Humidity':
                setChartData(chartDataHumidity);
                break;
            case 'Rain':
                setChartData(chartDataRain);
                break;
            case 'Visibility':
                setChartData(chartDataVisibility);
                break;
            default:
                setChartData(chartDataFeelsLike);
        }
    }, [selectedValue, weatherData]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                },

            },
            title: {
                display: true,
                text: `${selectedCity.name} - ${selectedCity.countryName}`,
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                },
                limits: {
                    x: { min: new Date(labels[0]), max: new Date(labels[labels.length - 1]) },
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                },
            }
        },

        scales: {
            x: {
                suggestedMin: labels[0],  // Use the first label in your dataset as the minimum
                suggestedMax: labels[labels.length - 1],  // Use the last label in your dataset as the maximum
                type: 'time',
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'HH:mm'
                    },
                    tooltipFormat: 'dd MMM HH:mm',
                    stepSize: 1,
                },
                ticks: {
                    autoSkip: true,
                    maxRotation: 45,
                    minRotation: 0,
                    major: {
                        enabled: true,
                        unit: 'day',
                        stepSize: 1, // Set step size to 1 to display every day
                    },
                },
            },
            yAxisFeelsLike: {
                title: {
                    display: true,
                    text: weatherData.hourly_units.apparent_temperature,
                    color: '#247d99'
                },
                display: 'auto',
                position: 'left',
            },
            yAxisHumidity: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: weatherData.hourly_units.relativehumidity_2m,
                    color: 'rgb(54, 162, 235)'
                },
                display: 'auto',
                position: 'left',
            },
            yAxisRain: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: weatherData.hourly_units.rain,
                    color: 'rgb(75, 192, 192)'
                },
                display: 'auto',
            },
            yAxisVisibility: {
                title: {
                    display: true,
                    text: weatherData.hourly_units.visibility,
                    color: 'rgb(255, 205, 86)'
                },
                display: 'auto',
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
        }

    };


    return (
        <Grid
            container sx={{
                borderWidth: 1, borderStyle: 'solid', borderColor: theme.palette.primary.main, borderRadius: '5px', padding: '5px', marginTop: '5px', width: '100%'
            }
            } >
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                <FormControl fullWidth
                >
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Forecast Type
                    </InputLabel>
                    <NativeSelect
                        onChange={handleChange}
                        defaultValue={"Feels Like"}
                        inputProps={{
                            name: 'Forecast Type',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={"Feels Like"}>Feels Like</option>
                        <option value={"Rain"}>Rain</option>
                        <option value={"Visibility"}>Visibility</option>
                        <option value={"Humidity"}>Humidity</option>
                    </NativeSelect>
                </FormControl>
            </div>
            <div style={{ display: 'flex', width: '100%' }}>
                <Line
                    data={chartData}
                    options={options}
                    height={315}
                />
            </div>
        </Grid >
    )
}

export default WeatherCharts;