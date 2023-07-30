import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Weather() {
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=87961c2606b64ef88ad102154232706&q=`;

    const [query, setQuery] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleInput = (e) => {
        setQuery(e.target.value);
    }
    const getWeatherData = async () => {
        try {
            const response = await fetch(`${API_URL}${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeatherData(data);
            console.log(data)
        }
        catch (error) {
            console.log('Error:', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeatherData();
    };

    return (
        <div className="container py-5">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInput}
                        placeholder='Enter a city '
                        className="form-control"
                    />
                    <button type="submit" className="btn btn-primary">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </form>
            {weatherData && (
                <div className="card">
                    <div className="card-body">
                        <h2>Weather in {weatherData.location.name}</h2>
                        <p>Temperature: {weatherData.current.temp_c} °C</p>
                        <p>Description: {weatherData.current.condition.text}</p>
                        <img src={weatherData.current.condition.icon} alt="" />
                        <p> Time: {weatherData.location.localtime}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather