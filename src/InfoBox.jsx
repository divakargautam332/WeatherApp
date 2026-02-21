import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function InfoBox({ info }) {
    const COLD_URL = "https://media.istockphoto.com/id/1064083590/photo/winter-scene-snowfall-in-the-woods.jpg?s=1024x1024&w=is&k=20&c=2TlFRxLXJ9HRLPKH2K9RDKWzpyTJAobuYyuUeiL0D2o=";
    const HOT_URL = "https://media.istockphoto.com/id/1433096017/photo/irrigation-system-on-agricultural-soybean-field-at-sunset.jpg?s=1024x1024&w=is&k=20&c=KaP65agSZT-WXmVhZtkp6fJHjqNEKFefolVveR4pLmo=";
    const RAIN_URL = "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=";

    // Determine weather state
    const isRainy = info.humidity > 80;
    const isHot = info.temp > 15;
    const weatherImage = isRainy ? RAIN_URL : isHot ? HOT_URL : COLD_URL;

    const WeatherIcon = isRainy ? ThunderstormIcon : isHot ? WbSunnyIcon : AcUnitIcon;
    const iconColor = isRainy ? 'text-blue-400' : isHot ? 'text-amber-400' : 'text-cyan-400';
    const bgGradient = isRainy
        ? 'from-blue-600 to-indigo-800'
        : isHot
            ? 'from-orange-400 to-red-600'
            : 'from-cyan-500 to-blue-700';

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans">
            <div className="w-full max-w-md space-y-4 animate-fade-in-up">

                {/* ========== MAIN WEATHER CARD ========== */}
                <Card sx={{}} className="rounded-3xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20">

                    {/* Weather Image Background */}
                    <div className="relative">
                        <CardMedia
                            component="img"
                            className="h-48 w-full object-cover"
                            image={weatherImage}
                            title="Weather Background"
                            sx={{}}
                        />
                        {/* Overlay Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${bgGradient} opacity-80`} />

                        {/* City + Icon on Image */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                            <Typography component="h2" className="text-2xl font-bold capitalize drop-shadow-lg">
                                {info.city}
                            </Typography>
                            <WeatherIcon className={`w-10 h-10 ${iconColor} drop-shadow-md`} />
                        </div>
                    </div>

                    {/* Main Temperature Display */}
                    <CardContent sx={{}} className="p-6 text-center">
                        <div className="flex flex-col items-center">
                            <Typography className="text-6xl font-extrabold text-white drop-shadow-lg">
                                {info.temp}°C
                            </Typography>
                            <Typography className="text-lg text-white/90 mt-1 capitalize font-medium">
                                {info.weather}
                            </Typography>
                            <Typography className="text-sm text-white/70 mt-1">
                                Feels like {info.feelsLike}°C
                            </Typography>
                        </div>
                    </CardContent>
                </Card>

                {/* ========== WEATHER DETAILS SECTION ========== */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl">

                    {/* Section Header */}
                    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/20">
                        <div className="w-1 h-6 bg-gradient-to-b from-white to-white/40 rounded-full" />
                        <h3 className="text-white font-semibold text-lg">Weather Details</h3>
                    </div>

                    {/* Details Grid - 2 Columns */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* Humidity */}
                        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <WaterDropIcon className="text-blue-400 w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white/60 text-xs uppercase tracking-wide">Humidity</p>
                                <p className="text-white font-bold text-lg">{info.humidity}%</p>
                            </div>
                        </div>

                        {/* Min Temperature */}
                        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                <ArrowDownwardIcon className="text-cyan-400 w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white/60 text-xs uppercase tracking-wide">Min Temp</p>
                                <p className="text-white font-bold text-lg">{info.tempMin}°C</p>
                            </div>
                        </div>

                        {/* Max Temperature */}
                        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                <ArrowUpwardIcon className="text-orange-400 w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white/60 text-xs uppercase tracking-wide">Max Temp</p>
                                <p className="text-white font-bold text-lg">{info.tempMax}°C</p>
                            </div>
                        </div>

                        {/* Feels Like */}
                        <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 hover:bg-white/10 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <DeviceThermostatIcon className="text-purple-400 w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white/60 text-xs uppercase tracking-wide">Feels Like</p>
                                <p className="text-white font-bold text-lg">{info.feelsLike}°C</p>
                            </div>
                        </div>

                    </div>

                    {/* Temperature Range Bar */}
                    <div className="mt-5 pt-4 border-t border-white/20">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-white/60 text-sm">Temperature Range</span>
                            <span className="text-white text-sm font-medium">{info.tempMin}° - {info.tempMax}°C</span>
                        </div>
                        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className={`absolute h-full rounded-full bg-gradient-to-r ${bgGradient}`}
                                style={{
                                    left: '10%',
                                    right: '10%'
                                }}
                            />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-white/50">
                            <span>{info.tempMin}°C</span>
                            <span>{info.tempMax}°C</span>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="mt-4 pt-4 border-t border-white/20 text-center">
                        <p className="text-white/50 text-xs">
                            Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}