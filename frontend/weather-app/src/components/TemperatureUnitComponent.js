




const TemperatureUnitComponent = ({ changeTemperatureUnit, selectedUnit }) => {

    return (
        <div className="temperature-unit" style={{ display: 'flex' }}>
            <div style={{ paddingRight: 10, fontWeight: selectedUnit === 'celsius' ? 'bold' : 'normal' }} onClick={() => changeTemperatureUnit('celsius')}>C</div>
            <span>|</span>
            <div style={{ paddingLeft: 10, fontWeight: selectedUnit === 'fahrenheit' ? 'bold' : 'normal' }} onClick={() => changeTemperatureUnit('fahrenheit')}>F</div>
        </div>
    )
}

export default TemperatureUnitComponent