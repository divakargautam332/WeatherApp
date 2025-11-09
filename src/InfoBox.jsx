import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';  // SunnyIcon ka sahi import
import './InfoBox.css';

export default function InfoBox({ info }) {
    const INIT_URL =
        "https://media.istockphoto.com/id/2199802950/photo/panoramic-of-blue-sky-and-white-cloud-nature-background.jpg?s=1024x1024&w=is&k=20&c=BfJ91Lf9KKZZTUPY10rsUU483Cq1e5m8-cgOGhoV7O0=";

    const COLD_URL =
        "https://media.istockphoto.com/id/1064083590/photo/winter-scene-snowfall-in-the-woods.jpg?s=1024x1024&w=is&k=20&c=2TlFRxLXJ9HRLPKH2K9RDKWzpyTJAobuYyuUeiL0D2o=";

    const HOT_URL =
        "https://media.istockphoto.com/id/1433096017/photo/irrigation-system-on-agricultural-soybean-field-at-sunset.jpg?s=1024x1024&w=is&k=20&c=KaP65agSZT-WXmVhZtkp6fJHjqNEKFefolVveR4pLmo=";

    const RAIN_URL =
        "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=";

    return (
        <div className="WeatherInfo">
            <div className="cardContainer">
                <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
                    <CardMedia
                        sx={{ height: 180 }}
                        image={
                            info.humidity > 80
                                ? RAIN_URL
                                : info.temp > 15
                                    ? HOT_URL
                                    : COLD_URL
                        }
                        title="Weather Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {info.city}{" "}
                            {info.humidity > 80 ? (
                                <ThunderstormIcon />
                            ) : info.temp > 15 ? (
                                <WbSunnyIcon />
                            ) : (
                                <AcUnitIcon />
                            )}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component="span">
                            <p>Temperature: {info.temp}&deg;C</p>
                            <p>Humidity: {info.humidity}%</p>
                            <p>Min Temp: {info.tempMin}&deg;C</p>
                            <p>Max Temp: {info.tempMax}&deg;C</p>
                            <p>Feels Like: {info.feelsLike}&deg;C</p>
                            <p>Weather: {info.weather}</p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
