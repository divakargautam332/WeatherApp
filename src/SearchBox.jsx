import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import { API_URL, API_KEY } from './config.js';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const getWeatherInfo = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            const jsonResponse = await response.json();

            if (jsonResponse.cod !== 200) {
                throw new Error(jsonResponse.message);
            }

            const result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };

            setError(false);
            return result;

        } catch (err) {
            setError(true);
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
        setError(false);
    };

    const handleClear = () => {
        setCity('');
        setError(false);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!city.trim()) return;

        const newInfo = await getWeatherInfo();
        if (newInfo) {
            updateInfo(newInfo);
            setCity('');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">


                <div className="relative group">


                    <div className={`
                        relative flex items-center
                        bg-white/10 backdrop-blur-md 
                        border-2 rounded-2xl
                        transition-all duration-300
                        ${error
                            ? 'border-red-500/50 shadow-lg shadow-red-500/20'
                            : 'border-white/20 hover:border-white/40 focus-within:border-white/60 focus-within:shadow-lg focus-within:shadow-purple-500/20'
                        }
                    `}>


                        <div className="pl-4 pr-2">
                            <LocationOnIcon
                                className={`w-5 h-5 transition-colors duration-300 
                                    ${error ? 'text-red-400' : 'text-white/60 group-focus-within:text-white'}`}
                            />
                        </div>


                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={handleChange}
                            placeholder="Enter city name..."
                            required
                            className={`
                                w-full py-4 px-2 
                                bg-transparent 
                                text-white placeholder-white/40
                                text-base font-medium
                                outline-none
                                transition-colors duration-300
                            `}
                        />

                        {city && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="pr-2 pl-2 text-white/40 hover:text-white transition-colors duration-200"
                            >
                                <ClearIcon className="w-5 h-5" />
                            </button>
                        )}


                        <button
                            type="submit"
                            disabled={loading || !city.trim()}
                            className={`
                                mr-2 p-3 rounded-xl
                                transition-all duration-300
                                ${loading || !city.trim()
                                    ? 'bg-white/10 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:scale-105 hover:shadow-lg'
                                }
                            `}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <SearchIcon className="w-5 h-5 text-white" />
                            )}
                        </button>
                    </div>


                    {error && (
                        <div className="absolute -bottom-10 left-2 flex items-center gap-2 text-red-400 text-sm animate-fade-in">
                            <span className="text-base">⚠️</span>
                            <span className="font-medium">City not found! Please check spelling.</span>
                        </div>
                    )}
                </div>


                <button
                    type="submit"
                    disabled={loading || !city.trim()}
                    className={`
                        w-full py-4 px-6 
                        rounded-2xl font-semibold text-white text-base
                        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                        hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
                        shadow-lg hover:shadow-xl hover:shadow-purple-500/30
                        hover:-translate-y-0.5
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                        flex items-center justify-center gap-2
                    `}
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Searching Weather...</span>
                        </>
                    ) : (
                        <>
                            <SearchIcon className="w-5 h-5" />
                            <span>Search Weather</span>
                        </>
                    )}
                </button>


                <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-white/50 text-sm text-center mb-3 font-medium">
                        🌍 Popular Cities
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['Delhi', 'Mumbai', 'London', 'New York', 'Tokyo', 'Paris'].map((cityName) => (
                            <button
                                key={cityName}
                                type="button"
                                onClick={() => {
                                    setCity(cityName);
                                    setError(false);
                                }}
                                className={`
                                    px-4 py-2 text-sm 
                                    bg-white/10 hover:bg-white/20 
                                    text-white/80 hover:text-white 
                                    rounded-full 
                                    border border-white/20 
                                    transition-all duration-200
                                    hover:scale-105 hover:shadow-lg
                                    ${city === cityName ? 'bg-white/20 border-white/40' : ''}
                                `}
                            >
                                {cityName}
                            </button>
                        ))}
                    </div>
                </div>

            </form>
        </div>
    );
}