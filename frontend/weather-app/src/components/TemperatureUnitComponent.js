
import Button from '@mui/material/Button';



const TemperatureUnitComponent = ({ changeTemperatureUnit, selectedUnit }) => {

    return (
        <div className="temperature-unit" style={{ display: 'flex' }}>
            <Button color="secondary" size="small" style={{ fontWeight: selectedUnit === 'celsius' ? 'bold' : 'normal' }} onClick={() => changeTemperatureUnit('celsius')}>C</Button>
            <span>|</span>
            <Button color="secondary" size="small" style={{ fontWeight: selectedUnit === 'fahrenheit' ? 'bold' : 'normal' }} onClick={() => changeTemperatureUnit('fahrenheit')}>F</Button>

        </div>
    )
}

export default TemperatureUnitComponent