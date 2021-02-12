const API_TOKEN = "0dc3df573943b23e133f0dd1d5c0094c"

export function getGeoLocWeatherFromOPMWithSearch(lon, lat) {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+API_TOKEN+'&units=metric&lang=fr'
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}